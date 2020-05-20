import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FormValidModule } from 'mpr-form-valid';
import { CheckboxModule } from 'primeng/checkbox';

import { LoginComponent } from './login/login.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared';

const routes: Routes = [
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormValidModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    TranslateModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule {}
