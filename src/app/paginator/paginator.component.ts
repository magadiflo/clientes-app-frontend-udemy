import { Component, OnInit, Input } from '@angular/core';

import { PaginacionCliente } from '../clientes/interfaces/paginacion.interface';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styles: [
  ]
})
export class PaginatorComponent implements OnInit {

  @Input()
  paginacionCliente!: PaginacionCliente;
  paginas: number[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.paginacionCliente);
    this.paginas = new Array(this.paginacionCliente.totalPages).fill(0).map((valor, indice) => indice + 1);
  }

  esPaginaActual(pagina: number): boolean {
    return pagina - 1 == this.paginacionCliente.number;
  }

}
