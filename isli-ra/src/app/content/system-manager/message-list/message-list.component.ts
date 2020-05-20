import { Component, OnInit } from '@angular/core';

import { MessageManagerService, PageSearch, DropDownOption } from 'src/app/service';
import { MessageManager, MessageSearch, SPAccount } from 'src/app/service/model/message-manager.model';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { clickOnce, clickWaitHttp } from 'src/app/core';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: [ './message-list.component.scss' ]
})
export class MessageListComponent implements OnInit {
  public messageListData: Array<MessageManager>;
  public accountListData: Array<DropDownOption>;
  public showCreateFlag: boolean;
  public pageInfo = new PagingBoxObj(1, 0, 3, 1, 5);

  private queryParams = new MessageSearch();

  constructor(
    private messageManagerService: MessageManagerService,
    private messageService: MessageService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.getMessageListData();
    this.getSPaccountData();
  }

  getMessageListData() {
    this.messageManagerService
      .getMessageList(this.queryParams, {
        pageNo: this.pageInfo.page,
        pageSize: this.pageInfo.rows
      })
      .success((res) => {
        this.messageListData = res.data.list;
        this.pageInfo.totalRecords = res.data.totalCount;
      })
      .error(() => {
        this.messageListData = [];
        this.pageInfo.totalRecords = 0;
      });
  }

  getSPaccountData() {
    this.messageManagerService.getSPAccountList().success((res) => {
      this.accountListData = res.data;
    });
  }

  handleSpreadClick(item: MessageManager) {
    item.spreadFlag = !item.spreadFlag;
  }

  @clickWaitHttp('handleQueryClick')
  handleQueryClick(params: MessageSearch) {
    this.pageInfo.page = 1;
    this.queryParams = params;
    this.getMessageListData();
  }

  @clickOnce()
  handleCreateClick() {
    this.showCreateFlag = true;
  }

  handleCancelClick() {
    this.showCreateFlag = false;
  }

  @clickWaitHttp('handleSureClick')
  handleSureClick(data: Array<MessageManager>) {
    let files = [];
    data.forEach((item) => {
      if (item.fileList) {
        files = files.concat(item.fileList);
      }
    });
    this.messageManagerService.addMessage(data).success((res) => {
      console.log(res.data);
      this.messageManagerService
        .uploadFiles(res.data, files)
        .success(() => {
          this.pageInfo.page = 1;
          this.getMessageListData();
          this.showCreateFlag = false;
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('common.operaSuccess')
          });
        })
        .failed(() => {
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('common.operaFailed')
          });
        });
    });
  }

  handlePageChange(page) {
    this.pageInfo.page = page.page;
    this.getMessageListData();
  }
}
