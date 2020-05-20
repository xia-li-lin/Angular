import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

const UEDITOR_CONFIG = {
  initialFrameWidth: 730,
  initialFrameHeight: 344,
  wordCount: false,
  maximumWords: Number.MAX_VALUE
};

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: [ './page-content.component.scss' ]
})
export class PageContentComponent implements OnInit {
  @Output() OnSaveClick: EventEmitter<any> = new EventEmitter();
  @Output() OnCancelClick: EventEmitter<any> = new EventEmitter();

  @Input() content: string;

  public config = UEDITOR_CONFIG;

  constructor() {}

  ngOnInit() {}

  handleSaveClick() {
    this.OnSaveClick.emit(this.content);
  }

  handleCancelClick() {
    this.OnCancelClick.emit();
  }
}
