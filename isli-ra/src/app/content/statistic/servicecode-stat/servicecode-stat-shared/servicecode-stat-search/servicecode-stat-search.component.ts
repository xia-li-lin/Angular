import { CommonFuncService } from 'src/app/core';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DropDownOption, DATA_TYPE, ServiceCodeSearchParams, times } from 'src/app/service/model';

@Component({
  selector: 'app-servicecode-stat-search',
  templateUrl: './servicecode-stat-search.component.html',
  styleUrls: [ './servicecode-stat-search.component.scss' ]
})
export class ServicecodeStatSearchComponent implements OnInit {
  @Output() searchClick = new EventEmitter();
  @Output() typeChange = new EventEmitter();

  @Input() spUserList: Array<DropDownOption>;

  public dataType = DATA_TYPE;
  public endTimesList: Array<DropDownOption>;
  public serviceCodeSearchParams = new ServiceCodeSearchParams(DATA_TYPE.SP);
  public spUser: string;
  public startTimesList: Array<DropDownOption>;
  public timesList: Array<DropDownOption>;
  public types: Array<DropDownOption>;

  constructor(private translateServ: TranslateService) {}

  ngOnInit() {
    this.initTypes();
  }

  // 选择结束时间
  handleEndTimeChange(endTime: string) {
    this.startTimesList = this.timesList.filter((item) => {
      return item.value <= endTime;
    });
  }

  // 搜索
  handleSearchClick() {
    this.searchClick.emit(this.serviceCodeSearchParams);
  }

  // 选择SP用户
  handleSpUserLChange(user) {
    console.log(user);
  }

  // 选择开始时间
  handleStartTimeChange(startTime: string) {
    this.endTimesList = this.timesList.filter((item) => {
      return item.value >= startTime;
    });
  }

  // 选择类型
  handleTypeChange(dataType: DATA_TYPE) {
    if (dataType === DATA_TYPE.TIME) {
      this.initTimes();
      this.serviceCodeSearchParams.spEmail = '0';
      this.serviceCodeSearchParams.startTime = times().startTime;
      this.serviceCodeSearchParams.endTime = times().endTime;
    } else {
      this.serviceCodeSearchParams.spEmail = null;
      this.serviceCodeSearchParams.startTime = null;
      this.serviceCodeSearchParams.endTime = null;
    }
    this.typeChange.emit(this.serviceCodeSearchParams);
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

  // 初始化类型
  initTypes() {
    this.types = [
      new DropDownOption(this.translateServ.instant('statistic.tabMenu.sp'), DATA_TYPE.SP),
      new DropDownOption(this.translateServ.instant('statistic.tabMenu.time'), DATA_TYPE.TIME),
      new DropDownOption(this.translateServ.instant('statistic.tabMenu.area'), DATA_TYPE.AREA)
    ];
  }
}
