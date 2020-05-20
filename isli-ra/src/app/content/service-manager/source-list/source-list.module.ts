import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared';
import { SourceListComponent } from './source-list';

const routes: Route[] = [
  {
    path: 'list',
    component: SourceListComponent,
    data: {
      reload: false
    }
  },
  {
    path: 'list/add',
    loadChildren: './source-add/source-add.module#SourceAddModule',
    data: {
      label: 'service.sourceList.add'
    }
  },
  {
    path: 'list/config',
    loadChildren: './source-config/source-config.module#SourceConfigModule',
    data: {
      label: 'service.sourceList.config.title'
    }
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  declarations: [ SourceListComponent ],
  imports: [ CommonModule, RouterModule.forChild(routes), SharedModule ]
})
export class SourceListModule {}
