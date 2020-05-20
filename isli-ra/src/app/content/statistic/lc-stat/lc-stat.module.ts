import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared';
import { StatisticSharedModule } from '../statistic-shared';
import { LcStatComponent } from './lc-stat';
import { LcStatSearchComponent } from './lc-stat-search';
import { LcStatChartComponent } from './lc-stat-chart';
import { LcStatTableComponent } from './lc-stat-table';

const routes: Route[] = [
  {
    path: '',
    component: LcStatComponent
  }
];

@NgModule({
  declarations: [ LcStatComponent, LcStatSearchComponent, LcStatChartComponent, LcStatTableComponent ],
  imports: [ CommonModule, SharedModule, StatisticSharedModule, RouterModule.forChild(routes) ]
})
export class LcStatModule {}
