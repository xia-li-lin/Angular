import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: [ './excel.component.scss' ]
})
export class ExcelComponent implements OnInit {
  @Output() exportTable = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  handleExportTable() {
    this.exportTable.emit();
  }
}
