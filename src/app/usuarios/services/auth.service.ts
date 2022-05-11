import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Usuario } from '../interfaces/usuario.interface';
import { TokenResponse, Payload } from '../interfaces/auth.interface';

const BASE_URL = environment.baseUrl
const SESSION_STORAGE_USUARIO = 'usuario';
const SESSION_STORAGE_TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario = {};
  private _token: string = "";

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem(SESSION_STORAGE_USUARIO) != null) {
      this._usuario = <Usuario>JSON.parse(sessionStorage.getItem(SESSION_STORAGE_USUARIO)!);
    }
    return {};
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem(SESSION_STORAGE_TOKEN) != null) {
      this._token = sessionStorage.getItem(SESSION_STORAGE_TOKEN)!;
      return this._token;
    }
    return "";
  }


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
    console.log(params.toString());//grant_type=password&username=admin&password=12345
    return this.http.post<TokenResponse>(`${BASE_URL}/oauth/token`, params.toString(), { headers: httpHeaders });
  }

  guardarUsuario(access_token: string): void {
    let payload = this.obtenerPayloadToken(access_token);
    console.log('guardarUsuario()', payload);

    this._usuario.nombre = payload?.nombre;
    this._usuario.apellido = payload?.apellido;
    this._usuario.email = payload?.email;
    this._usuario.username = payload?.user_name;
    this._usuario.roles = payload?.authorities;
    sessionStorage.setItem(SESSION_STORAGE_USUARIO, JSON.stringify(this._usuario));
  }

  guardarToken(access_token: string): void {
    this._token = access_token;
    sessionStorage.setItem(SESSION_STORAGE_TOKEN, access_token);
  }

  obtenerPayloadToken(access_token: string): Payload | null {
    if (access_token != null && access_token != "") {      
      return JSON.parse(atob(access_token.split('.')[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerPayloadToken(this.token);
    return payload != null && payload.user_name != null && payload.user_name.length > 0;
  }
}
