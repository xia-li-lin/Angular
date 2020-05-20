import { Component, OnInit } from '@angular/core';
import { CommonFuncService, clickOnce, clickWaitHttp, AppState } from 'src/app/core';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { LCManagerService } from 'src/app/service/lc-manager.service';
import { ThresholdService, ThresholdSearch, PageSearch, Threshold } from 'src/app/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-threshold-list',
  templateUrl: './threshold-list.component.html',
  styleUrls: [ './threshold-list.component.scss' ]
})
export class ThresholdListComponent implements OnInit {
  public search = new ThresholdSearch();
  public oldSearch = CommonFuncService.clone(this.search);
  public thresholdList = [];
  public pageInfo = new PagingBoxObj(1, 0, 10, 0);
  public searchDate = null;

  constructor(private thresholdServ: ThresholdService, private router: Router, private stateServ: AppState) {}

  ngOnInit() {
    this.loadData();
  }

  handleDateChange(date: { beginDate: string; endDate: string }) {
    this.search.startTime = date.beginDate;
    this.search.endTime = date.endDate;
  }

  @clickOnce()
  @clickWaitHttp('handleSearchClick')
  handleSearchClick() {
    if (CommonFuncService.objectEq(this.search, this.oldSearch)) {
      return;
    }
    this.pageInfo = new PagingBoxObj(1, 0, 10, 0);
    return this.loadData();
  }

  handlePageChange(pageInfo: any) {
    if (this.pageInfo.page === pageInfo.page) {
      return;
    }
    this.pageInfo.page = pageInfo.page;
    this.loadData();
  }

  @clickOnce()
  handleEditClick(threshold: Threshold) {
    this.stateServ.set('threshold-tmp', threshold);
    this.router.navigate([ '/content/lc/threshold/detail' ], { queryParams: { id: threshold.serviceProviderId } });
  }

  loadData() {
    return this.thresholdServ
      .getThresholdList(this.search, new PageSearch(this.pageInfo.page, this.pageInfo.rows))
      .success((res) => {
        this.thresholdList = res.data.list;
        this.pageInfo.totalRecords = res.data.totalCount;
      });
  }
}
