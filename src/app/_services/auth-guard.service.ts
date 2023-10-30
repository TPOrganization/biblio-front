import { Injectable } from '@angular/core'
import {Router, UrlTree } from '@angular/router'
import { AuthService } from './_api/auth/auth.service'
import { Observable, map } from 'rxjs'


@Injectable({
    providedIn: 'root'
})

export class AuthGuardService {
    constructor(
        private authService: AuthService,
    ) { }

    canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        try {
            return this.authService.isAuth().pipe(
                map(isLoggedIn => {
                    if (isLoggedIn === false) {
                        this.authService.logOut()
                        return false
                    }
                    return !!isLoggedIn
                })
            )
        } catch (error) {
            return false
        }
    }
}




