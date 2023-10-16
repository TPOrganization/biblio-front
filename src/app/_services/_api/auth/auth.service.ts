import { Injectable } from '@angular/core'
import { AxiosClientService } from '../axios-client.service';
import { AppConfigService } from '../../app-config.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _path: string
    constructor(
        private axios: AxiosClientService,
        private appConfigService: AppConfigService
    ) {
        this._path = appConfigService.config.API_PATH.AUTH
     }

    async signIn(formValue : any) {
        const data = await this.axios.post({ path: `${this._path}/sign-in`, params: {formValue} })
    }

    async signUp(formValue : any) {
        const data = await this.axios.post({ path: `${this._path}/sign-up`, params: formValue })
        console.log('dataSignUp', data)
    }

    // async forgotPassword(formValue: any) {
    //     const data = await this.axios.post({ path: `${this._path}/forgot-password`, params: { username: formValue.email, password: formValue.password } })
    //     console.log('data', data)
    // }
}
