import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatterieoverviewComponent } from './batterieoverview.component';

describe('BatterieoverviewComponent', () => {
  let component: BatterieoverviewComponent;
  let fixture: ComponentFixture<BatterieoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatterieoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatterieoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
