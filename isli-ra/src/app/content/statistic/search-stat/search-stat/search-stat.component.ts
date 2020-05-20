import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'src/app/service/statistic.service';
import { AppState, clickWaitHttp, clickOnce, CommonFuncService } from 'src/app/core';
import { SearchStatisticSearchParams, SEARCH_STATISTIC_SEARCH_TYPE, times } from 'src/app/service';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';

@Component({
  selector: 'app-search-stat',
  templateUrl: './search-stat.component.html',
  styleUrls: [ './search-stat.component.scss' ]
})
export class SearchStatComponent implements OnInit {
  public dateType = SEARCH_STATISTIC_SEARCH_TYPE.YEAR;
  public onoff = true;
  public pagingBoxObj = new PagingBoxObj(1, 0, 10, 0);
  public searchStatisticSearchParams = new SearchStatisticSearchParams(
    SEARCH_STATISTIC_SEARCH_TYPE.YEAR,
    times().startTime,
    times().endTime,
    '',
    SEARCH_STATISTIC_SEARCH_TYPE.YEAR
  );
  public searchStatisticSearchType = SEARCH_STATISTIC_SEARCH_TYPE;
  public searchStatTableTotal: number;
  public timeAreaList: Array<any>;
  public topList: Array<any>;

  constructor(private statisticServ: StatisticService, private stateServ: AppState) {}

  ngOnInit() {
    this.getSearchStatisticTimeArea();
  }

  // 检索统计 - 时间/地区
  getSearchStatisticTimeArea() {
    return this.statisticServ
      .getSearchStatisticTimeArea(this.searchStatisticSearchParams)
      .translate(CommonFuncService.formatObjForLangCode(this.stateServ.get('language')))
      .success((success) => {
        const data = success && success.data;
        this.timeAreaList = data;
        this.searchStatTableTotal =
          data.reduce((total, item) => {
            return (total += item.num);
          }, 0) || 0;
        this.pagingBoxObj.totalRecords = data && data.length;
      })
      .error((error) => {
        console.error(error);
        this.timeAreaList = [];
        this.searchStatTableTotal = 0;
        this.pagingBoxObj.totalRecords = 0;
      });
  }

  // 检索统计 - Top10
  getSearchStatisticTop10() {
    return this.statisticServ
      .getSearchStatisticTop10()
      .success((success) => {
        const data = success && success.data;
        this.topList = data;
        this.searchStatTableTotal =
          data.reduce((total, item) => {
            return (total += item.num);
          }, 0) || 0;
        this.pagingBoxObj.totalRecords = data && data.length;
        console.log(data);
      })
      .error((error) => {
        console.error(error);
        this.topList = [];
        this.searchStatTableTotal = 0;
        this.pagingBoxObj.totalRecords = 0;
      });
  }

  // 导出表格
  @clickOnce('handleExportTableClick', 5000)
  handleExportTableClick(type?: string) {
    if (type === 'top10') {
      return this.statisticServ.exportSearchStatisticTop10();
    } else {
      return this.statisticServ.exportSearchStatisticTimeArea(this.searchStatisticSearchParams);
    }
  }

  // 搜索
  @clickWaitHttp('handleSearchClick')
  handleSearchClick(searchStatisticSearchParams: SearchStatisticSearchParams) {
    this.searchStatisticSearchParams = searchStatisticSearchParams;
    return this.getSearchStatisticTimeArea();
  }

  // 搜索 - 年/月/日
  @clickOnce()
  handleSelectButtonChange(searchType: SEARCH_STATISTIC_SEARCH_TYPE) {
    this.dateType = searchType;
    this.onoff = true;
    this.pagingBoxObj.page = 1;
    this.pagingBoxObj.totalRecords = 0;
    switch (searchType) {
      case this.searchStatisticSearchType.YEAR:
        this.searchStatisticSearchParams.startTime = times().startTime;
        this.searchStatisticSearchParams.endTime = times().endTime;
        break;
      case this.searchStatisticSearchType.MONTH:
        this.searchStatisticSearchParams.startTime = '';
        this.searchStatisticSearchParams.endTime = '';
        this.searchStatisticSearchParams.time = times().endTime;
        break;
      default:
        this.searchStatisticSearchParams.startTime = '';
        this.searchStatisticSearchParams.endTime = '';
        this.searchStatisticSearchParams.time = times().year + '-' + times().month;
        break;
    }
    return this.getSearchStatisticTimeArea();
  }

  // 展开/收缩
  @clickOnce()
  handleToggleClick() {
    this.onoff = !this.onoff;
  }

  // 切换类型筛选
  @clickWaitHttp('handleTypeChange')
  handleTypeChange(type: SEARCH_STATISTIC_SEARCH_TYPE) {
    this.onoff = true;
    this.pagingBoxObj.page = 1;
    this.pagingBoxObj.totalRecords = 0;
    this.searchStatisticSearchParams.type = type;
    switch (type) {
      case SEARCH_STATISTIC_SEARCH_TYPE.YEAR:
        this.searchStatisticSearchParams.searchType = SEARCH_STATISTIC_SEARCH_TYPE.YEAR;
        this.searchStatisticSearchParams.startTime = times().startTime;
        this.searchStatisticSearchParams.endTime = times().endTime;
        this.searchStatisticSearchParams.time = '';
        return this.getSearchStatisticTimeArea();
      case SEARCH_STATISTIC_SEARCH_TYPE.AREA:
        this.searchStatisticSearchParams.searchType = SEARCH_STATISTIC_SEARCH_TYPE.AREA;
        this.searchStatisticSearchParams.startTime = '';
        this.searchStatisticSearchParams.endTime = '';
        this.searchStatisticSearchParams.time = '';
        return this.getSearchStatisticTimeArea();
      case SEARCH_STATISTIC_SEARCH_TYPE.TOP10:
        this.searchStatisticSearchParams.startTime = '';
        this.searchStatisticSearchParams.endTime = '';
        this.searchStatisticSearchParams.time = '';
        return this.getSearchStatisticTop10();
    }
  }
}
