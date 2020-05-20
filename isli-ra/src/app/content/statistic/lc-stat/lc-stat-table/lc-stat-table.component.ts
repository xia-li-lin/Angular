import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonFuncService } from 'src/app/core';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { DATA_TYPE } from 'src/app/service/model';

@Component({
  selector: 'app-lc-stat-table',
  templateUrl: './lc-stat-table.component.html',
  styleUrls: [ './lc-stat-table.component.scss' ]
})
export class LcStatTableComponent implements OnInit, OnChanges {
  @Input() lcList: Array<any>;
  @Input() lcTotal: number;
  @Input() pagingBoxObj: PagingBoxObj;
  @Input() type: string;

  public dataType = DATA_TYPE;
  public lastPageNums: number;
  public lcPageList: Array<any>;
  public totalPage: number;
  public totalWidth: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if ('lcList' in changes && this.lcList) {
      this.getLcPageList(this.lcList);
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
  getLcPageList(data) {
    const cloneData = CommonFuncService.clone(data);
    const startIndex = (this.pagingBoxObj.page - 1) * this.pagingBoxObj.rows;
    const endIndex = this.pagingBoxObj.rows;
    this.lcPageList = cloneData.splice(startIndex, endIndex);
    this.pagingBoxObj.totalRecords = this.lcList && this.lcList.length;

    if (this.pagingBoxObj.totalRecords) {
      this.totalPage = Math.ceil(this.pagingBoxObj.totalRecords / this.pagingBoxObj.rows);
      this.lastPageNums = this.pagingBoxObj.totalRecords % this.pagingBoxObj.rows;
      this.computedTotalPageWidth();
    }
  }

  // 点击切换分页
  handlePageChange(pageInfo: PagingBoxObj) {
    this.pagingBoxObj.page = pageInfo.page;
    this.pagingBoxObj.rows = pageInfo.rows;
    this.getLcPageList(this.lcList);
  }
}
