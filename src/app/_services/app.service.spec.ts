import { TestBed } from '@angular/core/testing'

import { AppService } from './app.service'

describe('AppService', () => {
    let service: AppService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(AppService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('#getCurrentTitle() should be return current title', () => {
        service.setCurrentTitle('test')
        /* eslint-disable */
        const title = service.getCurrentTitle()
        expect(title).toEqual(service['_currentTitle'])
    })
})
