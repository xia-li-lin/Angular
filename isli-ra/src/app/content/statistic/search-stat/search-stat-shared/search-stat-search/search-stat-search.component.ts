import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonFuncService } from 'src/app/core';
import {
  DropDownOption,
  SEARCH_STATISTIC_SEARCH_TYPE,
  SearchStatisticSearchParams,
  ServiceCodeStatDates,
  ServiceCodeStatTypes,
  times
} from 'src/app/service';
import { CalendarObj } from 'src/app/shared/component/calendar/calendar.component';

@Component({
  selector: 'app-search-stat-search',
  templateUrl: './search-stat-search.component.html',
  styleUrls: [ './search-stat-search.component.scss' ]
})
export class SearchStatSearchComponent implements OnInit {
  @Output() searchClick = new EventEmitter();
  @Output() selectButtonChange = new EventEmitter();
  @Output() typeChange = new EventEmitter();

  @Input() searchStatisticSearchParams: SearchStatisticSearchParams;

  public calendarObj: CalendarObj;
  public dates = ServiceCodeStatDates;
  public endTimesList = [];
  public searchStatisticSearchType = SEARCH_STATISTIC_SEARCH_TYPE;
  public startTimesList = [];
  public timesList = [];
  public types = ServiceCodeStatTypes;

  constructor() {}

  ngOnInit() {
    this.calendarObj = new CalendarObj();
    this.calendarObj.view = 'month';
    this.calendarObj.dateFormat = 'yy-mm';
    this.calendarObj.showButtonBar = false;

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
    this.searchClick.emit(this.searchStatisticSearchParams);
  }

  // 切换开始时间改变结束时间下拉框数据
  handleStartTimeChange(startTime: string) {
    this.endTimesList = this.timesList.filter((item) => {
      return item.value >= startTime;
    });
  }

  // 初始化时间数据
  initTimes() {
    this.timesList = [];
    const startTime = Number(times().startTime);
    const endTime = Number(times().endTime);
    for (let i = startTime; i <= endTime; i++) {
      this.timesList.push(new DropDownOption(`${i}`, `${i}`));
    }
    this.endTimesList = CommonFuncService.clone(this.timesList);
    this.startTimesList = CommonFuncService.clone(this.timesList);
  }
}
