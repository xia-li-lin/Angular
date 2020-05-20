import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermissionActiveService } from 'src/app/service/permission-active.service';

const routes: Routes = [
  {
    path: 'content',
    loadChildren: './content-manager/content-manager.routing.module#ContentManagerRoutingModule',
    data: {
      label: 'siteManager.leftNav.WebsiteManagement',
      permission: 'WS'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'interact',
    loadChildren: './interact-manager/interact-manager.routing.module#InteractManagerRoutingModule',
    data: {
      label: 'siteManager.leftNav.InteractiveManagement'
    }
  },
  {
    path: 'setting',
    loadChildren: './site-setting/site-setting.routing.module#SiteSettingRoutingModule',
    data: {
      label: 'siteManager.leftNav.WebsiteSettings'
    }
  },
  {
    path: '**',
    redirectTo: 'content'
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ]
})
export class SiteManagerRoutingModule {}
