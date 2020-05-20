import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ServiceManagerModule } from './service-manager.module';

const routes: Routes = [
  {
    path: 'register',
    loadChildren: './register-manager/register-manager.module#RegisterManagerModule',
    data: {
      label: 'service.nav.serviceRegisterManager'
    }
  },
  {
    path: 'sp-apply-add-service',
    loadChildren: './sp-apply-add-service/sp-apply-add-service.module#SpApplyAddServiceModule',
    data: {
      label: 'service.nav.spApplyNewService'
    }
  },
  {
    path: 'services',
    loadChildren: './service-list/service-list.module#ServiceListModule',
    data: {
      label: 'service.nav.serviceList'
    }
  },
  {
    path: 'association-type',
    loadChildren: './association-type/association-type.module#AssociationTypeModule',
    data: {
      label: 'service.nav.associationType'
    }
  },
  {
    path: 'source-list',
    loadChildren: './source-list/source-list.module#SourceListModule',
    data: {
      label: 'service.nav.sourceList'
    }
  },
  {
    path: 'target-list',
    loadChildren: './target-list/target-list.module#TargetListModule',
    data: {
      label: 'service.nav.targetList'
    }
  },
  {
    path: 'controlled-word-manager',
    loadChildren: './controlled-word-manager/controlled-word-manager.module#ControlledWordManagerModule',
    data: {
      label: 'service.nav.controlledWordManagement'
    }
  },
  {
    path: '**',
    redirectTo: 'register'
  }
];

@NgModule({
  imports: [ CommonModule, ServiceManagerModule, RouterModule.forChild(routes) ]
})
export class ServiceManagerRoutingModule {}
