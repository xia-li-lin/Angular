import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { UEditorComponent } from './ueditor/ueditor.component';
import { UEditorConfig } from './ueditor/ueditor.config';
import { ScriptService } from './ueditor/script.service';

export { UEditorComponent } from './ueditor/ueditor.component';
export { UEditorConfig } from './ueditor/ueditor.config';

@NgModule({
  imports: [ CommonModule ],
  providers: [ ScriptService ],
  declarations: [ UEditorComponent ],
  exports: [ UEditorComponent ]
})
export class UEditorModule {
  static forRoot(config: UEditorConfig): ModuleWithProviders {
    return {
      ngModule: UEditorModule,
      providers: [ { provide: UEditorConfig, useValue: config } ]
    };
  }
}
