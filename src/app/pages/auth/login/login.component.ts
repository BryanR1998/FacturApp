import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogInForm } from '../../../interfaces/loginForm.interface';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent {

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

  constructor() {}

  logIn(): void {
    if(this.form.invalid) return;
    console.log(this.form.value);
  }

}
