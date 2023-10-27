import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignUpForm } from '../../../interfaces/sign-upForm.interface';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export default class SignUpComponent {

  // Bolleano para mostrar Contraseña
  hide = true;

  formBuilder = inject(FormBuilder);

  // Implementacion de interface SignUpForm para realizar validaciones
  form: FormGroup<SignUpForm> = this.formBuilder.group({

    names: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    lastName: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),

  });

  constructor() {}

  signUp(): void {
    if(this.form.invalid) return;
    console.log(this.form.value);
  }

}
