import { Component, OnInit } from '@angular/core';
import { BlockSearch, Block, blockStatus } from 'src/app/service/model/area-manager.model';
import { CommonService } from 'src/app/service/common.service';
import { clickOnce, clickWaitHttp, CommonFuncService } from 'src/app/core';
import { AreaManagerService } from 'src/app/service/area-manager.service';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: [ './area-list.component.scss' ]
})
export class AreaListComponent implements OnInit {
  public areaBlockList: Array<Block>;
  public blockStatus = blockStatus;
  public oldSearch: BlockSearch;
  public pageInfo = new PagingBoxObj(1, 0, 10, 0);
  public serviceCodeList: Array<SelectItem> = [];
  public search = new BlockSearch();
  public searchDate = null;

  constructor(private commonServ: CommonService, private areaServ: AreaManagerService, private router: Router) {
    commonServ.getServiceCodeList().success((res) => {
      this.serviceCodeList = (res.data || []).map((elem) => {
        const serviceCode = elem.serviceCodeZh || elem.serviceCodeEn;
        return { value: serviceCode, label: serviceCode };
      });
      this.serviceCodeList.unshift({ label: 'å…¨éƒ¨', value: '' });
    });
  }

  ngOnInit() {
    this.loadData();
  }

  @clickOnce()
  public handleAddClick() {
    this.router.navigate([ '/content/area/list/add' ]);
  }

  handleDateChange(date: { beginDate: string; endDate: string }) {
    this.search.startTime = (date.beginDate || '').split(' ')[0];
    this.search.endTime = (date.endDate || '').split(' ')[0];
  }

  @clickOnce()
  public handleDetailClick(block: Block) {
    this.router.navigate([ '/content/area/list/detail' ], { queryParams: { blockId: block.blockId, readonly: true } });
  }

  @clickOnce()
  public handleModifyClick(block: Block) {
    this.router.navigate([ '/content/area/list/detail' ], { queryParams: { blockId: block.blockId, modify: true } });
  }

  public handlePageChange(pageInfo: PagingBoxObj) {
    this.pageInfo.page = pageInfo.page;
    return this.loadData();
  }

  @clickWaitHttp('handleSearchClick')
  public handleSearchClick() {
    if (this.oldSearch && CommonFuncService.objectEq(this.oldSearch, this.search)) {
      return;
    }
    return this.loadData();
  }

  @clickOnce()
  public handleServiceClick(block: Block) {
    this.router.navigate([ '/content/area/list/service' ], { queryParams: { blockId: block.blockId } });
  }

  private loadData() {
    return this.areaServ
      .getAreaBlockList(this.search, { pageNo: this.pageInfo.page, pageSize: this.pageInfo.rows })
      .success((res) => {
        this.areaBlockList = res.data.list;
        this.pageInfo.totalRecords = res.data.totalCount;
      });
  }
}
