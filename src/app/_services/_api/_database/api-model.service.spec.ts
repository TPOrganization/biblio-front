import { TestBed } from '@angular/core/testing'
import { AppConfigServiceMock } from '../../app-config-mock.service'
import { AppConfigService } from '../../app-config.service'
import { MockOverlayService } from '../../overlay-service-mock'
import { OverlayService } from '../../overlay.service'
import { ApiModelService } from './api-model.service'
import { AxiosClientService } from '../axios-client.service'

class MockApiReturn { constructor(data: any) { return data } }
describe('ApiModelService', () => {
    let service: ApiModelService<any, any>

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AxiosClientService,
                { provide: OverlayService, useClass: MockOverlayService },
                { provide: AppConfigService, useClass: AppConfigServiceMock },
                { provide: '', useValue: MockApiReturn }
            ]
        })
        service = TestBed.inject(ApiModelService)
        service.path = '/test'
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('#getById() should be call axios get method with path', async () => {
        /* eslint-disable */
        spyOn(service['axios'], 'get').and.callFake(() => { return { test: 'test' } as any })
        await service.getById(1)
        expect(service['axios'].get).toHaveBeenCalledWith({ path: '/test/1' })
        /* eslint-enable */
    })

    it('#getList() should be call axios get method with path', async () => {
        /* eslint-disable */
        spyOn(service['axios'], 'get').and.callFake(() => { return [{ test: 'test' }] as any })
        await service.getList()
        expect(service['axios'].get).toHaveBeenCalledWith({ path: '/test' })
        /* eslint-enable */
    })

    it('#getListByField() should be call axios post method with path and param', async () => {
        /* eslint-disable */
        spyOn(service['axios'], 'post').and.callFake(() => { return [{ test: 'test' }] as any })
        await service.getListByField({ test: 'test' })
        expect(service['axios'].post).toHaveBeenCalledWith({ path: '/test/list-by-fields', params: { test: 'test' } })
        /* eslint-enable */
    })

    it('#save() should be call axios post method with path and param', async () => {
        /* eslint-disable */
        spyOn(service['overlay'], 'attachCallbackInOverlay').and.callThrough()
        spyOn(service['axios'], 'post').and.callFake(() => { return [{ test: 'test' }] as any })
        await service.save({ test: 'test' })
        expect(service['axios'].post).toHaveBeenCalledWith({ path: '/test', params: { test: 'test' } })
        /* eslint-enable */
    })

    it('#save() should return null on error', async () => {
        /* eslint-disable */
        spyOn(service['overlay'], 'attachCallbackInOverlay').and.callThrough()
        spyOn(service['axios'], 'post').and.callFake(() => { return null as any })
        await service.save({ test: 'test' })
        expect(service['axios'].post).toHaveBeenCalledWith({ path: '/test', params: { test: 'test' } })
        /* eslint-enable */
    })

    it('#delete() should be call axios delete method with path', async () => {
        /* eslint-disable */
        spyOn(service['overlay'], 'attachCallbackInOverlay').and.callThrough()
        spyOn(service['axios'], 'delete').and.callFake(() => { return true as any })
        await service.delete(1)
        expect(service['axios'].delete).toHaveBeenCalledWith({ path: '/test/1' })
        /* eslint-enable */
    })

    it('#deleteByFields() should be call axios delete method with path and param', async () => {
        /* eslint-disable */
        spyOn(service['overlay'], 'attachCallbackInOverlay').and.callThrough()
        spyOn(service['axios'], 'delete').and.callFake(() => { return true as any })
        await service.deleteByFields({ test: 'test' })
        expect(service['axios'].delete).toHaveBeenCalledWith({ path: '/test/delete-by-fields', params: { test: 'test' } })
        /* eslint-enable */
    })
})
