import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppState } from 'src/app/core';
import { DropDownOption, ServiceSpApplySearch } from 'src/app/service/model';

@Component({
  selector: 'app-sp-apply-add-service-search',
  templateUrl: './sp-apply-add-service-search.component.html',
  styleUrls: [ './sp-apply-add-service-search.component.scss' ]
})
export class SpApplyAddServiceSearchComponent implements OnInit {
  @Output() searchClick = new EventEmitter();

  @Input() servicesList: Array<DropDownOption>;
  @Input() serviceProviderList: Array<DropDownOption>;

  public language: string;
  public registerData: any;
  public serviceSpApplySearch = new ServiceSpApplySearch();

  constructor(private stateServ: AppState) {
    this.language = this.stateServ.get('language');
  }

  ngOnInit() {}

  // 搜索
  handleSearchClick() {
    const beginDate = this.registerData && this.registerData.beginDate;
    const beginDateArr = beginDate && beginDate.split(' ');
    const startTime = beginDateArr && beginDateArr[0];
    const endDate = this.registerData && this.registerData.endDate;
    const endDateArr = endDate && endDate.split(' ');
    const endTime = endDateArr && endDateArr[0];
    this.serviceSpApplySearch.startTime = startTime;
    this.serviceSpApplySearch.endTime = endTime;

    this.searchClick.emit(this.serviceSpApplySearch);
  }
}
