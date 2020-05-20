import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonFuncService } from 'src/app/core';
import { DATA_TYPE, DropDownOption, SPSearchParams, SpStatTypes, times } from 'src/app/service/model';

@Component({
  selector: 'app-sp-stat-search',
  templateUrl: './sp-stat-search.component.html',
  styleUrls: [ './sp-stat-search.component.scss' ]
})
export class SpStatSearchComponent implements OnInit {
  @Output() searchClick = new EventEmitter();
  @Output() typeChange = new EventEmitter();

  @Input() sPSearchParams: SPSearchParams;

  public dataType = DATA_TYPE;
  public endTimesList: Array<DropDownOption>;
  public startTimesList: Array<DropDownOption>;
  public timesList: Array<DropDownOption>;
  public types = SpStatTypes;

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

  // 切换开始时间改变结束时间下拉框数据
  handleStartTimeChange(startTime: string) {
    this.endTimesList = this.timesList.filter((item) => {
      return item.value >= startTime;
    });
  }

  // 搜索
  handleSearchClick() {
    this.searchClick.emit(this.sPSearchParams);
  }

  // 选择类型
  handleTypeChange(dataType: DATA_TYPE) {
    this.typeChange.emit(this.sPSearchParams);
  }

  // 初始化时间数据
  initTimes() {
    const startTime = Number(times().startTime);
    const endTime = Number(times().endTime);
    this.timesList = [];
    for (let i = startTime; i <= endTime; i++) {
      this.timesList.push(new DropDownOption(`${i}`, `${i}`));
    }
    this.startTimesList = CommonFuncService.clone(this.timesList);
    this.endTimesList = CommonFuncService.clone(this.timesList);
  }
}
