import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from 'src/app/core';
import { CommonService } from 'src/app/service/common.service';
import { ServiceSpApply } from 'src/app/service/model';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';

@Component({
  selector: 'app-sp-apply-add-service-table',
  templateUrl: './sp-apply-add-service-table.component.html',
  styleUrls: [ './sp-apply-add-service-table.component.scss' ]
})
export class SpApplyAddServiceTableComponent implements OnInit {
  @Output() pageChange: EventEmitter<any> = new EventEmitter();
  @Output() sendMessageClick: EventEmitter<any> = new EventEmitter();

  @Input() pagingBoxObj: PagingBoxObj;
  @Input() applyServiceList: Array<ServiceSpApply>;

  public language: string;

  constructor(private commonServ: CommonService, private stateServ: AppState) {
    this.language = this.stateServ.get('language');
  }

  ngOnInit() {}

  // 预览
  handleCheckClick(rowData) {
    if (!rowData.serviceNameSwf) {
      return;
    }
    return this.commonServ.getFileDownloadURL(rowData.serviceNameSwf).success((res) => {
      window.open(res.data, '_blank');
    });
  }

  // 发送消息
  handleSendMessageClick(rowData) {
    const spId = rowData && rowData.spId;
    this.sendMessageClick.emit(spId);
  }
}
