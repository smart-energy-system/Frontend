import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbatterieComponent } from './newbatterie.component';

describe('NewbatterieComponent', () => {
  let component: NewbatterieComponent;
  let fixture: ComponentFixture<NewbatterieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewbatterieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewbatterieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
