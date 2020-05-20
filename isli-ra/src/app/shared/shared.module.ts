import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipeModule } from './pipe/pipe.module';
import { ComponentModule } from './component/component.module';
import { DirectiveModule } from './directive/directive.module';
import { ValiditorModule } from './validitor/validitor.module';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormValidModule } from 'mpr-form-valid';
import { TreeModule } from 'primeng/tree';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UEditorModule } from './ueditor';
import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule } from 'primeng/fileupload';
import { LightboxModule } from 'primeng/lightbox';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PipeModule,
    ComponentModule,
    DirectiveModule,
    ValiditorModule,
    TranslateModule,
    DialogModule,
    FormValidModule,
    InputTextModule,
    ButtonModule,
    TreeModule,
    ConfirmDialogModule,
    MultiSelectModule,
    FileUploadModule,
    LightboxModule,
    UEditorModule.forRoot({})
  ],
  exports: [
    PipeModule,
    ComponentModule,
    DirectiveModule,
    ValiditorModule,
    TranslateModule,
    DialogModule,
    FormValidModule,
    InputTextModule,
    ButtonModule,
    TreeModule,
    ConfirmDialogModule,
    UEditorModule,
    MultiSelectModule,
    FileUploadModule,
    LightboxModule
  ]
})
export class SharedModule {}
