import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingchildComponent } from './bookingchild.component';

describe('BookingchildComponent', () => {
  let component: BookingchildComponent;
  let fixture: ComponentFixture<BookingchildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingchildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
