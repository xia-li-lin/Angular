import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

import { DealWithComponent } from './deal-with/deal-with.component';
import { QuestionEditorComponent } from './question-editor/question-editor.component';
import { FqManagerReplayComponent } from './fq-manager-replay/fq-manager-replay.component';
import { SharedModule } from 'src/app/shared';

@NgModule({
  declarations: [ DealWithComponent, QuestionEditorComponent, FqManagerReplayComponent ],
  imports: [ CommonModule, FormsModule, CheckboxModule, SharedModule ],
  exports: [ DealWithComponent, QuestionEditorComponent, FqManagerReplayComponent ]
})
export class InteractManagerSharedModule {}
