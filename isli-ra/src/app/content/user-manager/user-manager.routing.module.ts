import { UserManagerComponent } from './user-manager/user-manager.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SpUserManagerComponent } from './sp-user-manager/sp-user-manager.component';
import { SpUserCheckComponent } from './sp-user-check/sp-user-check.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserManagerModule } from './user-manager.module';
import { SpUserDetailComponent } from './sp-user-detail/sp-user-detail.component';

const routes: Routes = [
  {
    path: 'unification',
    component: UserManagerComponent,
    data: {
      label: 'content.nav.user.userManager',
      reload: false
    }
  },
  {
    path: 'sp-manager',
    component: SpUserManagerComponent,
    data: {
      label: 'content.nav.user.spManager',
      permisson: 'SP.GL'
    }
  },
  {
    path: 'sp-manager/detail',
    component: SpUserDetailComponent
  },
  {
    path: 'sp-check',
    component: SpUserCheckComponent,
    data: {
      label: 'content.nav.user.spManagerCheck'
    }
  },
  {
    path: 'unification/detail',
    component: UserDetailComponent
  },
  {
    path: '**',
    redirectTo: 'unification'
  }
];

@NgModule({
  imports: [ CommonModule, UserManagerModule, RouterModule.forChild(routes) ]
})
export class UserManagerRoutingModule {}
