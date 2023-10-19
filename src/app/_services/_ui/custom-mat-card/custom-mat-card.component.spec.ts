import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CustomMatCardComponent } from './custom-mat-card.component'

describe('CustomMatCardComponent', () => {
    let component: CustomMatCardComponent
    let fixture: ComponentFixture<CustomMatCardComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ CustomMatCardComponent ]
        })
            .compileComponents()

        fixture = TestBed.createComponent(CustomMatCardComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
