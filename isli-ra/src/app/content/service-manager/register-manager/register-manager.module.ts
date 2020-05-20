import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardModule } from 'ngx-clipboard';
import { SharedModule } from 'src/app/shared';
import { ServiceManagerSharedModule } from '../service-manager-shared';
import { RegisterManagerSharedModule } from './register-manager-shared';
import { RegisterManagerSearchComponent } from './register-manager-search';
import { RegisterManagerTableComponent } from './register-manager-table';
import { RegisterManagerOperaComponent } from './register-manager-opera';
import { RegisterManagerComponent } from './register-manager';
import { RegisterDetailComponent } from './register-detail';

const routers: Routes = [
  {
    path: 'list',
    component: RegisterManagerComponent,
    data: {
      reload: false
    }
  },
  {
    path: 'list/detail',
    component: RegisterDetailComponent,
    data: {
      label: 'service.nav.serviceRegisterManagerDetail'
    }
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  declarations: [
    RegisterManagerComponent,
    RegisterManagerSearchComponent,
    RegisterManagerTableComponent,
    RegisterManagerOperaComponent,
    RegisterDetailComponent
  ],
  imports: [
    CommonModule,
    ClipboardModule,
    TranslateModule,
    SharedModule,
    RegisterManagerSharedModule,
    ServiceManagerSharedModule,
    RouterModule.forChild(routers)
  ]
})
export class RegisterManagerModule {}
