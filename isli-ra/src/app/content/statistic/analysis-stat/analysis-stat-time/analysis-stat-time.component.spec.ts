import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisStatTimeComponent } from './analysis-stat-time.component';

describe('AnalysisStatTimeComponent', () => {
  let component: AnalysisStatTimeComponent;
  let fixture: ComponentFixture<AnalysisStatTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisStatTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisStatTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
