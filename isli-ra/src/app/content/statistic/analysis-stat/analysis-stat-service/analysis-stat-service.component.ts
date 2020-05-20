import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { clickOnce, CommonFuncService } from 'src/app/core';
import { BAR_OPTIONS, computedPosition, imagedDwnLoadFn, times } from 'src/app/service/model';

@Component({
  selector: 'app-analysis-stat-service',
  templateUrl: './analysis-stat-service.component.html',
  styleUrls: [ './analysis-stat-service.component.scss' ]
})
export class AnalysisStatServiceComponent implements OnInit, OnChanges {
  @Input() analysisStatList: Array<any>;

  public chartOption: any;
  public echartsIntance: any;

  constructor(private translateServ: TranslateService) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('analysisStatList' in changes && this.analysisStatList) {
      const xData = [];
      const yData = [];
      this.analysisStatList.forEach((val) => {
        xData.push(val.relationType);
        yData.push(val.num);
      });
      this.drawEcharts(xData, yData, this.translateServ.instant('statistic.isliCodeAnalysisNum'));
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
    const fileName = `ISLI code parsing quantity-Association types-${times().fileName}`;
    imagedDwnLoadFn(this.echartsIntance, fileName);
  }
}
