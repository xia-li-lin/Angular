import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared';
import { ServiceManagerSharedModule } from '../service-manager-shared';
import { AssociationTypeSharedModule } from './association-type-shared';
import { AssociationTypeComponent } from './association-type';
import { AssociationTypeSearchComponent } from './association-type-search';
import { AssociationTypeTableComponent } from './association-type-table';
import { AssociationTypeFormComponent } from './association-type-form';
import { AssociationTypeDetailComponent } from './association-type-detail';

const routes: Route[] = [
  {
    path: 'list',
    component: AssociationTypeComponent,
    data: {
      reload: false
    }
  },
  {
    path: 'list/detail',
    component: AssociationTypeDetailComponent,
    data: {
      label: 'service.associationType.detail'
    }
  },
  {
    path: 'list/add',
    component: AssociationTypeFormComponent,
    data: {
      label: 'service.associationType.add'
    }
  },
  {
    path: 'list/modify',
    component: AssociationTypeFormComponent,
    data: {
      label: 'service.associationType.modify'
    }
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  declarations: [
    AssociationTypeComponent,
    AssociationTypeSearchComponent,
    AssociationTypeTableComponent,
    AssociationTypeFormComponent,
    AssociationTypeDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AssociationTypeSharedModule,
    ServiceManagerSharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AssociationTypeModule {}
