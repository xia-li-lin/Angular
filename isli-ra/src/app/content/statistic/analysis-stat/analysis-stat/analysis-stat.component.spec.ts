import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisStatComponent } from './analysis-stat.component';

describe('AnalysisStatComponent', () => {
  let component: AnalysisStatComponent;
  let fixture: ComponentFixture<AnalysisStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
