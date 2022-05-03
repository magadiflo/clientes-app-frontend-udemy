import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.getClientes()
      .subscribe(clientes => this.clientes = clientes);
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
            this.cargarClientes();
            Swal.fire(
              '¡Eliminado!',
              `El cliente ${cliente.nombre} ${cliente.apellido} fue eliminado`,
              'success',
            );
          });
      }
    });
  }

}
