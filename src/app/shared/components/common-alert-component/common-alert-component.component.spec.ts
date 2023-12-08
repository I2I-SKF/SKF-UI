import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonAlertComponentComponent } from './common-alert-component.component';

describe('CommonAlertComponentComponent', () => {
  let component: CommonAlertComponentComponent;
  let fixture: ComponentFixture<CommonAlertComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonAlertComponentComponent]
    });
    fixture = TestBed.createComponent(CommonAlertComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
