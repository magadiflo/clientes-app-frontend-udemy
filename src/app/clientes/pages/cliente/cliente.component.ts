import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { iif, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { Region } from '../../interfaces/region.interface';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cliente: Cliente = this.clienteEmpty;
  regiones: Region[] = [];
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

    this.clienteService.getRegiones()
      .subscribe(regiones => {
        console.log(regiones);
        this.regiones = regiones;
      });
  }

  create(): void {
    console.log(this.cliente); 
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
    console.log(this.cliente);  
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

  compararRegion(o1: Region, o2: Region): boolean {
    return o1 == null || o2 == null ? false : o1.id === o2.id;
  }

}
