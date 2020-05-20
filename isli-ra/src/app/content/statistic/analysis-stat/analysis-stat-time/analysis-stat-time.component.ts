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
  selector: 'app-analysis-stat-time',
  templateUrl: './analysis-stat-time.component.html',
  styleUrls: [ './analysis-stat-time.component.scss' ]
})
export class AnalysisStatTimeComponent implements OnInit, OnChanges {
  @Input() analysisStatList: Array<any>;
  @Input() dateType: string;

  public chartOption: any;
  public echartsIntance: any;
  public searchType = SEARCH_STATISTIC_SEARCH_TYPE;
  public type: string;

  constructor(private translateServ: TranslateService) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('analysisStatList' in changes && this.analysisStatList) {
      const xData = [];
      const yData = [];
      let yAxisName = '';
      this.analysisStatList.forEach((val) => {
        // tslint:disable-next-line:triple-equals
        if (this.dateType == SEARCH_STATISTIC_SEARCH_TYPE.YEAR) {
          xData.push(val.time);
          this.type = 'year';
          yAxisName = this.translateServ.instant('statistic.isliCodeYAxisName');
          // tslint:disable-next-line:triple-equals
        } else if (this.dateType == SEARCH_STATISTIC_SEARCH_TYPE.MONTH) {
          xData.push(val.time);
          this.type = 'month';
          yAxisName = this.translateServ.instant('statistic.isliCodeAnalysisNum');
          // tslint:disable-next-line:triple-equals
        } else if (this.dateType == SEARCH_STATISTIC_SEARCH_TYPE.DAY) {
          const arr = val && val.time && val.time.split('-');
          const len = arr && arr.length;
          xData.push(arr[len - 1]);
          this.type = 'day';
          yAxisName = this.translateServ.instant('statistic.isliCodeAnalysisNum');
        }
        yData.push(val.num ? val.num / 1000 : val.num);
      });
      this.drawEcharts(xData, yData, yAxisName);
    }
  }

  ngOnInit() {}

  drawEcharts(xData: Array<any>, yData: Array<any>, yAxisName: string) {
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
    const fileName = `ISLI code parsing quantity-${this.type}-${times().fileName}`;
    imagedDwnLoadFn(this.echartsIntance, fileName);
  }
}
