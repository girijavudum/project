import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyIndicatorsComponent } from './energy-indicators.component';

describe('EnergyIndicatorsComponent', () => {
  let component: EnergyIndicatorsComponent;
  let fixture: ComponentFixture<EnergyIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergyIndicatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergyIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
