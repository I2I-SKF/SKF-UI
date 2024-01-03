import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonToasterComponent } from './common-toaster.component';

describe('CommonToasterComponent', () => {
  let component: CommonToasterComponent;
  let fixture: ComponentFixture<CommonToasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonToasterComponent]
    });
    fixture = TestBed.createComponent(CommonToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
