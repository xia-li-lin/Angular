import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameVersionGreaterDirective } from './game-version-greater.directive';
import { PwdFormatDirective } from './pwd-format.directive';
import { EqDirective } from './eq.directive';
import { VaileMobileDirective } from './vaile-mobile.directive';
import { ValidPwdDirective } from './valid-pwd.directive';
import { ValidEmailDirective } from './valid-email.directive';
import { ValidJobNoDirective } from './valid-job-no.directive';
import { IntMaxMinDirective } from './int-max-min.directive';
import { ValidBlockNameDirective } from './block-name-exists.directive';
import { JobNoExistDirective } from './job-no-exist.directive';
import { TemplateStatusDirective } from './template-status.directive';
import { RoleNameExistDirective } from './role-name-exist.directive';
import { ValidNavigatinNameDirective } from './navigation-name-exist.directive';
import { ValidNameUniqueDirective } from './valid-name-unique.directive';
import { ValidRelevanceNumDirective } from './valid-relevance-num.directive';

@NgModule({
  declarations: [
    GameVersionGreaterDirective,
    PwdFormatDirective,
    EqDirective,
    VaileMobileDirective,
    ValidPwdDirective,
    ValidEmailDirective,
    ValidJobNoDirective,
    IntMaxMinDirective,
    ValidBlockNameDirective,
    JobNoExistDirective,
    TemplateStatusDirective,
    RoleNameExistDirective,
    ValidNavigatinNameDirective,
    ValidNameUniqueDirective,
    ValidRelevanceNumDirective
  ],
  imports: [ CommonModule ],
  exports: [
    GameVersionGreaterDirective,
    PwdFormatDirective,
    EqDirective,
    VaileMobileDirective,
    ValidPwdDirective,
    ValidEmailDirective,
    ValidJobNoDirective,
    IntMaxMinDirective,
    ValidBlockNameDirective,
    JobNoExistDirective,
    TemplateStatusDirective,
    RoleNameExistDirective,
    ValidNavigatinNameDirective,
    ValidNameUniqueDirective,
    ValidRelevanceNumDirective
  ]
})
export class ValiditorModule {}
