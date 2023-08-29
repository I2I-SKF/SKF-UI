import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDetailsCardsComponent } from './site-details-cards.component';

describe('SiteDetailsCardsComponent', () => {
  let component: SiteDetailsCardsComponent;
  let fixture: ComponentFixture<SiteDetailsCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteDetailsCardsComponent]
    });
    fixture = TestBed.createComponent(SiteDetailsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
