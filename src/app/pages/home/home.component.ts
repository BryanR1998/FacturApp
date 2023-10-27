import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export default class HomeComponent {

  private authService = inject(AuthService);
  private _router = inject(Router);

  constructor() { }

  async logOut(): Promise<void> {
    try {
      await this.authService.logOut();
      this._router.navigateByUrl('/auth/login');
    } catch (error) {
      console.log(error);
    }
  }

}
