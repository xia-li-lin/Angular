import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared';
import { SpStatSearchComponent } from './sp-stat-search';
import { SpStatTableComponent } from './sp-stat-table';

@NgModule({
  declarations: [ SpStatSearchComponent, SpStatTableComponent ],
  imports: [ CommonModule, SharedModule ],
  exports: [ SpStatSearchComponent, SpStatTableComponent ]
})
export class SpStatSharedModule {}
