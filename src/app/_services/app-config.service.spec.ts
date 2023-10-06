import { TestBed } from '@angular/core/testing'

import { AppConfigService } from './app-config.service'

describe('AppConfigService', () => {
    let service: AppConfigService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(AppConfigService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })


    it('#config() should be return env.json config', () => {
        const config = service.config
        /* eslint-disable */
        expect(config).toEqual(service['appConfig'])
    })
})
