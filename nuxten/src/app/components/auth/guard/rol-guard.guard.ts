import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ExpertoData } from 'src/app/interfaces/Experto';
import { UserService } from 'src/app/services/auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class RolGuardGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ) {

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    this.userService.getUserData().subscribe((userData: ExpertoData) => {
      const userCookie = userData;
      if (userCookie.rol.match('Experto')) {
        this.router.navigate(['nuxten/inicio']);
        return false;
      } else {
        return true;
      }
    });

  }
}
