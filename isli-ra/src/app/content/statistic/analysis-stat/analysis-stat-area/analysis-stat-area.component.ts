import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as echarts from 'echarts';
import { HttpClient } from '@angular/common/http';
import { CommonFuncService, clickOnce } from 'src/app/core';
import { CHINA_MAP_OPTIONS, MAP_OPTIONS, imagedDwnLoadFn, SEARCH_STATISTIC_SEARCH_TYPE, times } from 'src/app/service';

@Component({
  selector: 'app-analysis-stat-area',
  templateUrl: './analysis-stat-area.component.html',
  styleUrls: [ './analysis-stat-area.component.scss' ]
})
export class AnalysisStatAreaComponent implements OnInit, OnChanges {
  @Input() analysisStatList: Array<any>;
  @Input() dateType: SEARCH_STATISTIC_SEARCH_TYPE;

  public chartInternalOptions: any; // 国内
  public chartInternationalOptions: any; // 国际
  public echartsIntance: any;
  public searchType = SEARCH_STATISTIC_SEARCH_TYPE;

  constructor(private http: HttpClient, private translateServ: TranslateService) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('analysisStatList' in changes && this.analysisStatList) {
      this.getMapChartData(this.analysisStatList);
    }
  }

  getMapChartData(analysisStatList: Array<any>) {
    const mapChartData = analysisStatList.map((val) => ({ name: val.countryEn, value: val.num }));
    // tslint:disable-next-line:triple-equals
    if (this.dateType == SEARCH_STATISTIC_SEARCH_TYPE.AREA) {
      this.mapChartInternationalRepaintFn(
        mapChartData,
        this.translateServ.instant('statistic.isliCodeYAxisMillionName')
      );
    } else {
      this.mapChartInternalRepaintFn(mapChartData, this.translateServ.instant('statistic.isliCodeYAxisName'));
    }
  }

  ngOnInit() {}

  handleChartInit(e) {
    this.echartsIntance = e;
  }

  // 导出视图
  @clickOnce()
  handleExportViewClick() {
    let fileName = '';
    // tslint:disable-next-line: triple-equals
    if (this.dateType == SEARCH_STATISTIC_SEARCH_TYPE.AREA) {
      fileName = `ISLI code parsing quantity-global-${times().fileName}`;
    } else {
      fileName = `ISLI code parsing quantity-china-${times().fileName}`;
    }
    imagedDwnLoadFn(this.echartsIntance, fileName);
  }

  // 重绘世界地图
  mapChartInternationalRepaintFn(mapChartData: any, mapName: string) {
    this.http.get('assets/json/world.json').subscribe((geoJson) => {
      echarts.registerMap('world', geoJson);
      this.chartInternationalOptions = CommonFuncService.clone(MAP_OPTIONS);
      this.chartInternationalOptions.series[0].data = mapChartData;
      this.chartInternationalOptions.title.text = mapName;
    });
  }

  // 重绘中国地图
  mapChartInternalRepaintFn(mapChartData: any, mapName: string) {
    this.chartInternalOptions = CommonFuncService.clone(CHINA_MAP_OPTIONS);
    this.chartInternalOptions.series[0].data = mapChartData;
    this.chartInternalOptions.title.text = mapName;
  }
}
