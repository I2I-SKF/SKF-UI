import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonActionPopupComponent } from './common-action-popup.component';

describe('CommonActionPopupComponent', () => {
  let component: CommonActionPopupComponent;
  let fixture: ComponentFixture<CommonActionPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonActionPopupComponent]
    });
    fixture = TestBed.createComponent(CommonActionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
