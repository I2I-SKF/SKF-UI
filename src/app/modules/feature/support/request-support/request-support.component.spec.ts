import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSupportComponent } from './request-support.component';

describe('RequestSupportComponent', () => {
  let component: RequestSupportComponent;
  let fixture: ComponentFixture<RequestSupportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestSupportComponent]
    });
    fixture = TestBed.createComponent(RequestSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
