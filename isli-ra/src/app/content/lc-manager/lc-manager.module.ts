import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlloctListComponent } from './alloct-list/alloct-list.component';
import { ThresholdListComponent } from './threshold-list/threshold-list.component';
import { ThresholdDetailComponent } from './threshold-detail/threshold-detail.component';
import { SharedModule } from 'src/app/shared';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [AlloctListComponent, ThresholdListComponent, ThresholdDetailComponent],
  imports: [CommonModule, SharedModule, InputTextModule, ButtonModule, TableModule]
})
export class LcManagerModule {}
