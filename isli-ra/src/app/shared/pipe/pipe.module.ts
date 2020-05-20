import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameTypeTransPipe } from './game-type-trans.pipe';
import { GameStatusTransPipe } from './game-status-trans.pipe';
import { GameProcessDetailsTransPipe } from './game-process-details-trans.pipe';
import { PlatformTransPipe } from './platform-trans.pipe';
import { AuditTypeTransPipe } from './audit-type-trans.pipe';
import { MsToDayPipe } from './ms-to-day.pipe';
import { MsToHourPipe } from './ms-to-hour.pipe';
import { RegisterManagerStatusPipe } from './register-manager-status.pipe';
import { BlockStatusPipe } from './block-status.pipe';
import { TextTransformPipe } from './text-transform.pipe';
import { UnitConverPipe } from './unit-conver.pipe';
import { UserStatusPipe } from './user-status.pipe';
import { UserGroupPipe } from './user-group.pipe';
import { AccountStatusPipe } from './account-status.pipe';
import { LanguageStatusPipe } from './language-status.pipe';
import { RoleStatusPipe } from './role-status.pipe';
import { AttrTypePipe } from './attr-type.pipe';
import { CatalogTypePipe } from './catalog-type.pipe';
import { ShowHideTransPipe } from './show-hide-trans.pipe';
import { AuditResultPipe } from './audit-result.pipe';

@NgModule({
  declarations: [
    GameTypeTransPipe,
    GameStatusTransPipe,
    GameProcessDetailsTransPipe,
    PlatformTransPipe,
    AuditTypeTransPipe,
    MsToDayPipe,
    MsToHourPipe,
    RegisterManagerStatusPipe,
    BlockStatusPipe,
    TextTransformPipe,
    UnitConverPipe,
    UserStatusPipe,
    UserGroupPipe,
    AccountStatusPipe,
    LanguageStatusPipe,
    RoleStatusPipe,
    AttrTypePipe,
    CatalogTypePipe,
    ShowHideTransPipe,
    AuditResultPipe
  ],
  imports: [ CommonModule ],
  exports: [
    GameTypeTransPipe,
    GameStatusTransPipe,
    GameProcessDetailsTransPipe,
    PlatformTransPipe,
    AuditTypeTransPipe,
    MsToDayPipe,
    MsToHourPipe,
    RegisterManagerStatusPipe,
    BlockStatusPipe,
    TextTransformPipe,
    UnitConverPipe,
    UserStatusPipe,
    UserGroupPipe,
    AccountStatusPipe,
    LanguageStatusPipe,
    RoleStatusPipe,
    AttrTypePipe,
    CatalogTypePipe,
    ShowHideTransPipe,
    AuditResultPipe
  ]
})
export class PipeModule {}
