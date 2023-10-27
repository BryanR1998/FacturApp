import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent:() => import('./pages/home/home.component'),
  },
  {
    path: 'auth',
    canActivate: [publicGuard],
    children: [
      {
        path: 'sign-up',
        loadComponent: () => import('./pages/auth/sign-up/sign-up.component')
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login.component')
      },
    ]
  }
];
