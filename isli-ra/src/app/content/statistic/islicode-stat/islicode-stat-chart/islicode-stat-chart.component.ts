import { Component, Input, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { clickOnce, CommonFuncService } from 'src/app/core';
import {
  BAR_OPTIONS,
  computedPosition,
  DATE_SELECTION,
  imagedDwnLoadFn,
  IsliCodeStatistic,
  times
} from 'src/app/service/model';

@Component({
  selector: 'app-islicode-stat-chart',
  templateUrl: './islicode-stat-chart.component.html',
  styleUrls: [ './islicode-stat-chart.component.scss' ]
})
export class IslicodeStatChartComponent implements OnInit, OnChanges {
  @Input() isliCodeStatistic: Array<IsliCodeStatistic>;
  @Input() type: string;

  public chartOption: any;
  public dateType: string;
  public echartsIntance: any;
  public exactDate = DATE_SELECTION;

  constructor(private translateServ: TranslateService) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('isliCodeStatistic' in changes && this.isliCodeStatistic) {
      this.getEchartData(this.isliCodeStatistic);
    }
  }

  ngOnInit() {}

  drawEcharts(xData: Array<any>, yData: Array<any>, yAxisName: string) {
    console.log(xData);
    this.chartOption = CommonFuncService.clone(BAR_OPTIONS);
    this.chartOption.xAxis[0].data = xData;
    this.chartOption.yAxis[0].name = yAxisName;
    this.chartOption.series[0].data = yData;
    this.chartOption.dataZoom[0].start = computedPosition(xData.length);
  }

  // 获取echart数据
  getEchartData(isliCodeStatistic: Array<IsliCodeStatistic>) {
    const xData = [];
    const yData = [];
    let yAxisName = '';
    isliCodeStatistic.forEach((val) => {
      switch (this.type) {
        case this.exactDate.YEAR:
          xData.push(val.year);
          yData.push(Number(val.num) / 1000);
          yAxisName = this.translateServ.instant('statistic.isliCodeYAxisName');
          this.dateType = 'year';
          break;
        case this.exactDate.MONTH:
          xData.push(val.year + '-' + val.month);
          yData.push(val.num);
          yAxisName = this.translateServ.instant('statistic.isliCodeNum');
          this.dateType = 'month';
          break;
        default:
          xData.push(val.day);
          yData.push(val.num);
          yAxisName = this.translateServ.instant('statistic.isliCodeNum');
          this.dateType = 'day';
          break;
      }
    });
    this.drawEcharts(xData, yData, yAxisName);
  }

  handleChartInit(echarts) {
    // console.log(echarts);
    this.echartsIntance = echarts;
  }

  // 导出视图
  @clickOnce()
  handleExportViewClick() {
    const fileName = 'ISLI code number-' + this.dateType + '-' + times().fileName;
    imagedDwnLoadFn(this.echartsIntance, fileName);
  }
}
