import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared';
import { ServiceListSharedModule } from './service-list-shared';
import { ServiceListComponent } from './service-list';
import { ServiceSearchComponent } from './service-search';
import { ServiceTableComponent } from './service-table';
import { ServiceFormComponent } from './service-form';
import { ServiceDetailComponent } from './service-detail';
import { ServicePushComponent } from './service-push/service-push.component';

const routes: Route[] = [
  {
    path: 'list',
    component: ServiceListComponent,
    data: {
      reload: false
    }
  },
  {
    path: 'list/detail',
    component: ServiceDetailComponent,
    data: {
      label: 'service.serviceList.detail.title'
    }
  },
  {
    path: 'list/add',
    component: ServiceFormComponent,
    data: {
      label: 'service.serviceList.add'
    }
  },
  {
    path: 'list/modify',
    component: ServiceFormComponent,
    data: {
      label: 'service.serviceList.modify'
    }
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  declarations: [
    ServiceListComponent,
    ServiceSearchComponent,
    ServiceTableComponent,
    ServiceFormComponent,
    ServiceDetailComponent,
    ServicePushComponent
  ],
  imports: [ CommonModule, SharedModule, ServiceListSharedModule, RouterModule.forChild(routes) ],
  exports: [ ServiceFormComponent, ServiceDetailComponent ]
})
export class ServiceListModule {}
