import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared';
import { ExcelComponent } from './excel';
import { TabMenuComponent } from './tab-menu';
import { ExportImageComponent } from './export-image/export-image.component';
import { ExportViewComponent } from './export-view';

@NgModule({
  declarations: [ ExcelComponent, TabMenuComponent, ExportImageComponent, ExportViewComponent ],
  imports: [ CommonModule, SharedModule ],
  exports: [ ExcelComponent, TabMenuComponent, ExportImageComponent, ExportViewComponent ]
})
export class StatisticSharedModule {}
