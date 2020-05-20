import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared';
import { StatisticSharedModule } from '../statistic-shared';
import { IslicodeStatComponent } from './islicode-stat';
import { IslicodeStatSearchComponent } from './islicode-stat-search';
import { IslicodeStatChartComponent } from './islicode-stat-chart';
import { IslicodeStatTableComponent } from './islicode-stat-table';

const routes: Routes = [
  {
    path: '',
    component: IslicodeStatComponent
  }
];

@NgModule({
  declarations: [
    IslicodeStatComponent,
    IslicodeStatSearchComponent,
    IslicodeStatChartComponent,
    IslicodeStatTableComponent
  ],
  imports: [ CommonModule, SharedModule, StatisticSharedModule, RouterModule.forChild(routes) ]
})
export class IslicodeStatModule {}
