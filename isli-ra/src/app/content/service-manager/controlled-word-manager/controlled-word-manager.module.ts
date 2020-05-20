import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared';
import { ControlledWordSharedModule } from './controlled-word-shared';
import { ControlledWordManagerComponent } from './controlled-word-manager';

const routes: Route[] = [
  {
    path: 'list',
    component: ControlledWordManagerComponent,
    data: {
      reload: false
    }
  },
  {
    path: 'list/config',
    loadChildren: './controlled-word-config/controlled-word-config.module#ControlledWordConfigModule',
    data: {
      label: 'service.controlledWordManagement.config.title'
    }
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  declarations: [ ControlledWordManagerComponent ],
  imports: [ CommonModule, RouterModule.forChild(routes), SharedModule, ControlledWordSharedModule ],
  exports: []
})
export class ControlledWordManagerModule {}
