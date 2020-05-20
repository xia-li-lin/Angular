import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared';
import { ControlledWordAddComponent } from './controlled-word-add';

@NgModule({
  declarations: [ ControlledWordAddComponent ],
  imports: [ CommonModule, SharedModule ],
  exports: [ ControlledWordAddComponent ]
})
export class ControlledWordSharedModule {}
