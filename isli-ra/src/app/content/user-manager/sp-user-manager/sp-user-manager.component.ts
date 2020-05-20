import { PagingBoxObj } from './../../../shared/component/paging-box/paging-box.component';
import { userGroups, userStatus, SPAccountSearch, USER_OPERATOR } from './../../../service/model/user.model';
import { Component, OnInit } from '@angular/core';
import { CommonFuncService } from 'src/app/core/common-func.service';
import { clickOnce, clickWaitHttp } from 'src/app/core/cache';
import { Router } from '@angular/router';
import { UserService, PageSearch } from 'src/app/service';
import { GlobalValidService } from 'mpr-form-valid';
import { HttpResponse } from 'src/app/core';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sp-user-manager',
  templateUrl: './sp-user-manager.component.html',
  styleUrls: [ './sp-user-manager.component.scss' ]
})
export class SpUserManagerComponent implements OnInit {
  public search = new SPAccountSearch();
  public oldSearch = CommonFuncService.clone(this.search);
  public userGroups = userGroups;
  public userStatus = userStatus;
  public users = [];
  public pageInfo = new PagingBoxObj(1, 0, 10, 0);
  public dialogShow = false;
  public reason = '';
  public searchDate: any;
  public errMsg = {
    reason: {
      required: 'user.dialog.submitReasonRequired'
    }
  };
  private operatUser;
  private operator: USER_OPERATOR;

  constructor(
    private userServ: UserService,
    private router: Router,
    private globalValidServ: GlobalValidService,
    protected messageServ: MessageService,
    private translateServ: TranslateService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  handleSearchDateChange(date) {
    this.search.startTime = date.beginDate;
    this.search.endTime = date.endDate;
  }

  @clickWaitHttp('handleSearchClick')
  handleSearchClick() {
    if (CommonFuncService.objectEq(this.search, this.oldSearch)) {
      return;
    }
    this.pageInfo = new PagingBoxObj(1, 0, 10, 0);
    this.loadUsers().success(() => {
      this.oldSearch = CommonFuncService.clone(this.search);
    });
  }

  handlePageChange(pageInfo: PagingBoxObj) {
    this.pageInfo.page = pageInfo.page;
    this.loadUsers();
  }

  loadUsers() {
    return this.userServ
      .getSPUsers(this.search, new PageSearch(this.pageInfo.page, this.pageInfo.rows))
      .success((res) => {
        this.users = res.data.list || [];
        this.pageInfo.totalRecords = res.data.totalCount;
      });
  }

  @clickOnce()
  handleDetailClick(userInfo) {
    this.router.navigate([ '/content/user/sp-manager/detail' ], { queryParams: { userId: userInfo.id } });
  }

  @clickOnce()
  handleFreezeClick(userInfo) {
    this.reason = '';
    this.dialogShow = true;
    this.operatUser = userInfo;
    this.operator = USER_OPERATOR.FREEZE;
  }

  @clickOnce()
  handleUnFreezeClick(userInfo) {
    this.reason = '';
    this.dialogShow = true;
    this.operatUser = userInfo;
    this.operator = USER_OPERATOR.ENABLE;
  }

  @clickOnce()
  handleStopClick(userInfo) {
    this.reason = '';
    this.dialogShow = true;
    this.operatUser = userInfo;
    this.operator = USER_OPERATOR.STOP;
  }

  @clickOnce()
  handleConfirmClick() {
    if (!this.globalValidServ.validAll()) {
      return;
    }
    let httpReq: HttpResponse<any>;
    if (this.operator === USER_OPERATOR.FREEZE) {
      httpReq = this.userServ.freezeSPUser(this.operatUser.id, this.reason);
    } else if (this.operator === USER_OPERATOR.ENABLE) {
      httpReq = this.userServ.enableSPUser(this.operatUser.id, this.reason);
    } else {
      httpReq = this.userServ.stopSPUser(this.operatUser.id, this.reason);
    }

    httpReq
      .success(() => {
        this.loadUsers();
        this.dialogShow = false;
        this.messageServ.add({
          severity: 'success',
          summary: this.translateServ.instant('content.nav.spManager'),
          detail: this.translateServ.instant('common.operaSuccess')
        });
      })
      .failed(() => {
        this.messageServ.add({
          severity: 'error',
          summary: this.translateServ.instant('content.nav.spManager'),
          detail: this.translateServ.instant('common.operaFailed')
        });
      });
  }
}
