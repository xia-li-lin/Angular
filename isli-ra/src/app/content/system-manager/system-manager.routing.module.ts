import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemManagerModule } from './system-manager.module';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountComponent } from './account/account.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleComponent } from './role/role.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageComponent } from './message/message.component';
import { EmailTemplateListComponent } from './email-template-list/email-template-list.component';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { SystemLogComponent } from './system-log/system-log.component';
import { LanguageListComponent } from './language-list/language-list.component';
import { LanguageComponent } from './language/language.component';
import { PermissionActiveService } from 'src/app/service';

const routers: Routes = [
  {
    path: 'account-list',
    component: AccountListComponent,
    data: {
      label: 'systemAccount.nav.systemAccount'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'account-list/account',
    component: AccountComponent,
    data: {
      label: 'systemAccount.nav.create',
      permission: 'MM.ZH.CJ'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'account-list/edit',
    component: AccountComponent,
    data: {
      label: 'systemAccount.nav.edit',
      permission: 'MM.ZH.XG'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'role-list',
    component: RoleListComponent,
    data: {
      label: 'systemAccount.nav.roleManagement',
      permission: 'MM.JS'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'role-list/role',
    component: RoleComponent,
    data: {
      label: 'systemAccount.nav.createRole',
      permission: 'MM.JS.CJ'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'role-list/edit',
    component: RoleComponent,
    data: {
      label: 'systemAccount.nav.edit',
      permission: 'MM.JS.XG'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'message-list',
    component: MessageListComponent,
    data: {
      label: 'systemAccount.nav.messageManagement',
      permission: 'MM.XX'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'message-list/message',
    component: MessageComponent,
    data: {
      label: 'systemAccount.nav.releaseTidings',
      permission: 'MM.XX.FB'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'language-list',
    component: LanguageListComponent,
    data: {
      label: 'systemAccount.nav.languageSetting',
      permission: 'MM.YZ'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'language-list/language',
    component: LanguageComponent,
    data: {
      label: 'systemAccount.nav.enabled',
      permission: 'MM.YZ'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'email-list',
    component: EmailTemplateListComponent,
    data: {
      label: 'systemAccount.nav.mailTemplate',
      permission: 'MM.YJ'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'email-list/email',
    component: EmailTemplateComponent,
    data: {
      permission: 'MM.YJ.XZ'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'email-list/edit',
    component: EmailTemplateComponent,
    data: {
      permission: 'MM.YJ.BJ'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'log',
    component: SystemLogComponent,
    data: {
      label: 'systemAccount.nav.systemLog',
      permission: 'MM.RZ'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: '**',
    redirectTo: 'account-list'
  }
];

@NgModule({
  imports: [ SystemManagerModule, RouterModule.forChild(routers) ]
})
export class SystemManagerRoutingModule {}
