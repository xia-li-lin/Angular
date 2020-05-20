import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoTopComponent } from './auto-top.component';

describe('AutoTopComponent', () => {
  let component: AutoTopComponent;
  let fixture: ComponentFixture<AutoTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
