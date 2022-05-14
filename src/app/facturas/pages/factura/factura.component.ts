import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { switchMap } from 'rxjs/operators';
import { Observable, of, map } from 'rxjs';
import Swal from 'sweetalert2';

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
  productosFiltrados!: Observable<Producto[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private facturaService: FacturaService,
    private router: Router) { }

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

    if (this.factura.items === undefined) {
      this.factura.items = [];
    }

    if (this.existeItem(producto.id!)) {
      this.incrementaCantidad(producto.id!);
    } else {
      let nuevoItem: ItemFactura = {};
      nuevoItem.producto = producto;
      nuevoItem.cantidad = 1;
      this.factura.items!.push(nuevoItem);
    }

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(idProducto: number, event: any): void {
    let cantidad: number = <number>event.target.value;
    if (cantidad == 0) {
      return this.eliminarItem(idProducto);
    }
    this.factura.items = this.factura.items?.map((item: ItemFactura) => {
      if (item.producto!.id === idProducto) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  existeItem(idProducto: number): boolean {
    let existe = false;
    this.factura.items?.forEach((item: ItemFactura) => {
      if (item.producto?.id === idProducto) {
        existe = true;
      }
    });
    return existe;
  }

  incrementaCantidad(idProducto: number): void {
    this.factura.items = this.factura.items?.map((item: ItemFactura) => {
      if (item.producto!.id === idProducto) {
        ++item.cantidad!;
      }
      return item;
    });
  }

  eliminarItem(idProducto: number): void {
    this.factura.items = this.factura.items?.filter((item: ItemFactura) => item.producto!.id != idProducto);
  }

  calcularImporte(item: ItemFactura): number {
    return item.cantidad! * item.producto?.precio!;
  }

  calcularGranTotal(): number {
    let total = 0;
    this.factura.items?.forEach((item: ItemFactura) => {
      total += this.calcularImporte(item);
    });
    return total;
  }

  create(): void {
    console.log('Factura a guardar...', this.factura);
    this.facturaService.create(this.factura)
      .subscribe((resp: Factura) => {
        Swal.fire(this.titulo, `Factura ${resp.descripcion} creada con éxito!`, 'success');
        console.log('Factura Guardada....', resp);
        this.router.navigate(['/clientes']);
      });
  }

}
