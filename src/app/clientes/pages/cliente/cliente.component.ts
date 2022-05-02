import { Component, OnInit } from '@angular/core';

import { Cliente } from '../../interfaces/cliente.interface';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  //Partial<Cliente>: es un "Utility Type" de TypeScript, donde, 
  //todas las propiedades del objeto cliente se marcarán como opcionales
  clientePartial: Partial<Cliente> = {};
  titulo: string = 'Nuevo cliente';

  constructor() { }

  ngOnInit(): void {
  }

  create(): void {
    console.log(this.clientePartial);  
  }

}
