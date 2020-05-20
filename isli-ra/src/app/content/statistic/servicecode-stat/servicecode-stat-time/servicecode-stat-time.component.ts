import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { clickOnce, CommonFuncService } from 'src/app/core';
import {
  BAR_OPTIONS,
  computedPosition,
  imagedDwnLoadFn,
  times
} from 'src/app/service/model';

@Component({
  selector: 'app-servicecode-stat-time',
  templateUrl: './servicecode-stat-time.component.html',
  styleUrls: [ './servicecode-stat-time.component.scss' ]
})
export class ServicecodeStatTimeComponent implements OnInit, OnChanges {
  @Input() serviceCodeList;

  public chartOption: any;
  public echartsIntance: any;

  constructor(private translateServ: TranslateService) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('serviceCodeList' in changes && this.serviceCodeList) {
      const xData = [];
      const yData = [];
      this.serviceCodeList.forEach((val) => {
        xData.push(val.year);
        yData.push(val.total);
      });
      this.drawEcharts(xData, yData, this.translateServ.instant('statistic.lcRegisterNum'));
    }
  }

  ngOnInit() {}

  drawEcharts(xData: Array<any>, yData: Array<any>, yAxisName: string) {
    this.chartOption = CommonFuncService.clone(BAR_OPTIONS);
    this.chartOption.xAxis[0].data = xData;
    this.chartOption.series[0].data = yData;
    this.chartOption.yAxis[0].name = yAxisName;
    this.chartOption.dataZoom[0].start = computedPosition(xData.length);
  }

  handleChartInit(e) {
    this.echartsIntance = e;
  }

  // 导出视图
  @clickOnce()
  handleExportViewClick() {
    const fileName = 'SC code number-year-' + times().fileName;
    imagedDwnLoadFn(this.echartsIntance, fileName);
  }
}
