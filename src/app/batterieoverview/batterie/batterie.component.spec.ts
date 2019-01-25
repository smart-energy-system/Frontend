import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterieComponent } from './batterie.component';

describe('BatteriesComponent', () => {
  let component: BatterieComponent;
  let fixture: ComponentFixture<BatterieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatterieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatterieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
