import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DATA_TYPE, imagedDwnLoadFn, MAP_OPTIONS, times } from 'src/app/service/model';
import { clickOnce, CommonFuncService } from 'src/app/core';
import { HttpClient } from '@angular/common/http';
import * as echarts from 'echarts';

@Component({
  selector: 'app-sp-stat-area',
  templateUrl: './sp-stat-area.component.html',
  styleUrls: [ './sp-stat-area.component.scss' ]
})
export class SpStatAreaComponent implements OnInit, OnChanges {
  @Input() dataType: DATA_TYPE;
  @Input() spStatistList: Array<any>;

  public optionsData: any;
  public echartsIntance: any;

  constructor(private http: HttpClient, private translateServ: TranslateService) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('spStatistList' in changes && this.spStatistList) {
      const mapChartData = (this.spStatistList || []).map((item) => {
        return { name: item.area_desc_en, value: item.total };
      });
      this.mapChartRepaintFn(mapChartData, this.translateServ.instant('statistic.spUserNum'));
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

  handleChartInit(e) {
    this.echartsIntance = e;
  }

  // 导出视图
  @clickOnce()
  handleExportViewClick() {
    const fileName = `SP number-area-${times().fileName}`;
    imagedDwnLoadFn(this.echartsIntance, fileName);
  }
}
