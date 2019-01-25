import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumeroverviewComponent } from './consumeroverview.component';

describe('ConsumeroverviewComponent', () => {
  let component: ConsumeroverviewComponent;
  let fixture: ComponentFixture<ConsumeroverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumeroverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumeroverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
