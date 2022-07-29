import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  loginStatus: boolean = true;

  constructor(private authService: AuthService, private router: Router){};

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      //checks if admin and if token is valid(hasn't expired)
      if ((this.authService.isAdmin()) && (this.authService.isNotExpired())){
        return true;
      }else{
        this.router.navigate(['/login']);
        return false;
      }

  }
  
}
