import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared';
import { AnalysisStatSearchComponent } from './analysis-stat-search';
import { AnalysisStatTableComponent } from './analysis-stat-table';

@NgModule({
  declarations: [ AnalysisStatSearchComponent, AnalysisStatTableComponent ],
  imports: [ CommonModule, SharedModule ],
  exports: [ AnalysisStatSearchComponent, AnalysisStatTableComponent ]
})
export class AnalysisStatSharedModule {}
