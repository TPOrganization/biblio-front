import { TestBed } from '@angular/core/testing'
import { Router, RouterEvent } from '@angular/router'
import { of, ReplaySubject } from 'rxjs'
import { AppConfigServiceMock } from '../../app-config-mock.service'
import { AppConfigService } from '../../app-config.service'
import { MockOverlayService } from '../../overlay-service-mock'
import { OverlayService } from '../../overlay.service'
import { AxiosClientService } from '../axios-client.service'
import { AuthReponse, AuthService } from './auth.service'

describe('AuthService', () => {
    let service: AuthService

    const eventSubject = new ReplaySubject<RouterEvent>(1)
    const routerMock = {
        navigate: jasmine.createSpy('navigate'),
        events: eventSubject.asObservable(),
        url: 'test/url'
    }

    const authReponse: AuthReponse = {
        token: 'test',
        user: {
            family_name: 'test',
            given_name: 'test',
            name: 'test',
            sub: 'test',
        } as any,
        maintenance: false
    }


    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                AxiosClientService,
                Router,
                { provide: OverlayService, useClass: MockOverlayService },
                { provide: AppConfigService, useClass: AppConfigServiceMock },
                { provide: Router, useValue: routerMock }
            ]
        })
        service = TestBed.inject(AuthService)
    })

    it('should be created', () => {
        service.logout()
        expect(service).toBeTruthy()
    })

    it('#isAuth() should be call axios get method with path', async () => {
        /* eslint-disable */
        spyOn(service['axios'], 'get').and.returnValue(of(authReponse) as any)
        service.isAuth().subscribe(response => {
            /* eslint-enable */
            expect(service['axios'].get).toHaveBeenCalledWith({ path: '/auth/user' })
            expect(response).toEqual(authReponse)
        })
    })
})
