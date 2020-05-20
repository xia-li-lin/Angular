import { ModifyPasswordComponent } from './modify-password/modify-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { SharedModule } from 'src/app/shared';

@NgModule({
  declarations: [IndexComponent, ModifyPasswordComponent],
  imports: [CommonModule, SharedModule],
  exports: [IndexComponent, ModifyPasswordComponent]
})
export class IndexModule {}
