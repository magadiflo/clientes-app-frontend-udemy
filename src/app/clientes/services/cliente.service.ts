import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CLIENTES } from '../data/clientes.data';
import { Cliente } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  getClientes(): Observable<Cliente[]> {
    return of(CLIENTES);
  }
}
