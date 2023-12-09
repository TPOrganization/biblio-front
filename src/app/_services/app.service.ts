import { Injectable } from '@angular/core'
import { AppConfigService } from './app-config.service'

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(
        private readonly _appConfigService: AppConfigService
    ) { }

    getCoverUrl = (ibsn: string | undefined, size: 'S' | 'M' | 'L' = 'S'): string => `${this._appConfigService.config['ISBN_COVER_API_URL']}${ibsn}-${size}.jpg`
}
