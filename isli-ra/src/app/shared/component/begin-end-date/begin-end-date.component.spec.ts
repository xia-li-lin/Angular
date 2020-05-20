import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginEndDateComponent } from './begin-end-date.component';

describe('BeginEndDateComponent', () => {
  let component: BeginEndDateComponent;
  let fixture: ComponentFixture<BeginEndDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeginEndDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeginEndDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
