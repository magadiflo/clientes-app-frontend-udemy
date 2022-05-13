import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { FacturaService } from '../../services/factura.service';
import { Factura } from '../../interfaces/factura.interface';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
})
export class DetalleFacturaComponent implements OnInit {

  factura!: Factura
  titulo: string = 'Factura';

  constructor(
    private activatedRoute: ActivatedRoute,
    private facturaService: FacturaService) { }

  ngOnInit(): void {
    //** Al redireccionar queda el fondo del modal, con esto lo eliminamos
    const fondoModal = document.getElementsByClassName('modal-backdrop');
    if (fondoModal.length > 0) {
      fondoModal[0].remove();
    }

    this.activatedRoute.paramMap
      .pipe(
        switchMap(params => this.facturaService.getFactura(parseInt(params.get('id')!)))
      )
      .subscribe(factura => this.factura = factura);
  }

}
