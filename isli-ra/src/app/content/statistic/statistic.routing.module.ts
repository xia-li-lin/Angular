import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionActiveService } from 'src/app/service';
import { StatisticModule } from './statistic.module';

const routers: Routes = [
  {
    path: 'islicode',
    loadChildren: './islicode-stat/islicode-stat.module#IslicodeStatModule',
    data: {
      label: 'statistic.nav.islicodeAnsys',
      permission: 'SS.ISLI'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'servicecode',
    loadChildren: './servicecode-stat/servicecode-stat.module#ServicecodeStatModule',
    pathMatch: 'full',
    data: {
      label: 'statistic.nav.serviceCodeAnsys',
      permission: 'SS.SC'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'sp',
    loadChildren: './sp-stat/sp-stat.module#SpStatModule',
    data: {
      label: 'statistic.nav.spAnsys',
      permission: 'SS.SP'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'lc',
    loadChildren: './lc-stat/lc-stat.module#LcStatModule',
    data: {
      label: 'statistic.nav.lcAnsys',
      permission: 'SS.LC'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'search',
    loadChildren: './search-stat/search-stat.module#SearchStatModule',
    data: {
      label: 'statistic.nav.searchAnsys',
      permission: 'SS.SS'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'analysis',
    loadChildren: './analysis-stat/analysis-stat.module#AnalysisStatModule',
    data: {
      label: 'statistic.nav.analysis',
      permission: 'SS.RS'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: '**',
    redirectTo: 'islicode'
  }
];

@NgModule({
  imports: [ StatisticModule, RouterModule.forChild(routers) ]
})
export class StatistRoutingModule {}
