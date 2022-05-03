import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { iif, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { Cliente } from '../../interfaces/cliente.interface';
import { ClienteService } from '../../services/cliente.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cliente: Cliente = this.clienteEmpty;
  titulo: string = 'Nuevo cliente';
  errores: string[] = [];

  private get clienteEmpty(): Cliente {
    return { nombre: '', apellido: '', email: '' };
  }

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return iif(() => id !== undefined, this.clienteService.getCliente(id), of(this.clienteEmpty))
        })
      )
      .subscribe(cliente => this.cliente = cliente);
  }

  create(): void {
    this.validarCampos();
    this.clienteService.create(this.cliente)
      .subscribe({
        next: cliente => {
          this.router.navigate(['/clientes']);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '¡Nuevo cliente registrado!',
            text: `CLIENTE: ${cliente.nombre} ${cliente.apellido}`,
            showConfirmButton: false,
            timer: 2000
          });
        },
        error: e => {
          this.errores = e.error.errors as string[];
          console.log('Código del error desde el backend ' + e.status);
          console.log(this.errores);
        }
      });
  }

  update(): void {
    this.validarCampos();
    this.clienteService.update(this.cliente)
      .subscribe({
        next: cliente => {
          this.router.navigate(['/clientes']);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cliente actualizado correctamente',
            text: `CLIENTE: ${cliente.nombre} ${cliente.apellido}`,
            showConfirmButton: false,
            timer: 2000
          });
        },
        error: e => {
          this.errores = e.error.errors as string[];
          console.log('Código del error desde el backend ' + e.status);
          console.log(this.errores);
        }
      });
  }

  validarCampos(): void {
    if (this.cliente.nombre?.trim() === '') {
      delete this.cliente.nombre;
    }

    if (this.cliente.apellido?.trim() === '') {
      delete this.cliente.apellido;
    }

    if (this.cliente.email?.trim() === '') {
      delete this.cliente.email;
    }
  }



}
