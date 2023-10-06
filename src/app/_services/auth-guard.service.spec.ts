import { TestBed } from '@angular/core/testing'
import { Router, RouterEvent } from '@angular/router'
import { ReplaySubject } from 'rxjs'
import { AppConfigService } from './app-config.service'
import { AppConfigServiceMock } from './app-config-mock.service'

import { AuthGuardService } from './auth-guard.service'
import { MockOverlayService } from './overlay-service-mock'
import { OverlayService } from './overlay.service'

describe('AuthGuardService', () => {
    let service: AuthGuardService
    const eventSubject = new ReplaySubject<RouterEvent>(1)
    const routerMock = {
        navigate: jasmine.createSpy('navigate'),
        events: eventSubject.asObservable(),
        url: 'test/url'
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: OverlayService, useClass: MockOverlayService },
                { provide: AppConfigService, useClass: AppConfigServiceMock },
                { provide: Router, useValue: routerMock }
            ]
        })
        service = TestBed.inject(AuthGuardService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
