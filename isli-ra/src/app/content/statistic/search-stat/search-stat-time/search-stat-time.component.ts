import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonFuncService, clickOnce } from 'src/app/core';
import {
  BAR_OPTIONS,
  computedPosition,
  imagedDwnLoadFn,
  SEARCH_STATISTIC_SEARCH_TYPE,
  times
} from 'src/app/service/model';

@Component({
  selector: 'app-search-stat-time',
  templateUrl: './search-stat-time.component.html',
  styleUrls: [ './search-stat-time.component.scss' ]
})
export class SearchStatTimeComponent implements OnInit, OnChanges {
  @Input() dateType: string;
  @Input() timeAreaList: Array<any>;

  public chartOption: any;
  public echartsIntance: any;
  public searchType = SEARCH_STATISTIC_SEARCH_TYPE;
  public type: string;

  constructor(private translateServ: TranslateService) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('timeAreaList' in changes && this.timeAreaList) {
      const xData = [];
      const yData = [];
      this.timeAreaList.forEach((val) => {
        // tslint:disable-next-line:triple-equals
        if (this.dateType == SEARCH_STATISTIC_SEARCH_TYPE.DAY) {
          const arr = val && val.time && val.time.split('-');
          const len = arr && arr.length;
          this.type = 'day';
          xData.push(arr[len - 1]);
          // tslint:disable-next-line:triple-equals
        } else if (this.dateType == SEARCH_STATISTIC_SEARCH_TYPE.YEAR) {
          xData.push(val.time);
          this.type = 'year';
        } else {
          xData.push(val.time);
          this.type = 'month';
        }
        yData.push(val.num);
      });
      this.drawEcharts(xData, yData, this.translateServ.instant('statistic.checkNum'));
    }
  }

  ngOnInit() {}

  drawEcharts(xData: Array<string>, yData: Array<string>, yAxisName: string) {
    this.chartOption = CommonFuncService.clone(BAR_OPTIONS);
    this.chartOption.xAxis[0].data = xData;
    this.chartOption.yAxis[0].name = yAxisName;
    this.chartOption.series[0].data = yData;
    this.chartOption.dataZoom[0].start = computedPosition(xData.length);
  }

  handleChartInit(e) {
    this.echartsIntance = e;
  }

  // 导出视图
  @clickOnce()
  handleExportViewClick() {
    const fileName = `Retrieve number-${this.type}-${times().fileName}`;
    imagedDwnLoadFn(this.echartsIntance, fileName);
  }
}
