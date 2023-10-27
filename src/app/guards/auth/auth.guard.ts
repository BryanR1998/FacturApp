import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs';

export const RouterInjection = () => inject(Router);

export const authStateObs$ = () => inject(AuthService).authState$;

export const authGuard: CanActivateFn = () => {
  const router = RouterInjection();

  return authStateObs$().pipe(
    map((user) => {
      // si el usuario no existe devolver al login
      if (!user) {
        router.navigateByUrl('auth/login');
        return false;
      }
      return true;
    })
  );
};

export const publicGuard: CanActivateFn = () => {
  const router = RouterInjection();

  return authStateObs$().pipe(
    map((user) => {
      if (user) {
        router.navigateByUrl('/');
        return false;
      }
      return true;
    })
  )
}
