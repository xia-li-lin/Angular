import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared';
import { StatisticSharedModule } from '../statistic-shared';
import { SearchStatSharedModule } from './search-stat-shared';
import { SearchStatComponent } from './search-stat';
import { SearchStatTimeComponent } from './search-stat-time';
import { SearchStatAreaComponent } from './search-stat-area';
import { SearchStatTopComponent } from './search-stat-top';

const routes: Route[] = [
  {
    path: '',
    component: SearchStatComponent
  }
];

@NgModule({
  declarations: [ SearchStatComponent, SearchStatTimeComponent, SearchStatAreaComponent, SearchStatTopComponent ],
  imports: [ CommonModule, SharedModule, StatisticSharedModule, SearchStatSharedModule, RouterModule.forChild(routes) ]
})
export class SearchStatModule {}
