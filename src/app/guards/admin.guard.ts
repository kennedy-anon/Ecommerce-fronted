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
      //console.log("canActivate called");
      //this.authService.isAdmin();

      if (this.authService.isAdmin()){
        return true;
      }else{
        this.router.navigate(['/login']);
        return false;
      }

  }
  
}
