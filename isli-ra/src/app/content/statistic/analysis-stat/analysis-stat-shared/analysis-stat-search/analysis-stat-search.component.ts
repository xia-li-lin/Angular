import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  AnalysisStatDates,
  AnalysisStatDistricts,
  AnalysisStatTypes,
  DropDownOption,
  SEARCH_STATISTIC_SEARCH_TYPE,
  SearchStatisticSearchParams,
  times
} from 'src/app/service';
import { CommonFuncService } from 'src/app/core';
import { CalendarObj } from 'src/app/shared/component/calendar/calendar.component';

@Component({
  selector: 'app-analysis-stat-search',
  templateUrl: './analysis-stat-search.component.html',
  styleUrls: [ './analysis-stat-search.component.scss' ]
})
export class AnalysisStatSearchComponent implements OnInit {
  @Output() searchClick = new EventEmitter();
  @Output() selectButtonChange = new EventEmitter();
  @Output() typeChange = new EventEmitter();

  @Input() searchParams: SearchStatisticSearchParams;

  public calendarObj: CalendarObj;
  public dates: Array<DropDownOption>;
  public dateType = SEARCH_STATISTIC_SEARCH_TYPE.YEAR;
  public endTimesList: Array<DropDownOption>;
  public searchType = SEARCH_STATISTIC_SEARCH_TYPE;
  public startTimesList: Array<DropDownOption>;
  public timesList: Array<DropDownOption>;
  public types = AnalysisStatTypes;

  constructor() {}

  ngOnInit() {
    this.calendarObj = new CalendarObj();
    this.calendarObj.view = 'month';
    this.calendarObj.dateFormat = 'yy-mm';
    this.calendarObj.showButtonBar = false;

    this.initDates();
    this.initTimes();
  }

  // 选择结束时间
  handleEndTimeChange(endTime: string) {
    this.startTimesList = this.timesList.filter((item) => {
      return item.value <= endTime;
    });
  }

  // 搜索
  handleSearchClick() {
    this.searchClick.emit(this.searchParams);
  }

  // 选择开始时间
  handleStartTimeChange(startTime: string) {
    this.endTimesList = this.timesList.filter((item) => {
      return item.value >= startTime;
    });
  }

  // 当tab menu 发生变化时
  handleTypeChange(type: SEARCH_STATISTIC_SEARCH_TYPE) {
    this.initDates();
    this.typeChange.emit(this.searchParams);
  }

  // 初始化日期
  initDates() {
    if (this.searchParams.type === SEARCH_STATISTIC_SEARCH_TYPE.YEAR) {
      this.searchParams.searchType = SEARCH_STATISTIC_SEARCH_TYPE.YEAR;
      this.dates = AnalysisStatDates;
    } else if (this.searchParams.type === SEARCH_STATISTIC_SEARCH_TYPE.AREA) {
      this.searchParams.searchType = SEARCH_STATISTIC_SEARCH_TYPE.AREA;
      this.dates = AnalysisStatDistricts;
    }
  }

  // 初始化时间数据
  initTimes() {
    this.timesList = [];
    for (let i = Number(times().startTime); i <= Number(times().endTime); i++) {
      this.timesList.push(new DropDownOption(`${i}`, `${i}`));
    }
    this.startTimesList = CommonFuncService.clone(this.timesList);
    this.endTimesList = CommonFuncService.clone(this.timesList);
  }
}
