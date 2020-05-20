import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppState } from 'src/app/core';
import { DropDownOption, ServiceSearch } from 'src/app/service/model';

@Component({
  selector: 'app-service-search',
  templateUrl: './service-search.component.html',
  styleUrls: [ './service-search.component.scss' ]
})
export class ServiceSearchComponent implements OnInit {
  @Output() searchClick = new EventEmitter();

  @Input() serviceCodeList: Array<DropDownOption>;

  public createTime: string;
  public language: string;
  public serviceSearch = new ServiceSearch();

  constructor(private stateServ: AppState) {
    this.language = this.stateServ.get('language');
  }

  ngOnInit() {}

  // 日历改变时
  handleDateChange(date: { beginDate: string; endDate: string }) {
    this.serviceSearch.dateStart = date.beginDate;
    this.serviceSearch.dateEnd = date.endDate;
  }

  // 搜索
  handleSearchClick() {
    this.searchClick.emit(this.serviceSearch);
  }
}
