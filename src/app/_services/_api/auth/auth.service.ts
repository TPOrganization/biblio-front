import { Injectable } from '@angular/core'
import { AxiosClientService } from '../axios-client.service';
import { Router } from '@angular/router';
import { AppConfigService } from '../../app-config.service';
import { NgForm } from '@angular/forms';


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

    async signIn(formValue: any) {
        const data = await this.axios.post({ path: `${this._path}/sign-in`, params: { email: formValue.email, password: formValue.password } })
        console.log('dataSignIn', data)
    }

    async signUp(formValue: any) {
        console.log(formValue)
        const data = await this.axios.post({ path: `${this._path}/sign-up`, params: {formValue} })
        console.log('dataSignUp', data)
    }

    // async forgotPassword(formValue: any) {
    //     const data = await this.axios.post({ path: `${this._path}/forgot-password`, params: { username: formValue.email, password: formValue.password } })
    //     console.log('data', data)
    // }
}
