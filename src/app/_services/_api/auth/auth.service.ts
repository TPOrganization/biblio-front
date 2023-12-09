import { Injectable } from '@angular/core'
import { AxiosClientService } from '../axios-client.service'
import { AppConfigService } from '../../app-config.service'
import { ApiUser, User } from 'src/app/_models/_services/_api/_database/user/user.models'
import { AxiosError } from 'axios'
import { Router } from '@angular/router'
import { LoadingSpinnerService } from '../../overlay.service'
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

    userLogIn: User
    private _path: string

    constructor(
        private readonly _axios: AxiosClientService,
        private readonly _appConfigService: AppConfigService,
        private readonly _router: Router,
        private readonly _loadingSpinnerService: LoadingSpinnerService
    ) {
        this._path = this._appConfigService.config.API_PATH.AUTH
    }

    getCurrentUserLabel = (): string => `${this.userLogIn.firstName} ${this.userLogIn.lastName}`

    logOut() {
        localStorage.removeItem(this._axios.getTokenKey())
        localStorage.removeItem(this._axios.getUserKey())
        this._router.navigate(['/'])
    }

    isAuth(): Observable<AuthReponse | false> {
        const observable = from(this._axios.get({ path: `${this._path}/user` })) as Observable<AuthReponse>
        return observable.pipe(
            map(data => {
                if (!this.userLogIn && data) {
                    const localStorageUser = localStorage.getItem(this._axios.getUserKey())
                    this.userLogIn = new User(localStorageUser ? JSON.parse(localStorageUser) : data.user)
                }
                return data
            }),
            catchError(() => of(false as const))
        )
    }

    async signIn(username: string, password: string): Promise<boolean | AxiosError> {
        try {
            return await this._loadingSpinnerService.attachCallbackInOverlay(async (): Promise<boolean> => {
                const { accessToken, user }: { accessToken: string, user: ApiUser } = await this._axios.post({ path: `${this._path}/sign-in`, params: { username, password } })
                this._setLocalStorageAuth(user, accessToken)
                return true
            })
        } catch (error) {
            return error as AxiosError
        }
    }

    async signUp(formValue: AuthForm): Promise<User | AxiosError> {
        try {
            return await this._loadingSpinnerService.attachCallbackInOverlay(async () => {
                const data: ApiUser = await this._axios.post({ path: `${this._path}/sign-up`, params: formValue })
                return new User(data)
            })
        } catch (error) {
            return error as AxiosError
        }
    }

    async forgotPassword(email: string) {
        try {
            const data = await this._axios.post({ path: `${this._path}/forgot-password`, params: { email } })
            return data
        } catch (error) {
            return error as AxiosError
        }
    }

    private _setLocalStorageAuth(user: ApiUser, token: string) {
        if (token !== '') { localStorage.setItem(this._axios.getTokenKey(), token) }
        localStorage.setItem(this._axios.getUserKey(), JSON.stringify(user))
    }
}
