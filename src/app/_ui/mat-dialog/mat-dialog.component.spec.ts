import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MatDialogDeleteComponent } from './mat-dialog.component'

describe('MatDialogDeleteComponent', () => {
    let component: MatDialogDeleteComponent
    let fixture: ComponentFixture<MatDialogDeleteComponent>

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MatDialogDeleteComponent]
        })
        fixture = TestBed.createComponent(MatDialogDeleteComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
