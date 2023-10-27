import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { LogInForm } from '../../../interfaces/loginForm.interface';
import { AuthService } from '../../../services/auth/auth.service';
import { Access } from '../../../interfaces/access.interface';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SweetAlert2Module
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent {

  // importar el auth services y router
  private authService = inject(AuthService);
  private _router = inject(Router);

  hide = true;

  formBuilder = inject(FormBuilder);

  // Implementacion de interface SignUpForm para realizar validaciones
  form: FormGroup<LogInForm> = this.formBuilder.group({

    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    })

  });

  constructor() { }

  async logIn(): Promise<void> {
    if (this.form.invalid) return;

    const access: Access = {
      email: this.form.value.email || '',
      password: this.form.value.password || ''
    }

    try {
      const userAccess = await this.authService.logInUser(access);
      console.log(userAccess);
      Swal.fire('¡Inicio de sesión exitoso!', 'Has ingresado correctamente.', 'success')
      .then((result) => {
        if (result.isConfirmed) {
          // Redirige al usuario a la página deseada después del inicio de sesión
          this._router.navigateByUrl('/');
        }
      });
    } catch (error) {
      console.error(error);
    }

  }

  //  Comprueba si el campo email del formulario es valido.
  get isEmailValid(): string | boolean {

    const control = this.form.get('email');

    const isInvalid = control?.invalid && control.touched;

    if (isInvalid) {
      return control.hasError('required')
        ? 'Este campo es requerido'
        : 'Ingrese un correo valido';
    }

    return false;

  }

  //  Comprueba si un campo del formulario es inválido y ha sido modificado o tocado.
  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);

    // Verificar si el control no es nulo y si es inválido y ha sido modificado o tocado
    return !!control && control.invalid && (control.dirty || control.touched);
  }

}
