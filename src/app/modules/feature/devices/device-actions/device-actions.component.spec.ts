import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceActionsComponent } from './device-actions.component';

describe('DeviceActionsComponent', () => {
  let component: DeviceActionsComponent;
  let fixture: ComponentFixture<DeviceActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceActionsComponent]
    });
    fixture = TestBed.createComponent(DeviceActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
