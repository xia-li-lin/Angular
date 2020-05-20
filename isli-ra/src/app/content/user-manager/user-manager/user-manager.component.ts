import { USER_OPERATOR } from './../../../service/model/user.model';
import { CommonFuncService } from './../../../core/common-func.service';
import { PagingBoxObj } from './../../../shared/component/paging-box/paging-box.component';
import { Component, OnInit } from '@angular/core';
import { userStatus, UserService, LcAccountSearch, PageSearch } from '../../../service';
import { CommonService } from 'src/app/service/common.service';
import { clickOnce, clickWaitHttp } from 'src/app/core/cache';
import { Router } from '@angular/router';
import { GlobalValidService } from 'mpr-form-valid';
import { MessageService } from 'primeng/api';
import { HttpResponse } from 'src/app/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: [ './user-manager.component.scss' ]
})
export class UserManagerComponent implements OnInit {
  public search = new LcAccountSearch();
  public oldSearch = CommonFuncService.clone(this.search);
  public userStatus = userStatus;
  public regions = [];
  public users;
  public pageInfo = new PagingBoxObj(1, 0, 10, 0);
  public dialogShow = false;
  public reason = '';
  public errMsg = {
    reson: {
      required: 'user.dialog.submitReasonRequired'
    }
  };
  public searchDate;
  private operatUser;
  private operator: USER_OPERATOR;
  constructor(
    private userServ: UserService,
    private commonServ: CommonService,
    private router: Router,
    private globalValidServ: GlobalValidService,
    private messageServ: MessageService,
    private translateServ: TranslateService
  ) {
    commonServ.getUserRegions().success((res) => {
      this.regions = [ { label: 'common.all', value: '' } ].concat(
        (res.data.data || []).map((elem) => {
          return { label: elem.v, value: elem.k };
        })
      );
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  handleSearchDateChange(date) {
    this.search.startTime = date.beginDate;
    this.search.endTime = date.endDate;
  }

  @clickOnce()
  @clickWaitHttp('handlUserSearch')
  handleSearch() {
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
      .getLCUsers(this.search, new PageSearch(this.pageInfo.page, this.pageInfo.rows))
      .success((res) => {
        res.data = res.data || {};
        this.users = res.data.list || [];
        this.pageInfo.totalRecords = res.data.totalCount;
      });
  }

  @clickOnce()
  handleDetailClick(userInfo) {
    this.router.navigate([ '/content/user/unification/detail' ], { queryParams: { userId: userInfo.unificationId } });
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
      httpReq = this.userServ.freezeLCUser(this.operatUser.unificationId, this.reason);
    } else if (this.operator === USER_OPERATOR.ENABLE) {
      httpReq = this.userServ.enableLCUser(this.operatUser.unificationId, this.reason);
    } else {
      httpReq = this.userServ.stopLCUser(this.operatUser.unificationId, this.reason);
    }

    httpReq
      .success(() => {
        this.loadUsers();
        this.dialogShow = false;
        this.messageServ.add({
          severity: 'success',
          summary: this.translateServ.instant('content.nav.lcManager'),
          detail: this.translateServ.instant('common.operaSuccess')
        });
      })
      .failed(() => {
        this.messageServ.add({
          severity: 'error',
          summary: this.translateServ.instant('content.nav.lcManager'),
          detail: this.translateServ.instant('common.operaFailed')
        });
      });
  }
}
