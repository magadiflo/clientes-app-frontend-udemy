import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import { startWith, switchMap } from 'rxjs/operators';
import { Observable, map } from 'rxjs';

import { ClienteService } from '../../../clientes/services/cliente.service';
import { Factura } from '../../interfaces/factura.interface';


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
  productosFiltrados!: Observable<string[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService) { }

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

    this.productosFiltrados = this.autocompleteControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.productos.filter(option => option.toLowerCase().includes(filterValue));
  }

}
