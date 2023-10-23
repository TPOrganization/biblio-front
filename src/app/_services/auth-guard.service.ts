import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './_api/auth/auth.service';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class AuthGuardService {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        const userIsAuth = this.authService.isAuth
        if (userIsAuth) {
            return true
        } else {
            this.router.navigate([''])
            return false
        }
    }
}