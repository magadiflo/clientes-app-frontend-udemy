import { Component, OnInit } from '@angular/core';
import { AuthService } from '../usuarios/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    public authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    Swal.fire('Logout', `Hola ${this.authService.usuario.username}, has cerrado sessión con éxito!`, 'success');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
