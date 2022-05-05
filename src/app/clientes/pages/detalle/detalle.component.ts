import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  fotoSeleccionada!: File | null;

  @ViewChild('inputFoto')
  inputFoto!: ElementRef;

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
    this.fotoSeleccionada = event.target!.files[0];
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada!.type.indexOf('image') < 0) {
      Swal.fire('Error Seleccionar imagen', 'El archivo debe ser del tipo imagen', 'error');
      this.fotoSeleccionada = null;
      this._reset();
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      Swal.fire('Error upload', 'Debe seleccionar una foto', 'error');
    } else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id!)
        .subscribe(cliente => {
          this.cliente = cliente;
          this.fotoSeleccionada = null;
          this._reset();
          Swal.fire(
            'La foto se ha subido completamente!',
            `La foto se ha subido con éxito ${this.cliente.foto}`,
            'success');
        });
    }
  }

  private _reset(): void {
    console.log(this.inputFoto.nativeElement.files);
    this.inputFoto.nativeElement.value = '';
    console.log(this.inputFoto.nativeElement.files);
  }

}
