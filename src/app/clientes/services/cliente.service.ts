import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { environment } from '../../../environments/environment';
import { PaginacionCliente } from '../interfaces/paginacion.interface';
import { Cliente } from '../interfaces/cliente.interface';
import { Region } from '../interfaces/region.interface';

const BASE_URL = environment.baseUrl;
const BAD_REQUEST: number = 400;
const UNAUTHORIZED: number = 401;
const FORBIDDEN: number = 403;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private router: Router) { }

  private isNoAutorizado(e: any): boolean {
    if (e.status == UNAUTHORIZED || e.status == FORBIDDEN) {
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(`${BASE_URL}/api/clientes/regiones`)
      .pipe(
        catchError((e: any) => {
          this.isNoAutorizado(e);
          return throwError(() => e);
        })
      );
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${BASE_URL}/api/clientes`)
      .pipe(
        //tap((clientes: Cliente[]) => console.log(clientes)),
        map((clientes: Cliente[]) => clientes.map((cliente: Cliente) => {
          cliente.nombre = cliente.nombre?.toUpperCase();
          return cliente;
        }))
      );
  }

  getClientesPaginado(page: number): Observable<PaginacionCliente> {
    return this.http.get<PaginacionCliente>(`${BASE_URL}/api/clientes/page/${page}`)
      .pipe(
        tap((paginacionCliente: PaginacionCliente) => console.log(paginacionCliente.content)),
        map((paginacionCliente: PaginacionCliente) => {
          paginacionCliente.content.map((cliente: Cliente) => {
            cliente.nombre = cliente.nombre?.toUpperCase();
            return cliente;
          })
          return paginacionCliente;
        })
      );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${BASE_URL}/api/clientes/${id}`)
      .pipe(
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(() => e);
          }
          console.log(e);
          this.router.navigate(['/clientes']);
          Swal.fire('Error al obtener el cliente', e.error.mensaje, 'error');
          return throwError(() => e);
        })
      );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<{ cliente: Cliente, mensaje: string }>(`${BASE_URL}/api/clientes`, cliente, { headers: this.httpHeaders })
      .pipe(
        map(({ cliente }) => cliente),
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(() => e);
          }
          if (e.status == BAD_REQUEST) {
            return throwError(() => e);
          }
          console.log(e);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => e);
        })
      );
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<{ cliente: Cliente, mensaje: string }>(`${BASE_URL}/api/clientes/${cliente.id}`, cliente, { headers: this.httpHeaders })
      .pipe(
        map(({ cliente }) => cliente),
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(() => e);
          }
          if (e.status == BAD_REQUEST) {
            return throwError(() => e);
          }
          console.log(e);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => e);
        })
      );
  }

  delete(id: number): Observable<string> {
    return this.http.delete<{ mensaje: string, error?: string }>(`${BASE_URL}/api/clientes/${id}`, { headers: this.httpHeaders })
      .pipe(
        map(({ mensaje }) => mensaje),
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(() => e);
          }
          console.log(e);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => e);
        })
      );
  }

  subirFoto(archivo: File, id: number): Observable<HttpEvent<any>> {
    let formData = new FormData(); //Clase nativa de JavaScript
    formData.append("archivo", archivo);
    formData.append("id", id.toString());

    const req = new HttpRequest('POST', `${BASE_URL}/api/clientes/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req)
      .pipe(
        catchError(e => {
          //** Al redireccionar queda el fondo del modal, con esto lo eliminamos
          document.getElementsByClassName('modal-backdrop')[0].remove();
          console.log('Error al subir la foto', e);
          this.isNoAutorizado(e);
          return throwError(() => e);
        })
      );
  }
}
