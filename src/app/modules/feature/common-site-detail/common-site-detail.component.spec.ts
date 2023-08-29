import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSiteDetailComponent } from './common-site-detail.component';

describe('CommonSiteDetailComponent', () => {
  let component: CommonSiteDetailComponent;
  let fixture: ComponentFixture<CommonSiteDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonSiteDetailComponent]
    });
    fixture = TestBed.createComponent(CommonSiteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
