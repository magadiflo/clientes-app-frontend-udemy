import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localePE from "@angular/common/locales/es-PE";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListadoComponent } from './clientes/pages/listado/listado.component';
import { ClienteComponent } from './clientes/pages/cliente/cliente.component';

registerLocaleData(localePE, 'es-PE');

const routes: Routes = [
  { path: 'clientes', component: ListadoComponent, },
  { path: 'clientes/page/:page', component: ListadoComponent, },
  { path: 'clientes/form', component: ClienteComponent, },
  { path: 'clientes/form/:id', component: ClienteComponent, },
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
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-PE' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
