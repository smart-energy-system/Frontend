import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyChartComponent } from './energy-chart.component';

describe('EnergyChartComponent', () => {
  let component: EnergyChartComponent;
  let fixture: ComponentFixture<EnergyChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergyChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
