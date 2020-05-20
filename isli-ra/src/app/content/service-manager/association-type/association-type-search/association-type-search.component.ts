import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppState } from 'src/app/core';
import { AssicuationSearch, AssociationTypeStatusList, DropDownOption } from 'src/app/service/model';

@Component({
  selector: 'app-association-type-search',
  templateUrl: './association-type-search.component.html',
  styleUrls: [ './association-type-search.component.scss' ]
})
export class AssociationTypeSearchComponent implements OnInit {
  @Output() search = new EventEmitter();

  @Input() sourceTypeList: Array<DropDownOption>;
  @Input() targetTypeList: Array<DropDownOption>;

  public assicuationSearch = new AssicuationSearch();
  public language: string;
  public registerData;
  public statusList = AssociationTypeStatusList;

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
    this.assicuationSearch.dateStart = startTime;
    this.assicuationSearch.dateEnd = endTime;

    this.search.emit(this.assicuationSearch);
  }
}
