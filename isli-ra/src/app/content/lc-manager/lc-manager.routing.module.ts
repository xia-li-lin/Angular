import { NgModule } from '@angular/core';
import { LcManagerModule } from './lc-manager.module';
import { Routes, RouterModule } from '@angular/router';
import { AlloctListComponent } from './alloct-list/alloct-list.component';
import { ThresholdListComponent } from './threshold-list/threshold-list.component';
import { ThresholdDetailComponent } from './threshold-detail/threshold-detail.component';

const routers: Routes = [
  {
    path: 'alloct',
    component: AlloctListComponent,
    data: {
      label: 'lcManager.nav.alloct',
      permission: 'LC.FP'
    }
  },
  {
    path: 'threshold',
    component: ThresholdListComponent,
    pathMatch: 'full',
    data: {
      label: 'lcManager.nav.threshold',
      reload: false,
      permission: 'LC.YZ'
    }
  },
  {
    path: 'threshold/detail',
    component: ThresholdDetailComponent,
    data: {
      label: 'lcManager.nav.thresholdDetail'
    }
  },
  {
    path: '**',
    redirectTo: 'alloct'
  }
];

@NgModule({
  imports: [ LcManagerModule, RouterModule.forChild(routers) ]
})
export class LcManagerRoutingModule {}
