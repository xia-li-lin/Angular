import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisStatAreaComponent } from './analysis-stat-area.component';

describe('AnalysisStatAreaComponent', () => {
  let component: AnalysisStatAreaComponent;
  let fixture: ComponentFixture<AnalysisStatAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisStatAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisStatAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
