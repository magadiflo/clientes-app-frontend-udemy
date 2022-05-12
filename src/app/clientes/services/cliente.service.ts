import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map, tap } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { PaginacionCliente } from '../interfaces/paginacion.interface';
import { Cliente } from '../interfaces/cliente.interface';
import { Region } from '../interfaces/region.interface';

const BASE_URL = environment.baseUrl;
const BAD_REQUEST: number = 400;
const UNAUTHORIZED: number = 401;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(`${BASE_URL}/api/clientes/regiones`);
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
          if (e.status != UNAUTHORIZED && e.error.mensaje) {
            this.router.navigate(['/clientes']);
            console.log(e.error.mensaje);
          }
          return throwError(() => e);
        })
      );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<{ cliente: Cliente, mensaje: string }>(`${BASE_URL}/api/clientes`, cliente)
      .pipe(
        map(({ cliente }) => cliente),
        catchError(e => {
          if (e.status == BAD_REQUEST) {
            return throwError(() => e);
          }
          if (e.error.mensaje) {
            console.log(e.error.mensaje);
          }
          return throwError(() => e);
        })
      );
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<{ cliente: Cliente, mensaje: string }>(`${BASE_URL}/api/clientes/${cliente.id}`, cliente)
      .pipe(
        map(({ cliente }) => cliente),
        catchError(e => {
          if (e.status == BAD_REQUEST) {
            return throwError(() => e);
          }
          if (e.error.mensaje) {
            console.log(e.error.mensaje);
          }
          return throwError(() => e);
        })
      );
  }

  delete(id: number): Observable<string> {
    return this.http.delete<{ mensaje: string, error?: string }>(`${BASE_URL}/api/clientes/${id}`)
      .pipe(
        map(({ mensaje }) => mensaje),
        catchError(e => {
          if (e.error.mensaje) {
            console.log(e.error.mensaje);
          }
          return throwError(() => e);
        })
      );
  }

  subirFoto(archivo: File, id: number): Observable<HttpEvent<any>> {
    let formData = new FormData(); //Clase nativa de JavaScript
    formData.append("archivo", archivo);
    formData.append("id", id.toString());

    const req = new HttpRequest('POST', `${BASE_URL}/api/clientes/upload`, formData, {
      reportProgress: true,
    });

    return this.http.request(req)
      .pipe(
        catchError(e => {
          //** Al redireccionar queda el fondo del modal, con esto lo eliminamos
          document.getElementsByClassName('modal-backdrop')[0].remove();
          console.log('Error al subir la foto', e);
          return throwError(() => e);
        })
      );
  }
}
