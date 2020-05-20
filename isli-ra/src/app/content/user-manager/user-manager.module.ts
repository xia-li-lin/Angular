import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { SpUserCheckComponent } from './sp-user-check/sp-user-check.component';
import { SpUserManagerComponent } from './sp-user-manager/sp-user-manager.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SharedModule } from 'src/app/shared';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SpUserDetailComponent } from './sp-user-detail/sp-user-detail.component';

@NgModule({
  declarations: [
    UserManagerComponent,
    SpUserCheckComponent,
    SpUserManagerComponent,
    UserDetailComponent,
    SpUserDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    InputTextareaModule
  ],
  exports: [
    UserManagerComponent,
    SpUserCheckComponent,
    SpUserManagerComponent,
    UserDetailComponent,
    SpUserDetailComponent
  ]
})
export class UserManagerModule {}
