import { Component, OnInit } from '@angular/core';

import { SystemLogService, SystemLogSearch, PageSearch, SystemLog, DropDownOption } from 'src/app/service';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { clickWaitHttp } from 'src/app/core';

@Component({
  selector: 'app-system-log',
  templateUrl: './system-log.component.html',
  styleUrls: [ './system-log.component.scss' ]
})
export class SystemLogComponent implements OnInit {
  public pageInfo = new PagingBoxObj();
  public systemListData: Array<SystemLog>;
  public roleListData: Array<any>;

  private queryParams = new SystemLogSearch();

  constructor(private systemService: SystemLogService) {}

  ngOnInit() {
    this.getSystemLogList();
    this.getAllRole();
  }

  getAllRole() {
    this.systemService
      .getAllRole()
      .success((res) => {
        console.log('role list----', res);
        this.roleListData = (res.data || []).map((ele) => {
          return new DropDownOption(ele.roleName, ele.roleId);
        });
      })
      .error(() => {
        this.roleListData = [];
      });
  }

  getSystemLogList() {
    this.systemService
      .getSystemLogList(this.queryParams, {
        pageNo: this.pageInfo.page,
        pageSize: this.pageInfo.rows
      })
      .success((res) => {
        this.systemListData = res.data.list;
        this.pageInfo.totalRecords = res.data.totalCount;
      })
      .error(() => {
        this.systemListData = [];
        this.pageInfo.totalRecords = 0;
      });
  }

  @clickWaitHttp('handleQueryClick')
  handleQueryClick(params: SystemLogSearch) {
    this.queryParams = params;
    this.pageInfo.page = 1;
    this.getSystemLogList();
  }

  handlePageChange(pageInfo: any) {
    this.pageInfo.page = pageInfo.page;
    this.getSystemLogList();
  }
}
