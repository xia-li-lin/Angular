import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'src/app/service/statistic.service';
import { AppState, clickWaitHttp, clickOnce, CommonFuncService } from 'src/app/core';
import { SearchStatisticSearchParams, SEARCH_STATISTIC_SEARCH_TYPE, times } from 'src/app/service';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';

@Component({
  selector: 'app-analysis-stat',
  templateUrl: './analysis-stat.component.html',
  styleUrls: [ './analysis-stat.component.scss' ]
})
export class AnalysisStatComponent implements OnInit {
  public analysisStatList: Array<any>;
  public dateType = SEARCH_STATISTIC_SEARCH_TYPE.YEAR;
  public onoff = true;
  public pagingBoxObj = new PagingBoxObj(1, 0, 10, 0);
  public searchParams = new SearchStatisticSearchParams(
    SEARCH_STATISTIC_SEARCH_TYPE.YEAR,
    times().startTime,
    times().endTime,
    '',
    SEARCH_STATISTIC_SEARCH_TYPE.YEAR
  );
  public searchType = SEARCH_STATISTIC_SEARCH_TYPE;
  public tableTotal: number;

  constructor(private statisticServ: StatisticService, private stateServ: AppState) {}

  ngOnInit() {
    this.getAnalysisStatistic();
  }

  // 解析统计
  getAnalysisStatistic() {
    return this.statisticServ
      .getAnalysisStatistic(this.searchParams)
      .translate(CommonFuncService.formatObjForLangCode(this.stateServ.get('language')))
      .success((success) => {
        const data = (success && success.data) || [];
        this.analysisStatList = data;
        console.log(data);

        this.tableTotal =
          data.reduce((total: number, item: any) => {
            total += item.num;
          }, 0) || 0;
        console.log(this.tableTotal);

        this.pagingBoxObj.totalRecords = data && data.length;
        console.log(data);
      })
      .error((error) => {
        console.error(error);
        this.pagingBoxObj.totalRecords = 0;
      });
  }

  // 导出表格
  @clickOnce('handleExportTableClick', 5000)
  handleExportTableClick() {
    return this.statisticServ.exportAnalysisStatistic(this.searchParams);
  }

  // 搜索
  @clickWaitHttp('handleSearchClick')
  handleSearchClick(searchParams: SearchStatisticSearchParams) {
    this.onoff = true;
    this.pagingBoxObj.page = 1;
    this.searchParams = searchParams;
    return this.getAnalysisStatistic();
  }

  // 搜索 - 年/月/日
  @clickOnce()
  handleSelectButtonChange(searchType: SEARCH_STATISTIC_SEARCH_TYPE) {
    this.pagingBoxObj.page = 1;
    this.pagingBoxObj.totalRecords = 0;
    this.dateType = searchType;
    this.onoff = true;
    switch (searchType) {
      case this.searchType.YEAR:
        this.searchParams.startTime = times().startTime;
        this.searchParams.endTime = times().endTime;
        break;
      case this.searchType.MONTH:
        this.searchParams.startTime = '';
        this.searchParams.endTime = '';
        this.searchParams.time = times().endTime;
        break;
      case this.searchType.DAY:
        this.searchParams.startTime = '';
        this.searchParams.endTime = '';
        this.searchParams.time = times().year + '-' + times().month;
        break;
      default:
        this.searchParams.startTime = '';
        this.searchParams.endTime = '';
        this.searchParams.time = '';
        break;
    }
    return this.getAnalysisStatistic();
  }

  // 展开/收缩
  @clickOnce()
  handleToggleClick() {
    this.onoff = !this.onoff;
  }

  // 切换tab menu
  @clickWaitHttp('handleTypeChange')
  handleTypeChange(searchStatisticSearchParams: SearchStatisticSearchParams) {
    this.onoff = true;
    this.pagingBoxObj.page = 1;
    this.pagingBoxObj.totalRecords = 0;
    this.searchParams = searchStatisticSearchParams;

    switch (this.searchParams.type) {
      case SEARCH_STATISTIC_SEARCH_TYPE.YEAR:
        this.searchParams.searchType = SEARCH_STATISTIC_SEARCH_TYPE.YEAR;
        this.searchParams.startTime = times().startTime;
        this.searchParams.endTime = times().endTime;
        this.searchParams.time = '';
        this.dateType = this.searchType.YEAR;
        break;
      case SEARCH_STATISTIC_SEARCH_TYPE.AREA:
        this.searchParams.searchType = SEARCH_STATISTIC_SEARCH_TYPE.AREA;
        this.searchParams.startTime = '';
        this.searchParams.endTime = '';
        this.searchParams.time = '';
        this.dateType = this.searchType.AREA;
        break;
      case SEARCH_STATISTIC_SEARCH_TYPE.RELATIONTYPE:
        this.searchParams.searchType = SEARCH_STATISTIC_SEARCH_TYPE.RELATIONTYPE;
        this.searchParams.startTime = '';
        this.searchParams.endTime = '';
        this.searchParams.time = '';
        break;
      case SEARCH_STATISTIC_SEARCH_TYPE.TOP100:
        this.searchParams.searchType = SEARCH_STATISTIC_SEARCH_TYPE.TOP100;
        this.searchParams.startTime = '';
        this.searchParams.endTime = '';
        this.searchParams.time = '';
        break;
    }
    return this.getAnalysisStatistic();
  }
}
