import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountComponent } from './account/account.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleComponent } from './role/role.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageComponent } from './message/message.component';
import { EmailTemplateListComponent } from './email-template-list/email-template-list.component';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { SystemLogComponent } from './system-log/system-log.component';
import { SystemManagerSharedModule } from './system-manager-shared/system-manager-shared.module';
import { LanguageListComponent } from './language-list/language-list.component';
import { LanguageComponent } from './language/language.component';

@NgModule({
  declarations: [
    AccountListComponent,
    AccountComponent,
    RoleListComponent,
    RoleComponent,
    MessageListComponent,
    MessageComponent,
    EmailTemplateListComponent,
    EmailTemplateComponent,
    SystemLogComponent,
    LanguageListComponent,
    LanguageComponent
  ],
  imports: [CommonModule, SharedModule, SystemManagerSharedModule],
  exports: [
    AccountListComponent,
    AccountComponent,
    RoleListComponent,
    RoleComponent,
    MessageListComponent,
    MessageComponent,
    EmailTemplateListComponent,
    EmailTemplateComponent,
    SystemLogComponent,
    LanguageListComponent
  ]
})
export class SystemManagerModule { }
