import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaListComponent } from './area-list/area-list.component';
import { AreaDetailComponent } from './area-detail/area-detail.component';
import { SharedModule } from 'src/app/shared';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { MultiSelectModule } from 'primeng/multiselect';
import { UEditorModule } from 'src/app/shared/ueditor';

@NgModule({
  declarations: [ AreaListComponent, AreaDetailComponent ],
  imports: [
    CommonModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    TabViewModule,
    MultiSelectModule,
    UEditorModule.forRoot({ path: 'assets/ueditor/', options: { initialFrameWidth: '100%', initialFrameHeight: 315 } })
  ],
  exports: [ AreaListComponent, AreaDetailComponent ]
})
export class AreaManagerModule {}
