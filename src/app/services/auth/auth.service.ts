import { Injectable, inject } from '@angular/core';
import { Auth, UserCredential, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Access } from '../../interfaces/access.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);

  // propiedad para el estado del usuario
  readonly authState$ = authState(this.auth);

  constructor() { }

  // Servicio para crear usuario
  createUser(access: Access): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this.auth,
      access.email,
      access.password);
  }

  // Servicio para iniciar Sesion
  logInUser(access: Access) {
    return signInWithEmailAndPassword(
      this.auth,
      access.email,
      access.password
    );
  }

  // Servicio para cerrar Seccion
  logOut():Promise<void> {
    return this.auth.signOut();
  }

}
