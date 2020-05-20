import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonFuncService } from 'src/app/core';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';

@Component({
  selector: 'app-search-stat-top',
  templateUrl: './search-stat-top.component.html',
  styleUrls: [ './search-stat-top.component.scss' ]
})
export class SearchStatTopComponent implements OnInit, OnChanges {
  @Input() topList: Array<any>;
  @Input() pagingBoxObj: PagingBoxObj;

  public topPageList: Array<any>;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if ('topList' in changes && this.topList) {
      this.getPageList(this.topList);
    }
  }

  ngOnInit() {}

  // 切换分页 --- 数据
  getPageList(topList) {
    const cloneData = CommonFuncService.clone(topList);
    const startIndex = (this.pagingBoxObj.page - 1) * this.pagingBoxObj.rows;
    const endIndex = this.pagingBoxObj.rows;
    this.topPageList = cloneData.splice(startIndex, endIndex);
  }

  // 点击切换分页
  handlePageChange(pageInfo: PagingBoxObj) {
    this.pagingBoxObj.page = pageInfo.page;
    this.pagingBoxObj.rows = pageInfo.rows;
    this.getPageList(this.topList);
  }
}
