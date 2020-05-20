import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { FeedbackDetailComponent } from './feedback-detail/feedback-detail.component';
import { FqManagerComponent } from './fq-manager/fq-manager.component';
import { FqManagerDetailComponent } from './fq-manager-detail/fq-manager-detail.component';
import { SharedModule } from 'src/app/shared';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InteractManagerSharedModule } from './interact-manager-shared';

@NgModule({
  declarations: [ FeedbackListComponent, FeedbackDetailComponent, FqManagerComponent, FqManagerDetailComponent ],
  imports: [ CommonModule, SharedModule, InputTextModule, ButtonModule, TableModule, InteractManagerSharedModule ],
  exports: [ FeedbackListComponent, FeedbackDetailComponent, FqManagerComponent, FqManagerDetailComponent ]
})
export class InteractManagerModule {}
