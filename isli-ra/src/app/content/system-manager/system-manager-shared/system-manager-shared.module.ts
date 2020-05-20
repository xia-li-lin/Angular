import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleFormEnComponent } from './role-form-en/role-form-en.component';
import { RoleFormTwComponent } from './role-form-tw/role-form-tw.component';
import { TelePhoneComponent } from './tele-phone/tele-phone.component';
import { SharedModule } from 'src/app/shared';
import { RoleLimitsComponent } from './role-limits/role-limits.component';
import { MessageListSearchComponent } from './message-list-search/message-list-search.component';
import { SystemLogSearchComponent } from './system-log-search/system-log-search.component';
import { MessageFormTwComponent } from './message-form-tw/message-form-tw.component';
import { MessageFormEnComponent } from './message-form-en/message-form-en.component';
import { EmailTemplateTwComponent } from './email-template-tw/email-template-tw.component';
import { EmailTemplateEnComponent } from './email-template-en/email-template-en.component';
import { AccountRoleLimitsComponent } from './account-role-limits/account-role-limits.component';
import { LanguageFirstStepComponent } from './language-first-step/language-first-step.component';
import { LanguageSecondStepComponent } from './language-second-step/language-second-step.component';
import { LanguageThirdStepComponent } from './language-third-step/language-third-step.component';
import { LanguageLastStepComponent } from './language-last-step/language-last-step.component';
import { PageContentComponent } from './page-content/page-content.component';



@NgModule({
  declarations: [
    RoleFormEnComponent,
    RoleFormTwComponent,
    TelePhoneComponent,
    RoleLimitsComponent,
    MessageListSearchComponent,
    SystemLogSearchComponent,
    MessageFormTwComponent,
    MessageFormEnComponent,
    EmailTemplateTwComponent,
    EmailTemplateEnComponent,
    AccountRoleLimitsComponent,
    LanguageFirstStepComponent,
    LanguageSecondStepComponent,
    LanguageThirdStepComponent,
    LanguageLastStepComponent,
    PageContentComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RoleFormEnComponent,
    RoleFormTwComponent,
    TelePhoneComponent,
    RoleLimitsComponent,
    MessageListSearchComponent,
    SystemLogSearchComponent,
    MessageFormTwComponent,
    MessageFormEnComponent,
    EmailTemplateTwComponent,
    EmailTemplateEnComponent,
    AccountRoleLimitsComponent,
    LanguageFirstStepComponent,
    LanguageSecondStepComponent,
    LanguageThirdStepComponent,
    LanguageLastStepComponent,
    PageContentComponent
  ]
})
export class SystemManagerSharedModule { }
