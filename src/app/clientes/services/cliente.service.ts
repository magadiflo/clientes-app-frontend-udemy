import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { environment } from '../../../environments/environment';
import { Cliente } from '../interfaces/cliente.interface';

const BASE_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${BASE_URL}/api/clientes`);
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
    return this.http.post<Cliente>(`${BASE_URL}/api/clientes`, cliente, { headers: this.httpHeaders });
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${BASE_URL}/api/clientes/${cliente.id}`, cliente, { headers: this.httpHeaders });
  }

  delete(id: number) {
    return this.http.delete(`${BASE_URL}/api/clientes/${id}`, { headers: this.httpHeaders });
  }
}
