import { Injectable } from '@angular/core'
import { AxiosClientService } from '../axios-client.service'
import { AppConfigService } from '../../app-config.service'
import { ApiUser, User } from 'src/app/_models/_services/_api/_database/user/user.models'
import { AxiosError } from 'axios'
import { Router } from '@angular/router'
import { LoadingSpinnerService } from '../../overlay.service'
import { OverlayRef } from '@angular/cdk/overlay';


export interface AuthForm {
    email: string
    password: string
    passwordConfirm: string
    firstName: string
    lastName: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _path: string
    userToken: string
    isAuth = false
    overlayRef: OverlayRef
    constructor(

        private axios: AxiosClientService,
        private appConfigService: AppConfigService,
        private router: Router,
        public loadingSpinnerService: LoadingSpinnerService
        
    ) {
        this._path = appConfigService.config.API_PATH.AUTH
    }

    async signIn(login: string, password: string): Promise<{ accessToken: string, user: User } | AxiosError> {
        
        try {
            this.loadingSpinnerService.attachOverlay()
            const { accessToken, user }: { accessToken: string, user: ApiUser } = await this.axios.post({ path: `${this._path}/sign-in`, params: { login, password } })
            localStorage.setItem(this.axios.getTokenKey(), accessToken)
            localStorage.setItem(this.axios.getUserKey(), JSON.stringify(user))
            this.userToken = accessToken
            this.isAuth = true
            this.loadingSpinnerService.detachOverlay();
            this.router.navigate(['/dashboard'])
            return { accessToken, user: new User(user) }
        } catch (error) {
            this.loadingSpinnerService.detachOverlay();
            return error as AxiosError
        }
    }

    async signUp(formValue: AuthForm): Promise<User | AxiosError> {
        try {
            this.loadingSpinnerService.attachOverlay()
            const data: ApiUser = await this.axios.post({ path: `${this._path}/sign-up`, params: formValue })
            this.loadingSpinnerService.detachOverlay();
            this.isAuth = true
            this.router.navigate(['/dashboard'])
            return new User(data)
        } catch (error) {
            this.loadingSpinnerService.detachOverlay();
            return error as AxiosError
        }
    }

    async forgotPassword(email: string) {
        try {
            const data = await this.axios.post({ path: `${this._path}/forgot-password`, params: { email } })
            return data
        } catch (error) {
            return error as AxiosError
        }
    }

    logOut() {
        localStorage.removeItem(this.axios.getTokenKey())
        localStorage.removeItem(this.axios.getUserKey())
        this.router.navigate(['/'])
    }
}
