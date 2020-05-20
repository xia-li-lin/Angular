import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppState } from 'src/app/core';
import { STATUS, DropDownOption, RegisterManagerSearch } from 'src/app/service/model';

@Component({
  selector: 'app-register-manager-search',
  templateUrl: './register-manager-search.component.html',
  styleUrls: [ './register-manager-search.component.scss' ]
})
export class RegisterManagerSearchComponent implements OnInit {
  @Output() searchClick = new EventEmitter<any>();

  @Input() serviceCodeList: Array<DropDownOption>;
  @Input() serviceProviderList: Array<DropDownOption>;
  @Input() servicesList: Array<DropDownOption>;
  @Input() statusList: Array<DropDownOption>;

  public language: string;
  public registerData: any = {};
  public serviceCode: string;
  public serviceProvider: string;
  public services: string;
  public status: STATUS;

  constructor(private stateServ: AppState) {
    this.language = this.stateServ.get('language');
  }

  ngOnInit() {}

  // 搜索
  handleSearchClick() {
    const searchQueryParams = new RegisterManagerSearch(
      this.registerData.beginDate,
      this.registerData.endDate,
      this.status,
      this.services,
      this.serviceCode,
      this.serviceProvider
    );
    // console.log(searchQueryParams);
    this.searchClick.emit(searchQueryParams);
  }
}
