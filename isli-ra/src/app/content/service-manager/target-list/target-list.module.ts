import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared';
import { TargetListComponent } from './target-list';

const routes: Route[] = [
  {
    path: 'list',
    component: TargetListComponent,
    data: {
      reload: false
    }
  },
  {
    path: 'list/add',
    loadChildren: './target-add/target-add.module#TargetAddModule',
    data: {
      label: 'service.targetList.add'
    }
  },
  {
    path: 'list/config',
    loadChildren: './target-config/target-config.module#TargetConfigModule',
    data: {
      label: 'service.targetList.config.title'
    }
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  declarations: [ TargetListComponent ],
  imports: [ CommonModule, RouterModule.forChild(routes), SharedModule ]
})
export class TargetListModule {}
