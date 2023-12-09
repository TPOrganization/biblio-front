import { HttpClient } from '@angular/common/http'
import { Injectable, Injector } from '@angular/core'
import { lastValueFrom } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    private _appConfig: any = {}

    constructor(
        private readonly _injector: Injector
    ) { }

    async loadAppConfig() {
        const http = this._injector.get(HttpClient)
        const json = http.get('/env.json')
        const data = await lastValueFrom(json)
        this._appConfig = data
    }

    get config() { return this._appConfig }
}
