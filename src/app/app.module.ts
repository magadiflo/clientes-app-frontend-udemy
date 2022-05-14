import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localePE from "@angular/common/locales/es-PE";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
import { ImagenPipe } from './pipes/imagen.pipe';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListadoComponent } from './clientes/pages/listado/listado.component';
import { ClienteComponent } from './clientes/pages/cliente/cliente.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { DetalleComponent } from './clientes/pages/detalle/detalle.component';
import { LoginComponent } from './usuarios/login/login.component';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';
import { DetalleFacturaComponent } from './facturas/pages/detalle-factura/detalle-factura.component';
import { FacturaComponent } from './facturas/pages/factura/factura.component';

registerLocaleData(localePE, 'es-PE');

const routes: Routes = [
  { path: 'login', component: LoginComponent, },
  { path: 'clientes', component: ListadoComponent, },
  { path: 'clientes/page/:page', component: ListadoComponent, },
  {
    path: 'clientes/form',
    component: ClienteComponent,
    canActivate: [AuthGuard, RoleGuard],
    canLoad: [AuthGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  {
    path: 'clientes/form/:id',
    component: ClienteComponent,
    canActivate: [AuthGuard, RoleGuard],
    canLoad: [AuthGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  { 
    path: 'facturas/:id', 
    component: DetalleFacturaComponent,
    canActivate: [AuthGuard, RoleGuard],
    canLoad: [AuthGuard],
    data: { role: 'ROLE_USER' },
  },
  { 
    path: 'facturas/form/:clienteId', 
    component: FacturaComponent,
    canActivate: [AuthGuard, RoleGuard],
    canLoad: [AuthGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  { path: '', redirectTo: 'clientes', pathMatch: 'full', },
  { path: '**', redirectTo: 'clientes', },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListadoComponent,
    ClienteComponent,
    PaginatorComponent,
    DetalleComponent,
    ImagenPipe,
    LoginComponent,
    DetalleFacturaComponent,
    FacturaComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-PE' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
