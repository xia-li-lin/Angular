import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IndexModule } from './index.module';
import { IndexComponent } from './index/index.component';
import { ModifyPasswordComponent } from './modify-password/modify-password.component';

const routes: Routes = [
  {
    path: 'modify',
    component: ModifyPasswordComponent
  },
  {
    path: '**',
    component: IndexComponent
  }
];

@NgModule({
  imports: [ CommonModule, IndexModule, RouterModule.forChild(routes) ]
})
export class IndexRoutingModule {}
