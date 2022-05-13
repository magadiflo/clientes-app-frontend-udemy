import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { switchMap } from 'rxjs/operators';
import { Observable, of, map } from 'rxjs';

import { ClienteService } from '../../../clientes/services/cliente.service';
import { FacturaService } from '../../services/factura.service';
import { Factura } from '../../interfaces/factura.interface';
import { Producto } from '../../interfaces/producto.interface';
import { ItemFactura } from '../../interfaces/item-factura.interface';


@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styles: [
  ]
})
export class FacturaComponent implements OnInit {

  titulo: string = 'Nueva factura';
  factura!: Factura;

  autocompleteControl = new FormControl();
  productos: string[] = ['Mesa', 'Monitor', 'Sony', 'TV LG'];
  productosFiltrados!: Observable<Producto[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private facturaService: FacturaService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap(params => this.clienteService.getCliente(parseInt(params.get('clienteId')!)))
      )
      .subscribe(cliente => {
        this.factura = {};
        this.factura.cliente = cliente;
        console.log(this.factura);
      });

    this.productosFiltrados = this.autocompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.nombre),
        switchMap((termino: any) => {
          return termino ? this._filter(termino) : of([]);
        }),
      );
  }

  private _filter(termino: string): Observable<Producto[]> {
    const filterValue = termino.toLowerCase();
    return this.facturaService.filtrarProductos(filterValue);
  }

  mostrarNombre(producto: Producto): string {
    return producto ? producto.nombre! : '';
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto: Producto = <Producto>event.option.value;

    let nuevoItem: ItemFactura = {};
    nuevoItem.producto = producto;
    nuevoItem.cantidad = 1;

    if (this.factura.items === undefined) {
      this.factura.items = [];
    }
    this.factura.items!.push(nuevoItem);

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

}
