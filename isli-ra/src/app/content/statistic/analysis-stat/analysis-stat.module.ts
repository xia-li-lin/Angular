import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared';
import { AnalysisStatSharedModule } from './analysis-stat-shared';
import { StatisticSharedModule } from '../statistic-shared';
import { AnalysisStatComponent } from './analysis-stat';
import { AnalysisStatTimeComponent } from './analysis-stat-time';
import { AnalysisStatAreaComponent } from './analysis-stat-area';
import { AnalysisStatServiceComponent } from './analysis-stat-service';
import { AnalysisStatTopComponent } from './analysis-stat-top';

const routes: Route[] = [
  {
    path: '',
    component: AnalysisStatComponent
  }
];

@NgModule({
  declarations: [
    AnalysisStatComponent,
    AnalysisStatTimeComponent,
    AnalysisStatAreaComponent,
    AnalysisStatServiceComponent,
    AnalysisStatTopComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StatisticSharedModule,
    AnalysisStatSharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AnalysisStatModule {}
