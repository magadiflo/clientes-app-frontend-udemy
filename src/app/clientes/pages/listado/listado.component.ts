import { Component, OnInit } from '@angular/core';

import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clientes = this.clienteService.getClientes();
  }

}
