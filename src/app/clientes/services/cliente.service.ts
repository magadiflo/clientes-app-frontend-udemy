import { Injectable } from '@angular/core';

import { CLIENTES } from '../data/clientes.data';
import { Cliente } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  getClientes(): Cliente[] {
    return CLIENTES;
  }
}
