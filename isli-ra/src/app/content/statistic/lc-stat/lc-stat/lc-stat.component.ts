import { Component, OnInit } from '@angular/core';
import { clickWaitHttp, clickOnce } from 'src/app/core';
import { StatisticService } from 'src/app/service/statistic.service';
import { DATA_TYPE, LcSearchParams, times } from 'src/app/service/model';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';

@Component({
  selector: 'app-lc-stat',
  templateUrl: './lc-stat.component.html',
  styleUrls: [ './lc-stat.component.scss' ]
})
export class LcStatComponent implements OnInit {
  public dataType = DATA_TYPE;
  public lcServiceList: Array<any>;
  public lcSearchParams = new LcSearchParams(times().endTime, null, DATA_TYPE.SERVICE);
  public lcServiceTotal: number;
  public lcTimeList: Array<any>;
  public lcTimeTotal: number;
  public onoff = true;
  public pagingBoxObj = new PagingBoxObj(1, 0, 10, 0);

  constructor(private statisticServ: StatisticService) {
    this.getLcService();
  }

  ngOnInit() {}

  // 获取LC登记者统计 --- 服务
  getLcService() {
    return this.statisticServ
      .getLcService(this.lcSearchParams)
      .success((success) => {
        const data = success && success.data;
        this.lcServiceList = data;
        this.lcServiceTotal =
          data.reduce((total, item) => {
            return (total += Number(item.num));
          }, 0) || 0;
        this.pagingBoxObj.totalRecords = data && data.length;
      })
      .error((error) => {
        this.lcServiceList = [];
        this.pagingBoxObj.totalRecords = 0;
        console.error(error);
      });
  }

  // 获取LC登记者统计 --- 时间
  getLcTime() {
    return this.statisticServ
      .getLcTime(this.lcSearchParams)
      .success((success) => {
        const data = success && success.data;
        this.lcTimeList = data;
        this.lcTimeTotal =
          data.reduce((total, item) => {
            total += Number(item.num);
          }, 0) || 0;
        this.pagingBoxObj.totalRecords = data && data.length;
      })
      .error((error) => {
        this.lcTimeList = [];
        this.pagingBoxObj.totalRecords = 0;
        console.error(error);
      });
  }

  // 通过type类型获取不同数据
  getTpyeGetData() {
    if (this.lcSearchParams.type === this.dataType.SERVICE) {
      this.getLcService();
    } else {
      this.getLcTime();
    }
  }

  // 导出表格
  @clickOnce('handleExportTableClick', 5000)
  handleExportTableClick() {
    if (this.lcSearchParams.type === DATA_TYPE.SERVICE) {
      return this.statisticServ.exportLcService(this.lcSearchParams.endYear);
    } else {
      return this.statisticServ.exportLcTime(this.lcSearchParams.startYear, this.lcSearchParams.endYear);
    }
  }

  // 搜索
  @clickWaitHttp('handleSearchClick')
  handleSearchClick(lcSearchParams: LcSearchParams) {
    this.lcSearchParams = lcSearchParams;
    this.pagingBoxObj.page = 1;
    return this.getTpyeGetData();
  }

  // 展开/收缩
  @clickOnce()
  handleToggleClick() {
    this.onoff = !this.onoff;
  }

  // 切换tab menu
  @clickWaitHttp('handleTypeChange')
  handleTypeChange(lcSearchParams: LcSearchParams) {
    this.onoff = true;
    this.lcSearchParams = lcSearchParams;
    this.pagingBoxObj.page = 1;
    this.pagingBoxObj.totalRecords = 0;
    if (this.lcSearchParams.type === DATA_TYPE.SERVICE) {
      this.lcSearchParams.startYear = times().endTime;
      this.lcSearchParams.endYear = '';
    } else {
      this.lcSearchParams.startYear = times().startTime;
      this.lcSearchParams.endYear = times().endTime;
    }
    return this.getTpyeGetData();
  }
}
