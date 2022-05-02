import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { Cliente } from '../../interfaces/cliente.interface';
import { ClienteService } from '../../services/cliente.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cliente: Cliente = { nombre: '', apellido: '', email: '' };
  titulo: string = 'Nuevo cliente';

  constructor(
    private clienteService: ClienteService,
    private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
    this.clienteService.create(this.cliente)
      .subscribe(cliente => {
        this.router.navigate(['/clientes']);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '¡Nuevo cliente registrado!',
          text: `CLIENTE: ${cliente.nombre} ${cliente.apellido}`,
          showConfirmButton: false,
          timer: 2000
        });
      });
  }

}
