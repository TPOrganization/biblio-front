import { Overlay } from '@angular/cdk/overlay'
import { TestBed } from '@angular/core/testing'
import { MatSnackBar } from '@angular/material/snack-bar'
import { SnackbarService } from './snackbar.service'

describe('SnackbarService', () => {
    let service: SnackbarService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MatSnackBar,
                Overlay
            ]
        })
        service = TestBed.inject(SnackbarService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('#success() should be set success panel snackbar', () => {
        spyOn(service as any, 'openSnackBar').and.callFake(() => { return null })
        service.success('test')
        /* eslint-disable */
        expect(service['openSnackBar']).toHaveBeenCalled()
        expect(service['config']['panelClass']).toEqual(['success', 'notification'])
        /* eslint-enable */
    })

    it('#error() should be set error panel snackbar', () => {
        spyOn(service as any, 'openSnackBar')
        service.error('test')
        /* eslint-disable */
        expect(service['openSnackBar']).toHaveBeenCalled()
        expect(service['config']['panelClass']).toEqual(['error', 'notification'])
        /* eslint-enable */
    })
})
