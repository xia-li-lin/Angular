import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared';
import { SearchStatSearchComponent } from './search-stat-search';
import { SearchStatTableComponent } from './search-stat-table';

@NgModule({
  declarations: [ SearchStatSearchComponent, SearchStatTableComponent ],
  imports: [ CommonModule, SharedModule ],
  exports: [ SearchStatSearchComponent, SearchStatTableComponent ]
})
export class SearchStatSharedModule {}
