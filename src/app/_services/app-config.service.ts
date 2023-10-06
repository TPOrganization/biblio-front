import { HttpClient } from '@angular/common/http'
import { Injectable, Injector } from '@angular/core'
import { lastValueFrom } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    private appConfig: any = {}

    constructor(private injector: Injector) { }

    async loadAppConfig() {
        const http = this.injector.get(HttpClient)
        const json = http.get('/env.json')
        const data = await lastValueFrom(json)
        this.appConfig = data
    }

    get config() { return this.appConfig }
}
