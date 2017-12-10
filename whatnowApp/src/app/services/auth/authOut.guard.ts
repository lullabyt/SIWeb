
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuardOut implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/bienvenida']);
      return false;
    }
    return true;
  }

}
