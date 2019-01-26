import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotovoltaicpanelComponent } from './photovoltaicpanel.component';

describe('PhotovoltaicpanelComponent', () => {
  let component: PhotovoltaicpanelComponent;
  let fixture: ComponentFixture<PhotovoltaicpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotovoltaicpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotovoltaicpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
