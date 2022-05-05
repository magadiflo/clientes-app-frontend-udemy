import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localePE from "@angular/common/locales/es-PE";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListadoComponent } from './clientes/pages/listado/listado.component';
import { ClienteComponent } from './clientes/pages/cliente/cliente.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { DetalleComponent } from './clientes/pages/detalle/detalle.component';
import { ImagenPipe } from './pipes/imagen.pipe';

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
    PaginatorComponent,
    DetalleComponent,
    ImagenPipe,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-PE' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
