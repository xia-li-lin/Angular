import { Component, OnInit } from '@angular/core';
import { CommonFuncService, clickOnce, clickWaitHttp } from 'src/app/core';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { Alloct, AlloctSearch, AlloctService, PageSearch } from 'src/app/service';

@Component({
  selector: 'app-alloct-list',
  templateUrl: './alloct-list.component.html',
  styleUrls: [ './alloct-list.component.scss' ]
})
export class AlloctListComponent implements OnInit {
  public search = new AlloctSearch();
  public oldSearch = CommonFuncService.clone(this.search);
  public alloctList: Array<Alloct> = [];
  public pageInfo = new PagingBoxObj(1, 0, 10, 0);
  public searchDate = null;

  constructor(private alloctServ: AlloctService) {}

  ngOnInit() {
    this.loadData();
  }

  handleDateChange(date: { beginDate: string; endDate: string }) {
    this.search.dateBegin = date.beginDate;
    this.search.dateEnd = date.endDate;
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

  loadData() {
    return this.alloctServ
      .getAlloctList(this.search, new PageSearch(this.pageInfo.page, this.pageInfo.rows))
      .success((res) => {
        this.oldSearch = CommonFuncService.clone(this.search);
        this.alloctList = res.data.list;
        this.pageInfo.totalRecords = res.data.totalCount;
      });
  }
}
