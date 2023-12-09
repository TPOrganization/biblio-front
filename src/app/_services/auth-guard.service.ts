import { Injectable } from '@angular/core'
import { UrlTree } from '@angular/router'
import { AuthService } from './_api/auth/auth.service'
import { Observable, map } from 'rxjs'


@Injectable({
    providedIn: 'root'
})

export class AuthGuardService {
    constructor(
        private readonly _authService: AuthService,
    ) { }

    canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        try {
            return this._authService.isAuth().pipe(
                map(isLoggedIn => {
                    if (isLoggedIn === false) {
                        this._authService.logOut()
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




