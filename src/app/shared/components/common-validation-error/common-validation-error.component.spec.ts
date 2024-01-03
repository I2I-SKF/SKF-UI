import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonValidationErrorComponent } from './common-validation-error.component';

describe('CommonValidationErrorComponent', () => {
  let component: CommonValidationErrorComponent;
  let fixture: ComponentFixture<CommonValidationErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonValidationErrorComponent]
    });
    fixture = TestBed.createComponent(CommonValidationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
