import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared';
import { SpStatSharedModule } from './sp-stat-shared';
import { StatisticSharedModule } from '../statistic-shared';
import { SpStatComponent } from './sp-stat';
import { SpStatTimeComponent } from './sp-stat-time';
import { SpStatAreaComponent } from './sp-stat-area';

const routes: Route[] = [
  {
    path: '',
    component: SpStatComponent
  }
];

@NgModule({
  declarations: [ SpStatComponent, SpStatTimeComponent, SpStatAreaComponent ],
  imports: [ CommonModule, SharedModule, SpStatSharedModule, StatisticSharedModule, RouterModule.forChild(routes) ],
  exports: [ SpStatComponent, SpStatTimeComponent, SpStatAreaComponent ]
})
export class SpStatModule {}
