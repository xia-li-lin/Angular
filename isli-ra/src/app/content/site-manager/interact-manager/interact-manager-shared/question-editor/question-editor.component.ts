import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { clickOnce } from 'src/app/core';

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: [ './question-editor.component.scss' ]
})
export class QuestionEditorComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  @Input() content: string;

  constructor() {}

  ngOnInit() {}

  handleCancelClick() {
    this.cancel.emit();
  }

  handleSaveClick() {
    this.save.emit(this.content);
  }
}
