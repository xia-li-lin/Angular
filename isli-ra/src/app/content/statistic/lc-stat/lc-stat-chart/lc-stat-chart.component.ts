import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonFuncService } from 'src/app/core';
import { BAR_OPTIONS, computedPosition, DATA_TYPE, imagedDwnLoadFn, sortBy, times } from 'src/app/service/model';

@Component({
  selector: 'app-lc-stat-chart',
  templateUrl: './lc-stat-chart.component.html',
  styleUrls: [ './lc-stat-chart.component.scss' ]
})
export class LcStatChartComponent implements OnInit, OnChanges {
  @Input() type: string;
  @Input() lcTimeList: Array<any>;
  @Input() lcServiceList: Array<any>;

  public chartOption: any;
  public echartsIntance: any;
  public text = '';

  constructor(private translateService: TranslateService) {}

  ngOnChanges(changes: SimpleChanges) {
    const xData = [];
    const yData = [];
    const lcTimeList = changes && changes.lcTimeList && changes.lcTimeList.currentValue;
    const lcServiceList = changes && changes.lcServiceList && changes.lcServiceList.currentValue;

    if (lcServiceList) {
      console.log(lcServiceList);

      const sortLcServiceList = lcServiceList.sort(sortBy('num'));
      sortLcServiceList.forEach((val, index) => {
        if (index < 10) {
          xData.push(val.publisherType);
          yData.push(val.num);
        }
      });
      this.text = 'Association types';
    } else if (lcTimeList) {
      lcTimeList.forEach((val) => {
        xData.push(val.year);
        yData.push(val.num);
      });
      this.text = 'year';
    }
    this.drawEcharts(xData, yData, this.translateService.instant('statistic.lcRegisterNum'));
  }

  ngOnInit() {}

  drawEcharts(xData, yData, yAxisName) {
    this.chartOption = CommonFuncService.clone(BAR_OPTIONS);
    this.chartOption.xAxis[0].data = xData;
    this.chartOption.yAxis[0].name = yAxisName;
    this.chartOption.series[0].data = yData;
    this.chartOption.dataZoom[0].start = computedPosition(xData.length);

    // tslint:disable-next-line:triple-equals
    if (this.type == DATA_TYPE.SERVICE) {
      this.chartOption.dataZoom = null;
    }
  }

  handleChartInit(e) {
    this.echartsIntance = e;
  }

  // 导出视图
  handleExportViewClick() {
    const fileName = `LC user number-${this.text}-${times().fileName}`;
    imagedDwnLoadFn(this.echartsIntance, fileName);
  }
}
