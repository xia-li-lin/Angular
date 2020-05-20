import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonFuncService } from 'src/app/core';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';

@Component({
  selector: 'app-analysis-stat-top',
  templateUrl: './analysis-stat-top.component.html',
  styleUrls: [ './analysis-stat-top.component.scss' ]
})
export class AnalysisStatTopComponent implements OnInit, OnChanges {
  @Input() analysisStatList: Array<any>;
  @Input() pagingBoxObj: PagingBoxObj;

  public analysisStatPageList: Array<any>;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if ('analysisStatList' in changes && this.analysisStatList) {
      this.getPageList(this.analysisStatList);
    }
  }

  ngOnInit() {}

  // 切换分页 --- 数据
  getPageList(data) {
    const cloneData = CommonFuncService.clone(data);
    const startIndex = (this.pagingBoxObj.page - 1) * this.pagingBoxObj.rows;
    const endIndex = this.pagingBoxObj.rows;
    this.analysisStatPageList = cloneData.splice(startIndex, endIndex);
  }

  // 点击切换分页
  handlePageChange(pageInfo: PagingBoxObj) {
    this.pagingBoxObj.page = pageInfo.page;
    this.pagingBoxObj.rows = pageInfo.rows;
    this.getPageList(this.analysisStatList);
  }
}
