import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Cliente } from '../interfaces/cliente.interface';
import { environment } from '../../../environments/environment.prod';

const BASE_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${BASE_URL}/api/clientes`);
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${BASE_URL}/api/clientes/${id}`);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${BASE_URL}/api/clientes`, cliente, { headers: this.httpHeaders });
  }
}
