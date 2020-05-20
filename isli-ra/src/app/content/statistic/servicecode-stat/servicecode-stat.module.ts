import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared';
import { StatisticSharedModule } from '../statistic-shared';
import { ServicecodeStatSharedModule } from './servicecode-stat-shared';
import { ServicecodeStatComponent } from './servicecode-stat';
import { ServicecodeStatSpComponent } from './servicecode-stat-sp';
import { ServicecodeStatTimeComponent } from './servicecode-stat-time';
import { ServicecodeStatAreaComponent } from './servicecode-stat-area';

const routes: Route[] = [
  {
    path: '',
    component: ServicecodeStatComponent
  }
];

@NgModule({
  declarations: [
    ServicecodeStatComponent,
    ServicecodeStatSpComponent,
    ServicecodeStatTimeComponent,
    ServicecodeStatAreaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StatisticSharedModule,
    ServicecodeStatSharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ServicecodeStatModule {}
