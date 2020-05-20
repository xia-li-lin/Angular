import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from 'ngx-clipboard';
import { SharedModule } from '../../../shared';
import { ServiceManagerDialogComponent } from './service-manager-dialog';
import { AppealReviewDialogComponent } from './appeal-review-dialog/appeal-review-dialog.component';

@NgModule({
  declarations: [ ServiceManagerDialogComponent, AppealReviewDialogComponent ],
  imports: [ CommonModule, SharedModule, ClipboardModule ],
  exports: [ ServiceManagerDialogComponent, AppealReviewDialogComponent ]
})
export class ServiceManagerSharedModule {}
