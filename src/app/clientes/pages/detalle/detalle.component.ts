import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

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
  private fotoSeleccionada!: File;

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

  seleccionarFoto(event: any) {
    console.log(event);
    this.fotoSeleccionada = event.target!.files[0];
    console.log(this.fotoSeleccionada);
  }

  subirFoto() {
    this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id!)
      .subscribe(cliente => {
        this.cliente = cliente;
        Swal.fire(
          'La foto se ha subido completamente!',
          `La foto se ha subido con éxito ${this.cliente.foto}`,
          'success');
      });
  }

}
