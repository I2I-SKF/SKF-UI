import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankComponent } from './tank.component';

describe('TankComponent', () => {
  let component: TankComponent;
  let fixture: ComponentFixture<TankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TankComponent]
    });
    fixture = TestBed.createComponent(TankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
