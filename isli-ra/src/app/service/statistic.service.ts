import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { TranslateService } from '@ngx-translate/core';
import { AppState, HttpJson, HttpResponse } from 'src/app/core';
import {
  IsliCodeStatistic,
  LcSearchParams,
  SearchParams,
  ServiceCodeSearchParams,
  SearchStatisticSearchParams,
  SPSearchParams
} from './model';

const HTTP_GET_ISLI_CODE_TOTAL = '/isli/irms/manage-statistics/base/statisticsLcCode/getStatisticsLcCodeTypeList';
const HTTP_GET_SP_USER_LIST = '/isli/irms/manage-statistics/base/statisticsLcCode/getSPuserList';
const HTTP_GET_ISLI_CODE_STATISTIC = '/isli/irms/manage-statistics/base/statisticsLcCode/getStatisticsLcCodeList';
const HTTP_GET_SERVICE_CODE_SP = '/isli/irms/manage-statistics/base/statisticsServiceCode/statisticsServiceCodeList';
const HTTP_GET_SP = '/isli/irms/manage-statistics/base/statisticsSpInfo/statisticsSpInfoList';
const HTTP_GET_LC_SERVICE = '/isli/irms/manage-statistics/base/statisticsuser/getStatisticsUserTypeList';
const HTTP_GET_LC_TIME = '/isli/irms/manage-statistics/base/statisticsuser/getStatisticsUserStaList';
const HTTP_SEARCH_STATISTIC_TIME_AREA = '/isli/irms/manage-statistics/base/keyword/queryKeywordCount';
const HTTP_GET_SEARCH_STATISTIC_TOP = '/isli/irms/manage-statistics/base/keyword/top10';
const HTTP_GET_ANALYSIS_STAISTIC = '/isli/irms/manage-statistics/base/statisticsparseLcCode/queryStatisticsParseLcCode';
const HTTP_GET_ISLI_CODE_EXCEL_EXPORT = '/isli/irms/manage-statistics/base/statisticsLcCode/exportStatisticsLcCodeList';
const HTTP_GET_ISLI_CODE_TYPE_EXCEL_EXPORT =
  '/isli/irms/manage-statistics/base/statisticsLcCode/exportStatisticsLcCodeTypeListt';
const HTTP_GET_SERVICE_CODE_EXCEL_EXPORT =
  '/isli/irms/manage-statistics/base/statisticsServiceCode/exportStatisticsServiceCodeList';
const HTTP_GET_SP_EXCEL_EXPORT = '/isli/irms/manage-statistics/base/statisticsSpInfo/exportStatisticsSpInfoList';
const HTTP_GET_LC_SERVICE_EXCEL_EXPORT =
  '/isli/irms/manage-statistics/base/statisticsuser/exportStatisticsUserTypeList';
const HTTP_GET_LC_TIME_EXCEL_EXPORT = '/isli/irms/manage-statistics/base/statisticsuser/exportStatisticsUserStaList';
const HTTP_GET_GET_SEARCH_STATISTIC_TIME_AREA_EXPORT = '/isli/irms/manage-statistics/base/keyword/exportKeywordCount';
const HTTP_GET_SEARCH_STATISTIC_TOP_EXCEL_EXPORT = '/isli/irms/manage-statistics/base/keyword/exportTop10';
const HTTP_GET_ANALYSIS_STAISTIC_EXCEL_EXPORT =
  '/isli/irms/manage-statistics/base/statisticsparseLcCode/exportParseLcCodeCount';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  constructor(private http: HttpJson, private stateServ: AppState, private translateServ: TranslateService) {}

  // 获取ISLI编码总量
  getIsliCodeTotal() {
    return this.http.get(HTTP_GET_ISLI_CODE_TOTAL);
  }

  // 获取sp用户
  getSpUserList() {
    return this.http.get(HTTP_GET_SP_USER_LIST).translate((res) => {
      return [ { label: this.translateServ.instant('statistic.common.all'), value: '0' } ].concat(
        (res || []).map((item) => {
          return {
            label: item.serviceProvider,
            value: item.serviceProviderId
          };
        })
      );
    });
  }

  /**
   * 获取ISLI编码统计--按时间分割
   * @param prm 结束时间
   * @param provider 選擇SP用戶Id
   * @param startYear 开始时间
   * @param type 年 1;月 2;日 3
   */
  getIsliCodeStatistic(searchParams: SearchParams): HttpResponse<Array<IsliCodeStatistic>> {
    const prm = searchParams && searchParams.prm;
    const provider = searchParams && searchParams.provider;
    const startYear = searchParams && searchParams.startYear;
    const type = searchParams && searchParams.type;
    return this.http.get(HTTP_GET_ISLI_CODE_STATISTIC, null, Object.assign({}, { prm, provider, startYear, type }));
  }

  /**
   * ISLI编码统计--时间excel导出
   *
   */
  exportIsliCodeStatistic(searchParams: SearchParams) {
    const langCode = this.stateServ.get('language') || 'ZH_TW';
    saveAs(
      HTTP_GET_ISLI_CODE_EXCEL_EXPORT +
        '?' +
        this.http.formatParams(Object.assign({}, searchParams, { langCode, selectedLanguage: langCode })).toString()
    );
  }

  exportIsliCodeStatisticType() {
    const langCode = this.stateServ.get('language') || 'ZH_TW';
    saveAs(
      HTTP_GET_ISLI_CODE_TYPE_EXCEL_EXPORT +
        '?' +
        this.http.formatParams(Object.assign({}, { langCode, selectedLanguage: langCode })).toString()
    );
  }

  /**
   * 服务登记统计
   */
  getServiceCode(serviceCodeSearchParams: ServiceCodeSearchParams) {
    return this.http.get(HTTP_GET_SERVICE_CODE_SP, null, Object.assign({}, serviceCodeSearchParams));
  }

  /**
   * 服务登记导出
   * @param serviceCodeSearchParams 搜索，请求参数
   */
  exportServiceCode(serviceCodeSearchParams: ServiceCodeSearchParams) {
    const langCode = this.stateServ.get('language') || 'ZH_TW';
    saveAs(
      HTTP_GET_SERVICE_CODE_EXCEL_EXPORT +
        '?' +
        this.http
          .formatParams(Object.assign({}, serviceCodeSearchParams, { langCode, selectedLanguage: langCode }))
          .toString()
    );
  }

  /**
   * SP统计
   */
  getSP(sPSearchParams: SPSearchParams) {
    return this.http.get(HTTP_GET_SP, null, sPSearchParams);
  }

  exportSP(sPSearchParams: SPSearchParams) {
    const langCode = this.stateServ.get('language') || 'ZH_TW';
    saveAs(
      HTTP_GET_SP_EXCEL_EXPORT +
        '?' +
        this.http.formatParams(Object.assign({}, sPSearchParams, { langCode, selectedLanguage: langCode })).toString()
    );
  }

  /**
   * LC登记者统计 --- 服务
   * @param lcSearchParams 搜索，请求参数
   */
  getLcService(lcSearchParams: LcSearchParams) {
    const startYear = lcSearchParams && lcSearchParams.startYear;
    return this.http.get(HTTP_GET_LC_SERVICE, null, { startYear });
  }

  /**
   * LC登记者统计导出 --- 服务
   * @param lcSearchParams 搜索，请求参数
   */
  exportLcService(startYear: string) {
    const langCode = this.stateServ.get('language') || 'ZH_TW';
    saveAs(
      HTTP_GET_LC_SERVICE_EXCEL_EXPORT +
        '?' +
        this.http.formatParams(Object.assign({}, { startYear }, { langCode, selectedLanguage: langCode })).toString()
    );
  }

  /**
   * LC登记者统计 --- 时间
   * @param lcSearchParams 搜索，请求参数
   */
  getLcTime(lcSearchParams: LcSearchParams) {
    const startYear = lcSearchParams && lcSearchParams.startYear;
    const endYear = lcSearchParams && lcSearchParams.endYear;
    return this.http.get(HTTP_GET_LC_TIME, null, { startYear, endYear });
  }

  /**
   * LC登记者统计 --- 时间
   * @param lcSearchParams 搜索，请求参数
   */
  exportLcTime(startYear: string, endYear: string) {
    const langCode = this.stateServ.get('language') || 'ZH_TW';
    saveAs(
      HTTP_GET_LC_TIME_EXCEL_EXPORT +
        '?' +
        this.http
          .formatParams(Object.assign({}, { startYear, endYear }, { langCode, selectedLanguage: langCode }))
          .toString()
    );
  }

  /**
   * 检索统计时间，地区
   * @param searchStatisticSearchParams 搜索，请求参数
   */
  getSearchStatisticTimeArea(searchStatisticSearchParams: SearchStatisticSearchParams) {
    return this.http.get(HTTP_SEARCH_STATISTIC_TIME_AREA, null, searchStatisticSearchParams);
  }

  exportSearchStatisticTimeArea(searchStatisticSearchParams: SearchStatisticSearchParams) {
    const langCode = this.stateServ.get('language') || 'ZH_TW';
    saveAs(
      HTTP_GET_GET_SEARCH_STATISTIC_TIME_AREA_EXPORT +
        '?' +
        this.http
          .formatParams(Object.assign({}, searchStatisticSearchParams, { langCode, selectedLanguage: langCode }))
          .toString()
    );
  }

  /**
   * 检索统计 - 地区
   */
  getSearchStatisticTop10() {
    return this.http.get(HTTP_GET_SEARCH_STATISTIC_TOP, null, { searchType: 'top' });
  }

  exportSearchStatisticTop10() {
    const langCode = this.stateServ.get('language') || 'ZH_TW';
    saveAs(
      HTTP_GET_SEARCH_STATISTIC_TOP_EXCEL_EXPORT +
        '?' +
        this.http.formatParams(Object.assign({}, { langCode, selectedLanguage: langCode })).toString()
    );
  }

  /**
   * 解析统计
   * @param searchStatisticSearchParams 搜索，请求参数
   */
  getAnalysisStatistic(searchStatisticSearchParams: SearchStatisticSearchParams) {
    const searchType = searchStatisticSearchParams && searchStatisticSearchParams.searchType;
    const startTime = searchStatisticSearchParams && searchStatisticSearchParams.startTime;
    const endTime = searchStatisticSearchParams && searchStatisticSearchParams.endTime;
    const time = searchStatisticSearchParams && searchStatisticSearchParams.time;
    return this.http.get(HTTP_GET_ANALYSIS_STAISTIC, null, { searchType, startTime, endTime, time });
  }

  exportAnalysisStatistic(searchStatisticSearchParams: SearchStatisticSearchParams) {
    const langCode = this.stateServ.get('language') || 'ZH_TW';
    saveAs(
      HTTP_GET_ANALYSIS_STAISTIC_EXCEL_EXPORT +
        '?' +
        this.http
          .formatParams(Object.assign({}, searchStatisticSearchParams, { langCode, selectedLanguage: langCode }))
          .toString()
    );
  }

  // 数组重组，将英文key替换成中文key
  EnArrReplaceCnArr(arr, thead) {
    return arr.map((item) => {
      const obj = {};
      for (const prop in item) {
        if (thead.hasOwnProperty(prop)) {
          obj[thead[prop]] = item[prop];
        }
      }
      return obj;
    });
  }
}
