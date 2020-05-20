import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared';
import { SelectComponent } from './select';
import { ServiceFormCnComponent } from './service-form-cn';
import { ServiceFormEnComponent } from './service-form-en';
import { AddFiledComponent } from './add-filed';

@NgModule({
  declarations: [ SelectComponent, ServiceFormCnComponent, ServiceFormEnComponent, AddFiledComponent ],
  imports: [ CommonModule, SharedModule ],
  exports: [ SelectComponent, ServiceFormCnComponent, ServiceFormEnComponent, AddFiledComponent ]
})
export class ServiceListSharedModule {}
