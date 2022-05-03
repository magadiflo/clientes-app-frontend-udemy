import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import Swal from 'sweetalert2';

import { environment } from '../../../environments/environment';
import { Cliente } from '../interfaces/cliente.interface';

const BASE_URL = environment.baseUrl;
const BAD_REQUEST: number = 400;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${BASE_URL}/api/clientes`)
      .pipe(
        map((clientes: Cliente[]) => clientes.map((cliente: Cliente) => {
          cliente.nombre = cliente.nombre?.toUpperCase();
          let datePipe = new DatePipe('es');
          cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy')!;
          return cliente;
        }))
      );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${BASE_URL}/api/clientes/${id}`)
      .pipe(
        catchError(e => {
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
          console.log(e);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => e);
        })
      );
  }
}
