import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonFuncService } from 'src/app/core';
import { BAR_OPTIONS, imagedDwnLoadFn, sortBy, times } from 'src/app/service/model';

@Component({
  selector: 'app-servicecode-stat-sp',
  templateUrl: './servicecode-stat-sp.component.html',
  styleUrls: [ './servicecode-stat-sp.component.scss' ]
})
export class ServicecodeStatSpComponent implements OnInit, OnChanges {
  @Input() serviceCodeList;

  public chartOption: any;
  public echartsIntance: any;

  constructor(private translateServ: TranslateService) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('serviceCodeList' in changes && this.serviceCodeList) {
      const xData = [];
      const yData = [];
      const sortServiceCodeList = this.serviceCodeList.sort(sortBy('total'));
      sortServiceCodeList.forEach((val, index) => {
        if (index < 10) {
          xData.push(val.org_name);
          yData.push(val.total);
        }
      });
      this.drawEcharts(xData, yData, this.translateServ.instant('statistic.serviceRegisterNum'));
    }
  }

  ngOnInit() {}

  drawEcharts(xData: Array<any>, yData: Array<any>, yAxisName: string) {
    this.chartOption = CommonFuncService.clone(BAR_OPTIONS);
    this.chartOption.xAxis[0].data = xData;
    this.chartOption.series[0].data = yData;
    this.chartOption.yAxis[0].name = yAxisName;
    this.chartOption.dataZoom = null;
  }

  handleChartInit(e) {
    this.echartsIntance = e;
  }

  // 导出视图
  handleExportViewClick() {
    const fileName = 'SC code number-SP-' + times().fileName;
    imagedDwnLoadFn(this.echartsIntance, fileName);
  }
}
