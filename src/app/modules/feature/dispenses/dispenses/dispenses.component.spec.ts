import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensesComponent } from './dispenses.component';

describe('DispensesComponent', () => {
  let component: DispensesComponent;
  let fixture: ComponentFixture<DispensesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DispensesComponent]
    });
    fixture = TestBed.createComponent(DispensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
