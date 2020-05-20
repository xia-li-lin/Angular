import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as echarts from 'echarts';
import { TranslateService } from '@ngx-translate/core';
import { clickOnce, CommonFuncService } from 'src/app/core';
import { imagedDwnLoadFn, MAP_OPTIONS, times } from 'src/app/service/model';

@Component({
  selector: 'app-servicecode-stat-area',
  templateUrl: './servicecode-stat-area.component.html',
  styleUrls: [ './servicecode-stat-area.component.scss' ]
})
export class ServicecodeStatAreaComponent implements OnInit, OnChanges {
  @Input() serviceCodeList: Array<any>;

  public echartsIntance: any;
  public optionsData: any;

  constructor(private http: HttpClient, private translateServ: TranslateService) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('serviceCodeList' in changes && this.serviceCodeList) {
      const mapChartData = (this.serviceCodeList || []).map((item) => {
        return {
          name: item.area_desc_en,
          value: item.total
        };
      });
      this.mapChartRepaintFn(mapChartData, this.translateServ.instant('statistic.serviceRegisterNum'));
    }
  }

  ngOnInit() {}

  // 重绘地图
  mapChartRepaintFn(mapChartData: any, mapName: string) {
    this.http.get('assets/json/world.json').subscribe((geoJson) => {
      echarts.registerMap('world', geoJson);
      this.optionsData = CommonFuncService.clone(MAP_OPTIONS);
      this.optionsData.series[0].data = mapChartData;
      this.optionsData.title.text = mapName;
    });
  }

  handleChartInit(echart) {
    this.echartsIntance = echart;
  }

  // 导出视图
  @clickOnce()
  handleExportViewClick() {
    const fileName = 'SC code number-area-' + times().fileName;
    imagedDwnLoadFn(this.echartsIntance, fileName);
  }
}
