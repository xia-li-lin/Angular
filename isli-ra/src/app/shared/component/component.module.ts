import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { FileUploadModule } from 'primeng/fileupload';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelModule } from 'primeng/panel';
import { ListboxModule } from 'primeng/listbox';
import { PagingBoxComponent } from './paging-box';
import { PagingBoxChildrenComponent } from './paging-box/paging-box-children';
import { LoaingDataComponent } from './loaing-data/loaing-data.component';
import { DialogComponent } from './dialog/dialog.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AutoTopComponent } from './auto-top/auto-top.component';
import { BeginEndDateComponent } from './begin-end-date/begin-end-date.component';
import { AddressComponent } from './address/address.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { UploadAffixComponent } from './upload-affix/upload-affix.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    TableModule,
    ToastModule,
    RadioButtonModule,
    InputTextModule,
    ProgressBarModule,
    FileUploadModule,
    AutoCompleteModule,
    MultiSelectModule,
    SelectButtonModule,
    PanelModule,
    NgxEchartsModule,
    ListboxModule,
    TranslateModule
  ],
  declarations: [
    PagingBoxComponent,
    PagingBoxChildrenComponent,
    LoaingDataComponent,
    DialogComponent,
    CalendarComponent,
    AutoTopComponent,
    BeginEndDateComponent,
    AddressComponent,
    FileUploadComponent,
    UploadAffixComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    TableModule,
    ToastModule,
    MultiSelectModule,
    PanelModule,
    SelectButtonModule,
    NgxEchartsModule,
    ListboxModule,
    ProgressBarModule,
    FileUploadModule,
    AutoCompleteModule,
    RadioButtonModule,
    PagingBoxComponent,
    PagingBoxChildrenComponent,
    LoaingDataComponent,
    DialogComponent,
    CalendarComponent,
    AutoTopComponent,
    BeginEndDateComponent,
    AddressComponent,
    FileUploadComponent,
    UploadAffixComponent
  ]
})
export class ComponentModule {}
