import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService, _isAuthenticated } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor(
    private router:Router,
    private readonly authService:AuthService
    ){}


    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let url = state.url
      
      this.authService.identitiyChech();
      
      if(!_isAuthenticated)
      {
        this.authService.redirectUrl = url
        this.router.navigate(['/login']);
        return false
      }
      return true
    }
}
  

