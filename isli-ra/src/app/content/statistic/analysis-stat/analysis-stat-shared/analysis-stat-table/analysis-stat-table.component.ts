import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonFuncService } from 'src/app/core';
import { SEARCH_STATISTIC_SEARCH_TYPE } from 'src/app/service/model';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';

@Component({
  selector: 'app-analysis-stat-table',
  templateUrl: './analysis-stat-table.component.html',
  styleUrls: [ './analysis-stat-table.component.scss' ]
})
export class AnalysisStatTableComponent implements OnInit, OnChanges {
  @Input() analysisStatList: Array<any>;
  @Input() dateType: SEARCH_STATISTIC_SEARCH_TYPE;
  @Input() pagingBoxObj: PagingBoxObj;
  @Input() tableTotal: number;
  @Input() type: SEARCH_STATISTIC_SEARCH_TYPE;

  public analysisStatPageList: Array<any>;
  public lastPageNums: number;
  public searchType = SEARCH_STATISTIC_SEARCH_TYPE;
  public totalPage: number;
  public totalWidth: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if ('analysisStatList' in changes && this.analysisStatList) {
      this.getPageList(this.analysisStatList);
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
  getPageList(data) {
    const cloneData = CommonFuncService.clone(data);
    const startIndex = (this.pagingBoxObj.page - 1) * this.pagingBoxObj.rows;
    const endIndex = this.pagingBoxObj.rows;
    this.analysisStatPageList = cloneData.splice(startIndex, endIndex);
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
    this.getPageList(this.analysisStatList);
  }
}
