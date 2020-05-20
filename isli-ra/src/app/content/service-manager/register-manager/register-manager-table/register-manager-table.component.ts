import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RegisterManagerData, STATUS } from 'src/app/service/model';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';

@Component({
  selector: 'app-register-manager-table',
  templateUrl: './register-manager-table.component.html',
  styleUrls: [ './register-manager-table.component.scss' ]
})
export class RegisterManagerTableComponent implements OnInit {
  @Output() pageChange: EventEmitter<any> = new EventEmitter();

  @Input() pagingBoxObj: PagingBoxObj;
  @Input() registerManagerList: Array<RegisterManagerData>;

  public status = STATUS;

  constructor() {}

  ngOnInit() {}
}
