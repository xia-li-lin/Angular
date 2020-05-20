import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PagingBoxObj } from '../../../../shared/component/paging-box';
import { ServiceInfo } from 'src/app/service';
import { AppState } from 'src/app/core';

@Component({
  selector: 'app-service-table',
  templateUrl: './service-table.component.html',
  styleUrls: [ './service-table.component.scss' ]
})
export class ServiceTableComponent implements OnInit {
  @Output() pageChange: EventEmitter<any> = new EventEmitter();
  // @Output() OnServicePushClick: EventEmitter<any> = new EventEmitter();

  @Input() serviceList: Array<ServiceInfo>;
  @Input() pagingBoxObj: PagingBoxObj;

  public language: string;

  constructor(private appState: AppState, private router: Router, private translateService: TranslateService) {
    this.language = this.appState.get('language');
  }

  ngOnInit() {}

  // 查看
  handleViewDetailClick(rowData) {
    const id = rowData && rowData.serviceInfoId;
    this.router.navigate([ '/content/service/services/list/detail' ], { queryParams: { id } });
  }

  // 修改
  handleModifyClick(rowData) {
    const id = rowData && rowData.serviceInfoId;
    this.router.navigate([ '/content/service/services/list/modify' ], { queryParams: { id } });
  }

  // 服务推送
  // handleServicePushClick(rowData) {
  //   const id = rowData && rowData.id;
  //   this.OnServicePushClick.emit(id);
  // }
}
