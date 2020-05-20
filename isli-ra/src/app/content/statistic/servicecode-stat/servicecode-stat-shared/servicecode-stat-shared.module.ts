import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared';
import { ServicecodeStatSearchComponent } from './servicecode-stat-search';
import { ServicecodeStatTableComponent } from './servicecode-stat-table';

@NgModule({
  declarations: [ ServicecodeStatSearchComponent, ServicecodeStatTableComponent ],
  imports: [ CommonModule, SharedModule ],
  exports: [ ServicecodeStatSearchComponent, ServicecodeStatTableComponent ]
})
export class ServicecodeStatSharedModule {}
