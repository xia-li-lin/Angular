import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonFuncService } from 'src/app/core';
import { HttpClient } from '@angular/common/http';
import * as echarts from 'echarts';
import { MAP_OPTIONS, times, imagedDwnLoadFn } from 'src/app/service/model';

@Component({
  selector: 'app-search-stat-area',
  templateUrl: './search-stat-area.component.html',
  styleUrls: [ './search-stat-area.component.scss' ]
})
export class SearchStatAreaComponent implements OnInit, OnChanges {
  @Input() timeAreaList: Array<any>;

  public echartsIntance: any;
  public optionsData: any;

  constructor(private http: HttpClient, private translateServ: TranslateService) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('timeAreaList' in changes) {
      const timeAreaList = changes.timeAreaList && changes.timeAreaList.currentValue;
      const mapChartData = (timeAreaList || []).map((item) => {
        return {
          name: item.countryEn,
          value: item.num
        };
      });
      this.mapChartRepaintFn(mapChartData, this.translateServ.instant('statistic.checkNumThound'));
    }
  }

  ngOnInit() {}

  handleChartInit(e) {
    this.echartsIntance = e;
  }

  // 导出视图
  handleExportViewClick() {
    const fileName = `Retrieve number-area-${times().fileName}`;
    imagedDwnLoadFn(this.echartsIntance, fileName);
  }

  // 重绘地图
  mapChartRepaintFn(mapChartData: any, mapName: string) {
    this.http.get('assets/json/world.json').subscribe((geoJson) => {
      echarts.registerMap('world', geoJson);
      this.optionsData = CommonFuncService.clone(MAP_OPTIONS);
      this.optionsData.series[0].data = mapChartData;
      this.optionsData.title.text = mapName;
    });
  }
}
