import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { Usuario } from '../interfaces/usuario.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = 'Por favor Sign In!';
  usuario: Usuario = {};

  constructor() { }

  ngOnInit(): void {
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire('Error Login', 'Usuario o password incorrectos', 'error');
      return;
    }
  }

}
