import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisStatSearchComponent } from './analysis-stat-search.component';

describe('AnalysisStatSearchComponent', () => {
  let component: AnalysisStatSearchComponent;
  let fixture: ComponentFixture<AnalysisStatSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisStatSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisStatSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
