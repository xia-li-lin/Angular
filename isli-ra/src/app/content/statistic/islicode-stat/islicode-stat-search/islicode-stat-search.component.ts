import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonFuncService } from 'src/app/core';
import { DATE_SELECTION, DropDownOption, IsliCodeStatDates, IsliCodeTypes, SearchParams, times } from 'src/app/service';
import { CalendarObj } from 'src/app/shared/component/calendar/calendar.component';

@Component({
  selector: 'app-islicode-stat-search',
  templateUrl: './islicode-stat-search.component.html',
  styleUrls: [ './islicode-stat-search.component.scss' ]
})
export class IslicodeStatSearchComponent implements OnInit {
  @Output() dateChange = new EventEmitter();
  @Output() searchClick = new EventEmitter();

  @Input() searchParams: SearchParams;
  @Input() spUserList: Array<DropDownOption>;

  public calendarObj: CalendarObj;
  public dates = IsliCodeStatDates;
  public dateSelection = DATE_SELECTION;
  public endTimesList = [];
  public spUser: string;
  public startTimesList = [];
  public timesList = [];
  public type: string;
  public types = IsliCodeTypes;

  constructor() {
    this.initTimes();
  }

  ngOnInit() {}

  // 选择日历
  handleCalendarChange(date: string) {
    const dateArr = date.split('-');
    this.searchParams.startYear = dateArr && dateArr[0];
    this.searchParams.prm = dateArr && dateArr[1];
  }

  // 年月日值发生变化时
  handleDateChange(type: DATE_SELECTION) {
    this.searchParams.provider = '0';
    switch (type) {
      case this.dateSelection.YEAR:
        this.searchParams.startYear = times().startTime;
        this.searchParams.prm = times().endTime;
        break;
      case this.dateSelection.MONTH:
        this.searchParams.startYear = times().endTime;
        this.searchParams.prm = '';
        break;
      default:
        this.initCalendar();
        this.searchParams.startYear = times().endTime;
        this.searchParams.prm = times().month;
        this.searchParams.date = this.searchParams.startYear + '-' + this.searchParams.prm;
        break;
    }
    this.dateChange.emit(this.searchParams);
  }

  // 年-选择结束时间改变开始时间的下拉框数据
  handlePrmChange(prm: string) {
    this.startTimesList = this.timesList.filter((item) => {
      return item.value <= prm;
    });
  }

  // 搜索
  handleSearchClick() {
    this.searchClick.emit(this.searchParams);
  }

  // 年-选择开始时间改变结束时间的下拉框数据
  handleStartYearChange(startYear: string) {
    this.endTimesList = this.timesList.filter((item) => {
      return item.value >= startYear;
    });
    console.log(this.endTimesList);
  }

  // 初始化日历
  initCalendar() {
    this.calendarObj = new CalendarObj();
    this.calendarObj.view = 'month';
    this.calendarObj.dateFormat = 'yy-mm';
    this.calendarObj.showButtonBar = false;
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
