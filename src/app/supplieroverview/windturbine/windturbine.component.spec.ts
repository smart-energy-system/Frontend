import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindturbineComponent } from './windturbine.component';

describe('WindturbineComponent', () => {
  let component: WindturbineComponent;
  let fixture: ComponentFixture<WindturbineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindturbineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindturbineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
