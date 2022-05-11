import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../services/auth.service';
import { Usuario } from '../interfaces/usuario.interface';
import { Payload } from '../interfaces/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = 'Por favor Sign In!';
  usuario: Usuario = {};

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(): void {
    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire('Error Login', 'Usuario o password incorrectos', 'error');
      return;
    }
    this.authService.login(this.usuario)
      .subscribe(resp => {
        console.log(resp);
        let payload: Payload = JSON.parse(atob(resp.access_token.split('.')[1]));
        this.router.navigate(['/clientes']);
        Swal.fire('Login', `Hola ${payload.user_name}, has iniciado sesión con éxito!`, 'success');
      });
  }

}
