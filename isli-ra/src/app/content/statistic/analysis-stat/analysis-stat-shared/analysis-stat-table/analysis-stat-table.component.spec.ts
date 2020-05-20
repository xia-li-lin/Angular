import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisStatTableComponent } from './analysis-stat-table.component';

describe('AnalysisStatTableComponent', () => {
  let component: AnalysisStatTableComponent;
  let fixture: ComponentFixture<AnalysisStatTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisStatTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisStatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
