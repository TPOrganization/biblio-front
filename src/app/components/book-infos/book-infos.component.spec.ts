import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookInfosComponent } from './book-infos.component';

describe('BookInfosComponent', () => {
  let component: BookInfosComponent;
  let fixture: ComponentFixture<BookInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookInfosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
