import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PNCComponent } from './pnc.component';

describe('PNCComponent', () => {
  let component: PNCComponent;
  let fixture: ComponentFixture<PNCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PNCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PNCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
