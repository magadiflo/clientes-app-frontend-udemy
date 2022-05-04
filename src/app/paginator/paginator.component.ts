import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { PaginacionCliente } from '../clientes/interfaces/paginacion.interface';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: [
    './paginator.component.css',
  ]
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input()
  paginacionCliente!: PaginacionCliente;
  paginas: number[] = [];
  desde!: number;
  hasta!: number;

  constructor() { }

  ngOnInit(): void {
    console.log(this.paginacionCliente);
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paginacionCliente'].previousValue) {
      this.initPaginator();
    }
  }

  private initPaginator(): void {
    this.desde = Math.min(Math.max(1, this.paginacionCliente.number - 4), this.paginacionCliente.totalPages - 5);
    this.hasta = Math.max(Math.min(this.paginacionCliente.totalPages, this.paginacionCliente.number + 4), 6);

    if (this.paginacionCliente.totalPages > 5) {
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((valor, indice) => indice + this.desde);
    } else {
      this.paginas = new Array(this.paginacionCliente.totalPages).fill(0).map((valor, indice) => indice + 1);
    }
  }

  esPaginaActual(pagina: number): boolean {
    return pagina - 1 == this.paginacionCliente.number;
  }

  hayPaginaAnterior(): boolean {
    return this.paginacionCliente.number > 0;
  }

  hayPaginaSiguiente(): boolean {
    return this.paginacionCliente.number < this.paginacionCliente.totalPages - 1;
  }

}
