import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DropdownModule } from 'primeng/dropdown';

import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { LoginService, PermissionActiveService } from '../service';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared';

const routes: Routes = [
  {
    path: 'content',
    component: ContentComponent,
    canActivate: [ LoginService ],
    children: [
      {
        path: 'index',
        loadChildren: './index/index.routing.module#IndexRoutingModule',
        canActivate: [ PermissionActiveService ]
      },
      {
        path: 'area',
        loadChildren: './area-manager/area-manager-routing.module#AreaManagerRoutingModule',
        data: {
          label: 'content.nav.areaManager'
        },
        canActivate: [ PermissionActiveService ]
      },
      {
        path: 'user',
        loadChildren: './user-manager/user-manager.routing.module#UserManagerRoutingModule',
        data: {
          permission: ''
        },
        canActivate: [ PermissionActiveService ]
      },
      {
        path: 'service',
        loadChildren: './service-manager/service-manager.routing.module#ServiceManagerRoutingModule',
        data: {
          label: 'content.nav.serverManager',
          permission: 'SC'
        },
        canActivate: [ PermissionActiveService ]
      },
      {
        path: 'lc',
        loadChildren: './lc-manager/lc-manager.routing.module#LcManagerRoutingModule',
        data: {
          label: 'LC管理',
          permission: 'LC'
        },
        canActivate: [ PermissionActiveService ]
      },
      {
        path: 'system',
        loadChildren: './system-manager/system-manager.routing.module#SystemManagerRoutingModule',
        data: {
          label: '系统管理',
          permission: 'WS'
        },
        canActivate: [ PermissionActiveService ]
      },
      {
        path: 'statistic',
        loadChildren: './statistic/statistic.routing.module#StatistRoutingModule',
        data: {
          label: 'content.nav.dataAnsys',
          permission: 'SS'
        },
        canActivate: [ PermissionActiveService ]
      },
      {
        path: 'site',
        loadChildren: './site-manager/site-manager.routing.module#SiteManagerRoutingModule',
        data: {
          permission: 'MM'
        },
        canActivate: [ PermissionActiveService ]
      },
      {
        path: '**',
        redirectTo: 'index'
      }
    ]
  }
];

@NgModule({
  declarations: [ ContentComponent, HeaderComponent ],
  imports: [
    CommonModule,
    DropdownModule,
    TranslateModule,
    FormsModule,
    RouterModule.forChild(routes),
    BreadcrumbModule,
    SharedModule
  ],
  exports: [ HeaderComponent ]
})
export class ContentModule {}
