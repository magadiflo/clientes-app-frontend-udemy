import { Component, OnInit } from '@angular/core';

import { ClienteService } from '../../../clientes/services/cliente.service';
import { Factura } from '../../interfaces/factura.interface';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styles: [
  ]
})
export class FacturaComponent implements OnInit {

  titulo: string = 'Nueva factura';
  factura!: Factura;

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
  }

}
