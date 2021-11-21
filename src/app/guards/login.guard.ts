import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/utils/auth.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const user = this.authService.getCurrentUser();
        if (user) {
            this.router.navigate(['/sitio/clientes']);
            return false;
        }
        return true;
    }
  
}
