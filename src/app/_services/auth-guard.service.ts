import { Injectable } from '@angular/core'
import { Router, UrlTree } from '@angular/router';
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

        const userToken = this.authService.userToken
        console.log(userToken)
        if (userToken) {
            return true
        } else {
            this.router.navigateByUrl('')
            return false
        }
    }
}