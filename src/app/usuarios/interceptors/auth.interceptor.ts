import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, catchError, throwError } from 'rxjs';

import Swal from 'sweetalert2';

import { AuthService } from '../services/auth.service';

const UNAUTHORIZED: number = 401;
const FORBIDDEN: number = 403;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('AuthInterceptor: intercept()'); 
    return next.handle(request)
      .pipe(
        catchError(e => {
          if (e.status == UNAUTHORIZED) {
            //Puede que el token haya expirado en el backend, así que cerramos la sesión y pedimos que vuelva a loguearse
            if (this.authService.isAuthenticated()) {
              this.authService.logout();
            }
            console.log('AuthInterceptor: Unauthorized');
            this.router.navigate(['/login']);
          }

          if (e.status == FORBIDDEN) {
            console.log('AuthInterceptor: Forbidden');
            Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso`, 'warning');
            this.router.navigate(['/clientes']);
          }
          return throwError(() => e);
        })
      );
  }
}
