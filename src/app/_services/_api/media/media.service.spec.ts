import { TestBed } from '@angular/core/testing'

import { MediaService } from './media.service'

describe('MediaService', () => {
    let service: MediaService<string>

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(MediaService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
