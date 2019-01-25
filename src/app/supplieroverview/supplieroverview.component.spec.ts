import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplieroverviewComponent } from './supplieroverview.component';

describe('SupplieroverviewComponent', () => {
  let component: SupplieroverviewComponent;
  let fixture: ComponentFixture<SupplieroverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplieroverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplieroverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
