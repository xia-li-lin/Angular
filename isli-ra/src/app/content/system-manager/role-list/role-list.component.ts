import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TreeNode, MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import { AccountRoleService, AccountRole, PageSearch } from '../../../service';
import { PagingBoxObj } from '../../../shared/component/paging-box';
import { clickOnce, clickWaitHttp } from 'src/app/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: [ './role-list.component.scss' ],
  providers: [ ConfirmationService ]
})
export class RoleListComponent implements OnInit {
  public roleListData: Array<AccountRole>;
  public rolePermissinData: Array<any>;
  public rolePermissinSelectionData: Array<any>;
  public showPromissinFlag: boolean;
  public roleId: number;
  public pageInfo = new PagingBoxObj();

  constructor(
    private accountRoleService: AccountRoleService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.getRoleListData();
  }

  getRoleListData() {
    this.accountRoleService
      .getRoleList({ pageNo: this.pageInfo.page, pageSize: this.pageInfo.rows })
      .success((res) => {
        console.log(res.data.pagination);
        this.roleListData = res.data.pagination.list;
        this.pageInfo.totalRecords = res.data.pagination.totalCount;
      })
      .error(() => {
        this.roleListData = [];
        this.pageInfo.totalRecords = 0;
      });
  }

  @clickOnce()
  handleCreateClick() {
    this.router.navigate([ '/content/system/role-list/role' ]);
  }

  @clickOnce()
  handleEditClick(rowData: AccountRole) {
    this.router.navigate([ '/content/system/role-list/edit' ], {
      relativeTo: this.activateRoute,
      queryParams: rowData
    });
  }

  @clickOnce()
  handleDeleteClick(rowData: AccountRole) {
    this.confirmationService.confirm({
      message: this.translateService.instant('systemRole.list.deleteMess'),
      accept: () => {
        this.accountRoleService
          .deleteRole(rowData.roleId)
          .success((res) => {
            console.log('delete success---');
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('common.operaSuccess')
            });
            if (this.roleListData.length === 1 && this.pageInfo.page > 1) {
              this.pageInfo.page -= 1;
            }
            this.getRoleListData();
          })
          .failed((res) => {
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('common.operaFailed')
            });
          });
      }
    });
  }

  @clickOnce()
  handleStopClick(rowData: AccountRole) {
    this.roleId = rowData.roleId;
    this.confirmationService.confirm({
      message: this.translateService.instant('systemRole.list.stopMess'),
      accept: () => {
        this.accountRoleService
          .disableRole(rowData.roleId)
          .success((res) => {
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('common.operaSuccess')
            });
            this.getRoleListData();
          })
          .failed((res) => {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant('common.operaFailed')
            });
          });
      }
    });
  }

  @clickOnce()
  handleStartClick(rowData: AccountRole) {
    this.roleId = rowData.roleId;
    this.confirmationService.confirm({
      message: this.translateService.instant('systemRole.list.startMess'),
      accept: () => {
        this.accountRoleService
          .enableRole(rowData.roleId)
          .success((res) => {
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('common.operaSuccess')
            });
            this.getRoleListData();
          })
          .failed((res) => {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant('common.operaFailed')
            });
          });
      }
    });
  }

  @clickWaitHttp('handleLimitsClick')
  handleLimitsClick(rowData: AccountRole) {
    this.roleId = rowData.roleId;
    this.accountRoleService.getRolePermission(rowData.roleId).success((res) => {
      console.log(res.data);
      this.rolePermissinData = res.data.treeData;
      this.rolePermissinSelectionData = res.data.selectionData;
      this.showPromissinFlag = true;
    });
  }

  @clickWaitHttp('handleSaveRolePermissionClick')
  handleSaveRolePermissionClick(roleIdArr) {
    this.accountRoleService.updateRolePermission(roleIdArr, this.roleId).success((res) => {
      this.showPromissinFlag = false;
    });
  }

  handleClosePermissinClick() {
    this.showPromissinFlag = false;
  }

  handlePageChange(pageInfo) {
    console.log(pageInfo);
    this.pageInfo.page = pageInfo.page;
    this.getRoleListData();
  }
}
