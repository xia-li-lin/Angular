import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { CommonFuncService } from 'src/app/core';
import { DATA_TYPE } from 'src/app/service/model';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';

@Component({
  selector: 'app-sp-stat-table',
  templateUrl: './sp-stat-table.component.html',
  styleUrls: [ './sp-stat-table.component.scss' ]
})
export class SpStatTableComponent implements OnInit, OnChanges {
  @Input() pagingBoxObj: PagingBoxObj;
  @Input() spStatistList: Array<any>;
  @Input() spStatistTotal: number;
  @Input() type: string;

  public dataType = DATA_TYPE;
  public lastPageNums: number;
  public spStatistPageList: Array<any>;
  public totalPage: number;
  public totalWidth: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    const totalRecords = this.pagingBoxObj && this.pagingBoxObj.totalRecords;
    if (totalRecords) {
      this.totalPage = Math.ceil(totalRecords / this.pagingBoxObj.rows);
      this.lastPageNums = totalRecords % this.pagingBoxObj.rows;
      this.computedTotalPageWidth();
    }
    if ('spStatistList' in changes && this.spStatistList) {
      this.getPageList(this.spStatistList);
    }
  }

  ngOnInit() {}

  computedTotalPageWidth() {
    if (this.totalPage === this.pagingBoxObj.page && this.lastPageNums !== 0) {
      this.totalWidth = `calc( (100% - 89px) / ${this.pagingBoxObj.rows} * ${this.lastPageNums} )`;
    } else {
      this.totalWidth = `calc( 100% - 89px )`;
    }
    // console.log(this.totalPage, this.lastPageNums);
  }

  // 切换分页 --- 数据
  getPageList(spStatistList) {
    const cloneData = CommonFuncService.clone(spStatistList);
    const startIndex = (this.pagingBoxObj.page - 1) * this.pagingBoxObj.rows;
    const endIndex = this.pagingBoxObj.rows;
    this.spStatistPageList = cloneData.splice(startIndex, endIndex);
  }

  // 点击切换分页
  handlePageChange(pageInfo: PagingBoxObj) {
    this.pagingBoxObj.page = pageInfo.page;
    this.pagingBoxObj.rows = pageInfo.rows;
    this.computedTotalPageWidth();
    this.getPageList(this.spStatistList);
  }
}
