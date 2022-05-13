import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpEventType } from '@angular/common/http';

import Swal from 'sweetalert2';

import { FacturaService } from '../../../facturas/services/factura.service';
import { AuthService } from '../../../usuarios/services/auth.service';
import { ClienteService } from '../../services/cliente.service';
import { ModalService } from '../../services/modal.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { Factura } from '../../../facturas/interfaces/factura.interface';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnChanges {

  @Input()
  cliente!: Cliente;
  titulo: string = 'Información del cliente';
  fotoSeleccionada!: File | null;
  progreso: number = 0;

  @ViewChild('inputFoto')
  inputFoto!: ElementRef;

  constructor(
    private clienteService: ClienteService,
    private modalService: ModalService,
    public authService: AuthService,
    private facturaService: FacturaService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges', changes);
    if (this.inputFoto) {
      this._reset();
    }
  }

  ngOnInit(): void {

  }

  seleccionarFoto(event: any) {
    this.fotoSeleccionada = event.target!.files[0];
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada!.type.indexOf('image') < 0) {
      Swal.fire('Error Seleccionar imagen', 'El archivo debe ser del tipo imagen', 'error');
      this._reset();
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      Swal.fire('Error upload', 'Debe seleccionar una foto', 'error');
    } else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id!)
        .subscribe((event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total!) * 100);
          } else if (event.type == HttpEventType.Response) {
            this.cliente = event.body.cliente;

            this.modalService.notificarUpload.emit(this.cliente);

            this._reset();
            Swal.fire(
              'La foto se ha subido completamente!',
              `${event.body.mensaje}`,
              'success');
          }
        });
    }
  }

  private _reset(): void {
    this.progreso = 0;
    this.fotoSeleccionada = null;
    this.inputFoto.nativeElement.value = '';
  }

  delete(factura: Factura) {
    Swal.fire({
      title: `¿Seguro que quiere eliminar?`,
      text: `¡Atención! La factura '${factura.descripcion}' será eliminado`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.facturaService.delete(factura.id!)
          .subscribe(resp => {
            this.cliente.facturas = this.cliente.facturas?.filter(fac => fac != factura);
            Swal.fire(
              '¡Eliminado!',
              `La factura '${factura.descripcion}' fue eliminado`,
              'success',
            );
          });
      }
    });
  }
}
