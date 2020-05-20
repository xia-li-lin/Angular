import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonFuncService } from 'src/app/core';
import { DATA_TYPE, DropDownOption, LcSearchParams, LcTypes, times } from 'src/app/service/model';

@Component({
  selector: 'app-lc-stat-search',
  templateUrl: './lc-stat-search.component.html',
  styleUrls: [ './lc-stat-search.component.scss' ]
})
export class LcStatSearchComponent implements OnInit {
  @Output() searchClick = new EventEmitter();
  @Output() typeChange = new EventEmitter();

  public dataType = DATA_TYPE;
  public endTimesList: Array<DropDownOption>;
  public lcSearchParams = new LcSearchParams(times().endTime, null, DATA_TYPE.SERVICE);
  public startTimesList: Array<DropDownOption>;
  public timesList: Array<DropDownOption>;
  public types = LcTypes;

  constructor() {}

  ngOnInit() {
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
    this.searchClick.emit(this.lcSearchParams);
  }

  // 选择开始时间
  handleStartTimeChange(startTime: string) {
    this.endTimesList = this.timesList.filter((item) => {
      return item.value >= startTime;
    });
  }

  // 选择类型
  handleTypeChange(type: DATA_TYPE) {
    this.typeChange.emit(this.lcSearchParams);
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
