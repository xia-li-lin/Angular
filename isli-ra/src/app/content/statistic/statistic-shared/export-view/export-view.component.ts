import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-export-view',
  templateUrl: './export-view.component.html',
  styleUrls: [ './export-view.component.scss' ]
})
export class ExportViewComponent implements OnInit {
  @Output() exportView = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  // 导出视图
  handleExportViewClick() {
    this.exportView.emit();
  }
}
