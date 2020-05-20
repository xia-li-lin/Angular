import { NgModule } from '@angular/core';
import { SiteSettingModule } from './site-setting.module';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { WebInfoComponent } from './web-info/web-info.component';
import { NavigationDetailComponent } from './navigation-detail/navigation-detail.component';
import { PermissionActiveService } from 'src/app/service/permission-active.service';

const routes: Routes = [
  {
    path: 'navs',
    component: NavigationComponent,
    data: {
      label: 'siteManager.leftNav.navs',
      permission: 'WS.LM',
      reload: false
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'navs/detail',
    component: NavigationDetailComponent,
    data: {
      label: 'siteManager.leftNav.navsDetail'
    }
  },
  {
    path: 'info',
    component: WebInfoComponent,
    data: {
      label: 'siteManager.leftNav.info',
      permission: 'WS.WZ'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: '*',
    redirectTo: 'navs'
  }
];

@NgModule({
  imports: [ SiteSettingModule, RouterModule.forChild(routes) ]
})
export class SiteSettingRoutingModule {}
