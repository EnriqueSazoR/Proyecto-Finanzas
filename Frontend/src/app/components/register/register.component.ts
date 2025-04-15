import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.registerForm = this.fb.group({
      Nombre: ['', [Validators.required, Validators.minLength(5)]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;

    const userData = this.registerForm.value;
    this.authService.register(userData).subscribe({
      next: (response: any) => {
        this.successMessage = response.message || '¡Registro exitoso! Redirigiendo a Perfil';
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/vista-usuario']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Error al registrarse. Intenteló de nuevo..'
        this.loading = false;
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      }
    });
  }

  get f() {
    return this.registerForm.controls;
  }
}
