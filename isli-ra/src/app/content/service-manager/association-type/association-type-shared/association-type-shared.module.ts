import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared';
import { AssociationTypeFormEnComponent } from './association-type-form-en';
import { AssociationTypeFormCnComponent } from './association-type-form-cn';

@NgModule({
  declarations: [ AssociationTypeFormEnComponent, AssociationTypeFormCnComponent ],
  imports: [ CommonModule, SharedModule ],
  exports: [ AssociationTypeFormEnComponent, AssociationTypeFormCnComponent ]
})
export class AssociationTypeSharedModule {}
