import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankLevelMonitorComponent } from './tank-level-monitor.component';

describe('TankLevelMonitorComponent', () => {
  let component: TankLevelMonitorComponent;
  let fixture: ComponentFixture<TankLevelMonitorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TankLevelMonitorComponent]
    });
    fixture = TestBed.createComponent(TankLevelMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
