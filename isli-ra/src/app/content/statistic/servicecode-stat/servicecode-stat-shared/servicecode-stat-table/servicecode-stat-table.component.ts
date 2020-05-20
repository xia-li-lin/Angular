import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { CommonFuncService } from 'src/app/core';
import { DATA_TYPE } from 'src/app/service/model';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';

@Component({
  selector: 'app-servicecode-stat-table',
  templateUrl: './servicecode-stat-table.component.html',
  styleUrls: [ './servicecode-stat-table.component.scss' ]
})
export class ServicecodeStatTableComponent implements OnInit, OnChanges {
  @Input() pagingBoxObj: PagingBoxObj;
  @Input() serviceCodeTotal: number;
  @Input() serviceCodeList: Array<any>;
  @Input() type: string;

  public dataType = DATA_TYPE;
  public lastPageNums: number;
  public serviceCodePageList: Array<any>;
  public totalPage: number;
  public totalWidth: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    const totalRecords = this.pagingBoxObj && this.pagingBoxObj.totalRecords;
    if ('serviceCodeList' in changes && this.serviceCodeList) {
      this.getPageListData(this.serviceCodeList);
    }
    if (totalRecords) {
      this.totalPage = Math.ceil(totalRecords / this.pagingBoxObj.rows);
      this.lastPageNums = totalRecords % this.pagingBoxObj.rows;
      this.computedTotalPageWidth();
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
  getPageListData(serviceCodeList: Array<any>) {
    const cloneData = CommonFuncService.clone(serviceCodeList);
    const startIndex = (this.pagingBoxObj.page - 1) * this.pagingBoxObj.rows;
    const endIndex = this.pagingBoxObj.rows;
    this.serviceCodePageList = cloneData.splice(startIndex, endIndex);
  }

  // 点击切换分页
  handlePageChange(pageInfo: PagingBoxObj) {
    this.pagingBoxObj.page = pageInfo.page;
    this.pagingBoxObj.rows = pageInfo.rows;
    this.computedTotalPageWidth();
    this.getPageListData(this.serviceCodeList);
  }
}
