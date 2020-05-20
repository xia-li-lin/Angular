import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { clickOnce, CommonFuncService } from 'src/app/core';
import { BAR_OPTIONS, imagedDwnLoadFn, times } from 'src/app/service/model';

@Component({
  selector: 'app-sp-stat-time',
  templateUrl: './sp-stat-time.component.html',
  styleUrls: [ './sp-stat-time.component.scss' ]
})
export class SpStatTimeComponent implements OnInit, OnChanges {
  @Input() spStatistList: Array<any>;

  public chartOption: any;
  public echartsIntance: any;

  constructor(private translateServ: TranslateService) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('spStatistList' in changes && this.spStatistList) {
      const xData = [];
      const yData = [];
      this.spStatistList.forEach((val, index) => {
        if (index < 10) {
          xData.push(val.year);
          yData.push(val.total);
        }
      });
      this.drawEcharts(xData, yData, this.translateServ.instant('statistic.spUserNum'));
    }
  }

  ngOnInit() {}

  drawEcharts(xData: Array<any>, yData: Array<any>, yAxisName: string) {
    this.chartOption = CommonFuncService.clone(BAR_OPTIONS);
    this.chartOption.xAxis[0].data = xData;
    this.chartOption.yAxis[0].name = yAxisName;
    this.chartOption.series[0].data = yData;
    this.chartOption.dataZoom = null;
  }

  handleChartInit(e) {
    this.echartsIntance = e;
  }

  // 导出视图
  @clickOnce()
  handleExportViewClick() {
    const fileName = `number-year-${times().fileName}`;
    imagedDwnLoadFn(this.echartsIntance, fileName);
  }
}
