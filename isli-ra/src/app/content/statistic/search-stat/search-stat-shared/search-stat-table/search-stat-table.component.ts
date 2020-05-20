import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { CommonFuncService } from 'src/app/core';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { SEARCH_STATISTIC_SEARCH_TYPE } from 'src/app/service';

@Component({
  selector: 'app-search-stat-table',
  templateUrl: './search-stat-table.component.html',
  styleUrls: [ './search-stat-table.component.scss' ]
})
export class SearchStatTableComponent implements OnInit, OnChanges {
  @Input() dateType: string;
  @Input() pagingBoxObj: PagingBoxObj;
  @Input() searchStatTableTotal: number;
  @Input() timeAreaList: Array<any>;
  @Input() type: SEARCH_STATISTIC_SEARCH_TYPE;

  public lastPageNums: number;
  public searchType = SEARCH_STATISTIC_SEARCH_TYPE;
  public timeAreaPageList: Array<any>;
  public totalPage: number;
  public totalWidth: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if ('timeAreaList' in changes && this.timeAreaList) {
      this.getPageList(this.timeAreaList);
    }
  }

  ngOnInit() {}

  computedTotalPageWidth() {
    if (this.totalPage === this.pagingBoxObj.page && this.lastPageNums !== 0) {
      this.totalWidth = `calc( (100% - 89px) / ${this.pagingBoxObj.rows} * ${this.lastPageNums} )`;
    } else {
      this.totalWidth = `calc( 100% - 89px )`;
    }
    console.log(this.totalPage, this.lastPageNums);
  }

  // 切换分页 --- 数据
  getPageList(timeAreaList) {
    const cloneData = CommonFuncService.clone(timeAreaList);
    const startIndex = (this.pagingBoxObj.page - 1) * this.pagingBoxObj.rows;
    const endIndex = this.pagingBoxObj.rows;
    this.timeAreaPageList = cloneData.splice(startIndex, endIndex);
    const totalRecords = this.pagingBoxObj && this.pagingBoxObj.totalRecords;
    if (totalRecords) {
      this.totalPage = Math.ceil(totalRecords / this.pagingBoxObj.rows);
      this.lastPageNums = totalRecords % this.pagingBoxObj.rows;
      this.computedTotalPageWidth();
    }
  }

  // 点击切换分页
  handlePageChange(pageInfo: PagingBoxObj) {
    this.pagingBoxObj.page = pageInfo.page;
    this.pagingBoxObj.rows = pageInfo.rows;
    this.getPageList(this.timeAreaList);
  }
}
