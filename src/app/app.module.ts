import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListadoComponent } from './clientes/pages/listado/listado.component';
import { ClienteComponent } from './clientes/pages/cliente/cliente.component';

const routes: Routes = [
  { path: 'clientes', component: ListadoComponent, },
  { path: 'clientes/form', component: ClienteComponent, },
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
