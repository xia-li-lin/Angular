import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisStatTopComponent } from './analysis-stat-top.component';

describe('AnalysisStatTopComponent', () => {
  let component: AnalysisStatTopComponent;
  let fixture: ComponentFixture<AnalysisStatTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisStatTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisStatTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
