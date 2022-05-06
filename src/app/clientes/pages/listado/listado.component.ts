import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';

import { ClienteService } from '../../services/cliente.service';
import { ModalService } from '../../services/modal.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { PaginacionCliente } from '../../interfaces/paginacion.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit, OnDestroy {

  clientes: Required<Cliente>[] = [];
  page: number = 0;
  paginacionCliente!: PaginacionCliente;
  clienteSeleccionado!: Cliente;

  uploadSubscription!: Subscription;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService) { }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.uploadSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(params => {
        console.log(params);
        if (params.has('page')) {
          this.page = parseInt(params.get('page')!);
        }
        this.cargarClientesPaginado();
      });

    this.uploadSubscription = this.modalService.notificarUpload
      .subscribe(cliente => {
        this.clientes = this.clientes.map(clienteOriginal => {
          if (cliente.id == clienteOriginal.id) {
            clienteOriginal.foto = cliente.foto;
          }
          return clienteOriginal;
        });
      });
  }

  cargarClientesPaginado() {
    this.clienteService.getClientesPaginado(this.page)
      .subscribe(paginacionCliente => {
        this.clientes = paginacionCliente.content;
        this.paginacionCliente = paginacionCliente;
      });
  }

  delete(cliente: Cliente) {
    Swal.fire({
      title: `¿Seguro que quiere eliminar?`,
      text: `¡Atención! El cliente ${cliente.nombre} ${cliente.apellido} será eliminado`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id!)
          .subscribe(resp => {
            console.log(resp)
            this.cargarClientesPaginado();
            Swal.fire(
              '¡Eliminado!',
              `El cliente ${cliente.nombre} ${cliente.apellido} fue eliminado`,
              'success',
            );
          });
      }
    });
  }

  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
  }

}
