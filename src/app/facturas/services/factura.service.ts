import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Factura } from '../interfaces/factura.interface';

const BASE_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) { }

  getFactura(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${BASE_URL}/api/facturas/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/api/facturas/${id}`);
  }
}
