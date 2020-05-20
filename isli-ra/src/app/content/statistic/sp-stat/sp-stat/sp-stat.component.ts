import { Component, OnInit } from '@angular/core';
import { AppState, clickOnce, clickWaitHttp, CommonFuncService } from 'src/app/core';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { StatisticService } from 'src/app/service/statistic.service';
import { DATA_TYPE, SPSearchParams, times } from 'src/app/service/model';

@Component({
  selector: 'app-sp-stat',
  templateUrl: './sp-stat.component.html',
  styleUrls: [ './sp-stat.component.scss' ]
})
export class SpStatComponent implements OnInit {
  public dataType = DATA_TYPE;
  public onoff = true;
  public pagingBoxObj = new PagingBoxObj(1, 0, 10, 0);
  public sPSearchParams = new SPSearchParams(DATA_TYPE.TIME, times().endTime, times().startTime);
  public spStatistList: Array<any>;
  public spStatistTotal: number;

  constructor(private statisticServ: StatisticService, private stateServ: AppState) {}

  ngOnInit() {
    this.getSP();
  }

  // 获取SP统计
  getSP() {
    return this.statisticServ
      .getSP(this.sPSearchParams)
      .translate(CommonFuncService.formatObjForLangCode(this.stateServ.get('language')))
      .success((success) => {
        const data = success && success.data;
        this.spStatistList = data;
        this.pagingBoxObj.totalRecords = data && data.length;
        this.spStatistTotal =
          data.reduce((total, item) => {
            return (total += Number(item.total));
          }, 0) || 0;
      })
      .error((error) => {
        this.spStatistList = [];
        this.pagingBoxObj.totalRecords = 0;
        console.error(error);
      });
  }

  // 切换tab
  @clickWaitHttp('handleTypeChange')
  handleTypeChange(sPSearchParams: SPSearchParams) {
    this.onoff = true;
    this.pagingBoxObj.page = 1;
    this.pagingBoxObj.totalRecords = 0;
    this.sPSearchParams = sPSearchParams;
    if (this.sPSearchParams.dataType === DATA_TYPE.TIME) {
      this.sPSearchParams.startTime = times().startTime;
      this.sPSearchParams.endTime = times().endTime;
    } else {
      this.sPSearchParams.startTime = '';
      this.sPSearchParams.endTime = '';
    }
    return this.getSP();
  }

  // 展开/收缩
  @clickOnce()
  handleToggleClick() {
    this.onoff = !this.onoff;
  }

  // 搜索
  @clickWaitHttp('handleSearchClick')
  handleSearchClick(sPSearchParams: SPSearchParams) {
    this.pagingBoxObj.page = 1;
    this.sPSearchParams = sPSearchParams;

    return this.getSP();
  }

  // 切换分页
  handlePageClick(pageInfo: PagingBoxObj) {
    this.pagingBoxObj.page = pageInfo.page;
    this.pagingBoxObj.rows = pageInfo.rows;

    this.getSP();
  }

  // 导出表格
  @clickOnce('handleExportTableClick', 5000)
  handleExportTableClick() {
    return this.statisticServ.exportSP(this.sPSearchParams);
  }
}
