import { Component, OnInit } from '@angular/core';

import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { PageParams, AccountListQueryObj, AccountUserDetailsObj, DropDownOption } from 'src/app/service';
import { SystemAccountService } from 'src/app/service/system-account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { clickOnce, clickWaitHttp, AppState } from 'src/app/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: [ './account-list.component.scss' ],
  providers: [ ConfirmationService ]
})
export class AccountListComponent implements OnInit {
  public pageInfo = new PagingBoxObj();
  public accountListData: Array<AccountUserDetailsObj>;
  public showRoleDialogFlag = false;
  public roleLimitsData: Array<DropDownOption>;
  public roleLimitSelected: Array<string>;
  public nowItemData: AccountUserDetailsObj;
  public adminId: string;

  private queryParams = new AccountListQueryObj();

  constructor(
    private systemAccountService: SystemAccountService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translateService: TranslateService,
    private appState: AppState
  ) {}

  ngOnInit() {
    this.getAccountList();
    this.getRoleListAll();
    this.adminId = this.appState.get('userId');
  }

  getAccountList() {
    this.systemAccountService
      .getAccountList(Object.assign({}, this.queryParams, { pageNo: this.pageInfo.page }))
      .success((res) => {
        console.log('get account list-----', res);
        this.accountListData = res.data.list;
        this.pageInfo.totalRecords = res.data.totalCount;
      })
      .error(() => {
        this.accountListData = [];
        this.pageInfo.totalRecords = 0;
      });
  }

  getRoleListAll() {
    this.systemAccountService.getRoleListAll().success((res) => {
      console.log('get role list----', res);
      this.roleLimitsData = (res.data || []).map((item) => {
        return new DropDownOption(item.roleName, item.roleId);
      });
    });
  }

  handlePageChange(info: { page: number }) {
    this.pageInfo.page = info.page;
    this.getAccountList();
  }

  @clickOnce()
  handleCreateClick() {
    this.router.navigate([ '/content/system/account-list/account' ]);
  }

  @clickOnce()
  handleEditClick(rowData: AccountUserDetailsObj) {
    this.router.navigate([ '/content/system/account-list/edit' ], {
      relativeTo: this.activateRoute,
      queryParams: { id: rowData.adminId }
    });
  }

  @clickOnce()
  handleStopClick(rowData: AccountUserDetailsObj) {
    this.confirmationService.confirm({
      message: this.translateService.instant('systemAccount.list.stopMess'),
      accept: () => {
        this.systemAccountService
          .disableAccount(rowData.adminId)
          .success((res) => {
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('common.operaSuccess')
            });
            this.getAccountList();
          })
          .failed(() => {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant('common.operaFailed')
            });
          });
      }
    });
  }

  @clickOnce()
  handleStartClick(rowData: AccountUserDetailsObj) {
    this.confirmationService.confirm({
      message: this.translateService.instant('systemAccount.list.startMess'),
      accept: () => {
        this.systemAccountService
          .enableAccount(rowData.adminId)
          .success((res) => {
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('common.operaSuccess')
            });
            this.getAccountList();
          })
          .failed(() => {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant('common.operaFailed')
            });
          });
      }
    });
  }

  @clickWaitHttp((rowData: AccountUserDetailsObj) => 'handleAllocationClick' + rowData.adminId)
  handleAllocationClick(rowData: AccountUserDetailsObj) {
    console.log('rowData----', rowData);
    this.nowItemData = rowData;
    return this.systemAccountService.getAccountRole(rowData.adminId).success((res) => {
      console.log('rolelist----', res);
      this.roleLimitSelected = (res.data || []).map((item) => {
        return item.roleId + '';
      });
      this.showRoleDialogFlag = true;
    });
  }

  @clickWaitHttp('handleSaveRoleLimitsClick')
  handleSaveRoleLimitsClick(data: Array<string>) {
    return this.systemAccountService
      .updateAccountRole(data, this.nowItemData.adminId)
      .success((res) => {
        this.messageService.add({
          severity: 'success',
          summary: this.translateService.instant('common.operaSuccess')
        });
        //     this.getAccountList();
        this.showRoleDialogFlag = false;
      })
      .failed(() => {
        this.messageService.add({
          severity: 'error',
          summary: this.translateService.instant('common.operaFailed')
        });
      });
  }

  handleCloseRoleLimitsClick() {
    this.showRoleDialogFlag = false;
  }

  @clickOnce()
  handleDeleteClick(rowData: AccountUserDetailsObj) {
    this.confirmationService.confirm({
      message: this.translateService.instant('systemAccount.list.deleteMess'),
      accept: () => {
        this.systemAccountService
          .deleteAccount(rowData.adminId)
          .success((res) => {
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('common.operaSuccess')
            });
            if (this.accountListData.length === 1 && this.pageInfo.page > 1) {
              this.pageInfo.page -= 1;
            }
            this.getAccountList();
          })
          .failed(() => {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant('common.operaFailed')
            });
          });
      }
    });
  }
}
