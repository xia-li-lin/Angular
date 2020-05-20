import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlledWordConfigComponent } from './controlled-word-config.component';

describe('ControlledWordConfigComponent', () => {
  let component: ControlledWordConfigComponent;
  let fixture: ComponentFixture<ControlledWordConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlledWordConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlledWordConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
