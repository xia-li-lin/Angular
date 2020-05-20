import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IslicodeStatChartComponent } from './islicode-stat-chart.component';

describe('IslicodeStatChartComponent', () => {
  let component: IslicodeStatChartComponent;
  let fixture: ComponentFixture<IslicodeStatChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IslicodeStatChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IslicodeStatChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
