import { TestBed } from '@angular/core/testing'
import { AxiosInstance } from 'axios'

import { AxiosClientService } from './axios-client.service'
import { AppConfigService } from '../app-config.service'
import { AppConfigServiceMock } from '../app-config-mock.service'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import * as MockAdapter from 'axios-mock-adapter'

interface TestData {
    id: number,
    name: string
}
describe('AxiosClientService', () => {
    let axiosClientService: AxiosClientService
    let axiosClient: AxiosInstance
    let mock: MockAdapter

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AxiosClientService,
                { provide: AppConfigService, useClass: AppConfigServiceMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        axiosClientService = TestBed.inject(AxiosClientService)
        axiosClient = axiosClientService.getAxiosClient()
        mock = new MockAdapter(axiosClient)
        mock.onGet('https://testurl/api/error').reply(500)
        mock.onGet('https://testurl/api/response').reply(200, { data: { test: 'test' } })
    })

    it('should be created', () => {
        expect(axiosClientService).toBeTruthy()
    })

    describe('test http method', () => {
        let testData: { data: TestData[] } = { data: [] }

        beforeEach(() => {
            testData = {
                data: [
                    { id: 101, name: 'test 1' },
                    { id: 102, name: 'test 2' },
                ]
            }
        })

        it('should return all test data', async () => {
            spyOn(axiosClient, 'request').and.returnValues(Promise.resolve(testData))
            const testResult = await axiosClientService.get({ path: '/test-data' }) as any
            expect(axiosClient.request).toHaveBeenCalledWith({ method: 'get', url: 'https://testurl/api/test-data', params: undefined })
            expect(testResult).toEqual(testData.data)
            expect(testResult.length).toEqual(2)
        })

        it('#get() should return test data by id', async () => {
            spyOn(axiosClient, 'request').and.returnValues().and.callFake((config: any) => {
                const id = parseInt(config.url.split('/').pop())
                const data = testData.data.find(e => e.id === id)
                return Promise.resolve({ data } as any)
            })
            const testResult = await axiosClientService.get({ path: '/test-data/101' }) as any
            expect(axiosClient.request).toHaveBeenCalledWith({ method: 'get', url: 'https://testurl/api/test-data/101', params: undefined })
            expect(testResult).toEqual(testData.data[0])
        })

        it('#post() should add test data', async () => {
            spyOn(axiosClient, 'request').and.returnValues().and.callFake((config: any) => {
                testData.data.push(config.data)
                return Promise.resolve({ data: config.data } as any)
            })
            const newData: TestData = { id: 103, name: 'test 3' }
            const testResult = await axiosClientService.post({ path: '/test-data', params: newData }) as any
            expect(axiosClient.request).toHaveBeenCalledWith({ method: 'post', url: 'https://testurl/api/test-data', data: newData })
            expect(testResult).toEqual(newData)
            expect(testData.data.length).toEqual(3)
            expect(testData.data.find(e => e.id === 103)).toBeDefined()
        })

        it('#put() should update test data', async () => {
            spyOn(axiosClient, 'request').and.returnValues().and.callFake((config: any) => {
                const test = testData.data?.find(e => e.id === config.data.id)
                if (test) {
                    test.name = config.data.name
                }
                return Promise.resolve({ data: config.data } as any)
            })
            const newData: TestData = { id: 102, name: 'test update' }
            const testResult = await axiosClientService.put({ path: '/test-data', params: newData }) as any
            expect(axiosClient.request).toHaveBeenCalledWith({ method: 'put', url: 'https://testurl/api/test-data', data: newData })
            expect(testResult).toEqual(newData)
            expect(testData.data.length).toEqual(2)
            expect(testData.data.find(e => e.id === 102)?.name).toBe('test update')
        })

        it('#delete() should delete test data by id', async () => {
            spyOn(axiosClient, 'request').and.returnValues().and.callFake((config: any) => {
                const id = parseInt(config.url.split('/').pop())
                const indexOf = testData.data.findIndex(e => e.id === id)
                testData.data.splice(indexOf, 1)
                return Promise.resolve({ data: true } as any)
            })
            const testResult = await axiosClientService.delete({ path: '/test-data/101' }) as any
            expect(axiosClient.request).toHaveBeenCalledWith({
                method: 'delete',
                url: 'https://testurl/api/test-data/101',
                data: undefined
            })
            expect(testResult).toBeTrue()
            expect(testData.data.length).toEqual(1)
            expect(testData.data.find(e => e.id === 101)).toBeUndefined()
        })

        it('should handle reponse on api reponse', async () => {
            spyOn(axiosClientService as any, '_handleResponse')
            await axiosClientService.get({ path: '/response' }).then(() => { return true })
            /* eslint-disable */
            expect(axiosClientService['_handleResponse']).toHaveBeenCalled()
            /* eslint-enable */
        })

        it('should handle error on api error', async () => {
            spyOn(axiosClientService as any, '_handleError')
            await axiosClientService.get({ path: '/error' }).catch(() => { return null })
            /* eslint-disable */
            expect(axiosClientService['_handleError']).toHaveBeenCalled()
            /* eslint-enable */
        })
    })

})
