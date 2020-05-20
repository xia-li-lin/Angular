import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlledWordAddComponent } from './controlled-word-add.component';

describe('ControlledWordAddComponent', () => {
  let component: ControlledWordAddComponent;
  let fixture: ComponentFixture<ControlledWordAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlledWordAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlledWordAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
