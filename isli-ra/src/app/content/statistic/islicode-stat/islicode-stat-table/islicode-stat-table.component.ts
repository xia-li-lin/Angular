import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonFuncService } from 'src/app/core';
import { DATE_SELECTION, IsliCodeStatistic } from 'src/app/service/model';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';

@Component({
  selector: 'app-islicode-stat-table',
  templateUrl: './islicode-stat-table.component.html',
  styleUrls: [ './islicode-stat-table.component.scss' ]
})
export class IslicodeStatTableComponent implements OnInit, OnChanges {
  @Input() isliCodeNumberTotal: number;
  @Input() isliCodeStatistic: Array<IsliCodeStatistic>;
  @Input() pagingBoxObj: PagingBoxObj;
  @Input() type: string;

  public exactDate = DATE_SELECTION;
  public isliCodePageStatistic: Array<IsliCodeStatistic>;
  public lastPageNums: number;
  public totalPage: number;
  public totalWidth: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if ('isliCodeStatistic' in changes && this.isliCodeStatistic) {
      this.getPageListData(this.isliCodeStatistic);
    }
    const totalRecords = this.pagingBoxObj && this.pagingBoxObj.totalRecords;
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
    // console.log(this.totalPage, this.lastPageNums);
  }

  // 分页 --- 数据
  getPageListData(isliCodeStatistic: Array<IsliCodeStatistic>) {
    const cloneData = CommonFuncService.clone(isliCodeStatistic);
    const startIndex = (this.pagingBoxObj.page - 1) * this.pagingBoxObj.rows;
    const endIndex = this.pagingBoxObj.rows;
    this.isliCodePageStatistic = cloneData.splice(startIndex, endIndex);
  }

  // 点击切换分页
  handlePageChange(pageInfo: PagingBoxObj) {
    this.pagingBoxObj.page = pageInfo.page;
    this.pagingBoxObj.rows = pageInfo.rows;
    this.getPageListData(this.isliCodeStatistic);
    this.computedTotalPageWidth();
  }
}
