import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficebuildingComponent } from './officebuilding.component';

describe('OfficebuildingComponent', () => {
  let component: OfficebuildingComponent;
  let fixture: ComponentFixture<OfficebuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficebuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficebuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
