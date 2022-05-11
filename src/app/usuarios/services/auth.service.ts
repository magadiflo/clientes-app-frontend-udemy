import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Usuario } from '../interfaces/usuario.interface';
import { TokenResponse } from '../interfaces/auth.interface';

const BASE_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(usuario: Usuario): Observable<TokenResponse> {
    const credenciales = btoa(`angularapp:12345`); //** btoa, encripta en base 64 (js)
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${credenciales}`
    });
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username!);
    params.set('password', usuario.password!);

    return this.http.post<TokenResponse>(`${BASE_URL}/oauth/token`, params, { headers: httpHeaders });
  }
}
