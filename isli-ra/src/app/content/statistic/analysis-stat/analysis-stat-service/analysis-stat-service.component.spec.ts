import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisStatServiceComponent } from './analysis-stat-service.component';

describe('AnalysisStatServiceComponent', () => {
  let component: AnalysisStatServiceComponent;
  let fixture: ComponentFixture<AnalysisStatServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisStatServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisStatServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
