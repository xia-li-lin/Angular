import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaManagerModule } from './area-manager.module';
import { AreaListComponent } from './area-list/area-list.component';
import { AreaDetailComponent } from './area-detail/area-detail.component';
import { ServiceListComponent } from './service-manager/service-list/service-list.component';
import { ServiceManagerModule } from './service-manager/service-manager.module';
import { ServiceAddListComponent } from './service-manager/service-add-list/service-add-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: AreaListComponent,
    data: {
      label: 'content.nav.areaManager',
      reload: false
    }
  },
  {
    path: 'list/add',
    component: AreaDetailComponent,
    data: {
      label: 'content.nav.areaAdd'
    }
  },
  {
    path: 'list/detail',
    component: AreaDetailComponent,
    data: {
      label: 'content.nav.areaModify'
    }
  },
  {
    path: 'list/service',
    component: ServiceListComponent,
    data: {
      label: 'areaManager.serviceManager',
      reload: false
    }
  },
  {
    path: 'list/service-add',
    component: ServiceAddListComponent,
    data: {
      label: 'areaManager.serviceManager'
    }
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [ CommonModule, AreaManagerModule, ServiceManagerModule, RouterModule.forChild(routes) ]
})
export class AreaManagerRoutingModule {}
