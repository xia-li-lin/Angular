import { DropDownOption } from './common.model';

// 搜索类型
export enum SEARCH_STATISTIC_SEARCH_TYPE {
  YEAR = 'year',
  MONTH = 'month',
  DAY = 'day',
  AREA = 'area',
  CHINA = 'china',
  RELATIONTYPE = 'relationType',
  TOP10 = 'top',
  TOP100 = 'top100'
}

export function dateFormat(data) {
  return data <= 9 ? '0' + data : data;
}

export function times() {
  const date = new Date();
  const year = date.getFullYear();
  const month = dateFormat(date.getMonth() + 1);
  const day = dateFormat(date.getDate());
  const hours = dateFormat(date.getHours());
  const minutes = dateFormat(date.getMinutes());
  const seconds = dateFormat(date.getSeconds());
  const startTime = '2008';
  const endTime = year.toString();

  return {
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
    startTime,
    endTime,
    fileName: `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`
  };
}

// ISLI编码统计---查询参数
export class SearchParams {
  constructor(
    public prm?: string,
    public provider?: string,
    public startYear?: string,
    public date?: string,
    public type?: DATE_SELECTION,
    public typeSelection?: TYPE_SELECTION
  ) {}
}

// ISLI编码统计
export class IsliCodeStatistic {
  constructor(public year?: string, public month?: string, public day?: string, public num?: string) {}
}

/**
 * 年：1 月：2 日：3
 */
export enum DATE_SELECTION {
  YEAR = '1',
  MONTH = '2',
  DAY = '3'
}

/**
 * 类型筛选
 */
export enum TYPE_SELECTION {
  TIME,
  AREA,
  SERVICE,
  TOP10,
  TOP100
}

export const IsliCodeStatDates = [
  new DropDownOption('statistic.dateYear', DATE_SELECTION.YEAR),
  new DropDownOption('statistic.dateMonth', DATE_SELECTION.MONTH),
  new DropDownOption('statistic.dateDay', DATE_SELECTION.DAY)
];

export const IsliCodeTypes = [ new DropDownOption('statistic.time', TYPE_SELECTION.TIME) ];

// 服务登记统计
export class ServiceCode {
  constructor(
    public orgName?: string, // SP用户
    public year?: string, // 年份
    public areaDesc?: string, // 国家-中文
    public areaDescEn?: string, // 国家-英文
    public total?: number // 数量
  ) {}
}

// 服务登记统计---查询参数
export class ServiceCodeSearchParams {
  constructor(
    public dataType?: DATA_TYPE, // 类型
    public endTime?: string, // 结束时间
    public spEmail?: string, // sp用户ID
    public startTime?: string // 开始时间
  ) {}
}

export const ServiceCodeStatTypes = [
  new DropDownOption('statistic.tabMenu.time', SEARCH_STATISTIC_SEARCH_TYPE.YEAR),
  new DropDownOption('statistic.tabMenu.area', SEARCH_STATISTIC_SEARCH_TYPE.AREA),
  new DropDownOption('statistic.tabMenu.top10', SEARCH_STATISTIC_SEARCH_TYPE.TOP10)
];

export const ServiceCodeStatDates = [
  new DropDownOption('statistic.dateYear', SEARCH_STATISTIC_SEARCH_TYPE.YEAR),
  new DropDownOption('statistic.dateMonth', SEARCH_STATISTIC_SEARCH_TYPE.MONTH),
  new DropDownOption('statistic.dateDay', SEARCH_STATISTIC_SEARCH_TYPE.DAY)
];

/**
 * SP：1 时间：2 地区：3
 */
export enum DATA_TYPE {
  SP = '1',
  TIME = '2',
  AREA = '3',
  SERVICE = '4'
}

// Echarts配置对象
export class EchartsConfigObj {
  constructor(public xData?: Array<any>, public yData?: Array<any>, public yAxisName?: string) {}
}

// SP统计
export class SPStatistic {
  constructor(public year?: string, public areaDesc?: string, public areaDescEn?: string, public total?: number) {}
}

// SP --- 查询参数

export class SPSearchParams {
  constructor(
    public dataType?: DATA_TYPE, // 类型
    public endTime?: string, // 结束时间
    public startTime?: string // 开始时间
  ) {}
}

export const SpStatTypes = [
  new DropDownOption('statistic.time', DATA_TYPE.TIME),
  new DropDownOption('statistic.area', DATA_TYPE.AREA)
];

// LC --- 查询参数
export class LcSearchParams {
  constructor(
    public startYear: string = times().startTime,
    public endYear: string = times().endTime,
    public type?: DATA_TYPE
  ) {}
}

export const LcTypes = [
  new DropDownOption('statistic.tabMenu.service', DATA_TYPE.SERVICE),
  new DropDownOption('statistic.tabMenu.time', DATA_TYPE.TIME)
];

// 检索统计 --- 查询参数
export class SearchStatisticSearchParams {
  constructor(
    public searchType = SEARCH_STATISTIC_SEARCH_TYPE.YEAR,
    public startTime?: string,
    public endTime?: string,
    public time?: string,
    public type?: SEARCH_STATISTIC_SEARCH_TYPE
  ) {}
}

export const AnalysisStatTypes = [
  new DropDownOption('statistic.tabMenu.time', SEARCH_STATISTIC_SEARCH_TYPE.YEAR),
  new DropDownOption('statistic.tabMenu.area', SEARCH_STATISTIC_SEARCH_TYPE.AREA),
  new DropDownOption('statistic.tabMenu.service', SEARCH_STATISTIC_SEARCH_TYPE.RELATIONTYPE),
  new DropDownOption('statistic.tabMenu.top100', SEARCH_STATISTIC_SEARCH_TYPE.TOP100)
];

export const AnalysisStatDates = [
  new DropDownOption('statistic.dateYear', SEARCH_STATISTIC_SEARCH_TYPE.YEAR),
  new DropDownOption('statistic.dateMonth', SEARCH_STATISTIC_SEARCH_TYPE.MONTH),
  new DropDownOption('statistic.dateDay', SEARCH_STATISTIC_SEARCH_TYPE.DAY)
];

export const AnalysisStatDistricts = [
  new DropDownOption('statistic.international', SEARCH_STATISTIC_SEARCH_TYPE.AREA),
  new DropDownOption('statistic.internal', SEARCH_STATISTIC_SEARCH_TYPE.CHINA)
];

// 数组对象排序
export function sortBy(props: string | number) {
  return (objA: { [x: string]: any }, objB: { [x: string]: any }) => {
    const valA = objA[props];
    const valB = objB[props];
    if (valA < valB) {
      return 1;
    } else if (valA > valB) {
      return -1;
    } else {
      return 0;
    }
  };
}
