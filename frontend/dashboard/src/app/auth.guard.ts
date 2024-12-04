import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate: CanActivateFn = (route, state) => {
    if (this.authService.isAuthenticatedUser()) {
      const userRole = this.authService.getUserRole();
      if (userRole === 'Admin') {
        return true; 
      } else {
        this.router.navigate(['/userpage']); 
        return false;
      }
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  };
}
