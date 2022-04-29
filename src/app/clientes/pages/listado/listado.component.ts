import { Component, OnInit } from '@angular/core';

import { Cliente } from '../../interfaces/cliente.interface';
import { CLIENTES } from '../../data/clientes.data';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  clientes: Cliente[] = CLIENTES;

  constructor() { }

  ngOnInit(): void {
  }

}
