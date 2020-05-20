import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatternInputDirective } from './pattern-input.directive';
import { TrimDirective } from './trim.directive';
import { InputTextareaDirective } from './input-textarea.directive';
import { PermissionDirective } from './permission.directive';
import { InputReadOnlyDirective } from './input-only.directive';
// import { PdfPreviewDirective } from './pdf-preview.directive';

@NgModule({
  declarations: [
    PatternInputDirective,
    TrimDirective,
    InputTextareaDirective,
    PermissionDirective,
    InputReadOnlyDirective
    // PdfPreviewDirective
  ],
  imports: [ CommonModule ],
  exports: [ PatternInputDirective, TrimDirective, InputTextareaDirective, PermissionDirective, InputReadOnlyDirective ]
})
export class DirectiveModule {}
