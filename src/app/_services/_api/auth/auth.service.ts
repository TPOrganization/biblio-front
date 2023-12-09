import { Injectable } from '@angular/core'
import { AxiosClientService } from '../axios-client.service'
import { AppConfigService } from '../../app-config.service'
import { ApiUser, User } from 'src/app/_models/_services/_api/_database/user/user.models'
import { AxiosError } from 'axios'
import { Router } from '@angular/router'
import { LoadingSpinnerService } from '../../overlay.service'
import { OverlayRef } from '@angular/cdk/overlay'
import { Observable, catchError, from, map, of } from 'rxjs'

export interface AuthReponse {
    accessToken: string
    user: User
}

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
    userLogIn: User
    isAuthenticated: boolean
    overlayRef: OverlayRef
    constructor(

        private axios: AxiosClientService,
        private appConfigService: AppConfigService,
        private router: Router,
        public loadingSpinnerService: LoadingSpinnerService

    ) {
        this._path = appConfigService.config.API_PATH.AUTH
    }

    getCurrentUserLabel = (): string => `${this.userLogIn.firstName} ${this.userLogIn.lastName}`

    async signIn(username: string, password: string): Promise<AuthReponse | AxiosError> {
        try {
            return await this.loadingSpinnerService.attachCallbackInOverlay(async () => {
                const { accessToken, user }: { accessToken: string, user: ApiUser } = await this.axios.post({ path: `${this._path}/sign-in`, params: { username, password } })
                localStorage.setItem(this.axios.getTokenKey(), accessToken)
                localStorage.setItem(this.axios.getUserKey(), JSON.stringify(user))
                this.userToken = accessToken
                this.userLogIn = new User(user)
                return { accessToken, user: new User(user) }
            })
        } catch (error) {
            return error as AxiosError
        }
    }

    private setUserLogin(user: ApiUser) {
        const localStorageUser = localStorage.getItem(this.userToken)
        this.userLogIn = new User(localStorageUser ? JSON.parse(localStorageUser) : user)
    }

    isAuth(): Observable<AuthReponse | false> {
        const observable = from(this.axios.get({ path: `${this._path}/user` })) as Observable<AuthReponse>
        return observable.pipe(
            map(data => {
                if (data) {
                    this.setUserLogin(data as any)
                    this.isAuthenticated = true
                }
                return data
            }),
            catchError(() => of(false as const))
        )
    }


    async signUp(formValue: AuthForm): Promise<User | AxiosError> {
        try {
            return await this.loadingSpinnerService.attachCallbackInOverlay(async () => {
                const data: ApiUser = await this.axios.post({ path: `${this._path}/sign-up`, params: formValue })
                return new User(data)
            })
        } catch (error) {
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
