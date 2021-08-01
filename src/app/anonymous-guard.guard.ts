import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router';
import { AppService } from './services/app.service';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard {

  constructor(private router: Router, private appService: AppService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.appService.isAuthenticated())
      return true;
    this.router.navigate(['/']);
    return false;
  }
}
