import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlledWordManagerComponent } from './controlled-word-manager.component';

describe('ControlledWordManagerComponent', () => {
  let component: ControlledWordManagerComponent;
  let fixture: ComponentFixture<ControlledWordManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlledWordManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlledWordManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
