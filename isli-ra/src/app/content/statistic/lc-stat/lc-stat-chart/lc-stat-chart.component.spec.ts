import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LcStatChartComponent } from './lc-stat-chart.component';

describe('LcStatChartComponent', () => {
  let component: LcStatChartComponent;
  let fixture: ComponentFixture<LcStatChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LcStatChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LcStatChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
