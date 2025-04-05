import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
declare var $: any; // Declarar jquery como una variable global

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  credentials = {
    email:'',
    password: ''
  };
  errorMessage: string | null = null; // Propiedad para el mensaje de error
  faExclamationTriangle = faExclamationTriangle;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMessage = null; // Resetea el mensaje antes de inicar el login
    this.authService.login(this.credentials).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['vista-usuario']);
      },
      (error) => {
        console.error('Error en login', error)
        this.errorMessage = error.error.message || 'Error al inicar sesión';
        // Oculta el mensaje después de 3 segundos
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      }
    );
  }
}
