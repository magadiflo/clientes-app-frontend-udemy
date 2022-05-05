import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Cliente } from '../../interfaces/cliente.interface';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit {

  cliente!: Cliente;
  titulo: string = 'Información del cliente';

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(params => {
        if (params.has('id')) {
          let id: number = parseInt(params.get('id')!);
          this.clienteService.getCliente(id)
            .subscribe(cliente => {
              this.cliente = cliente;
            });
        }
      });
  }

}
