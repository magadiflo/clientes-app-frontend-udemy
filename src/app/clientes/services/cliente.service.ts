import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Cliente } from '../interfaces/cliente.interface';
import { environment } from '../../../environments/environment.prod';

const BASE_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${BASE_URL}/api/clientes`);
  }
}
