import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DropDownOption, SystemLogSearch } from 'src/app/service';
import { clickOnce } from 'src/app/core';

@Component({
  selector: 'app-system-log-search',
  templateUrl: './system-log-search.component.html',
  styleUrls: [ './system-log-search.component.scss' ]
})
export class SystemLogSearchComponent implements OnInit {
  @Output() OnQueryClick: EventEmitter<any> = new EventEmitter();

  @Input() roleListData: Array<DropDownOption>;

  public publishDate: any;
  public employeeAccount: any;
  public roleCode: any;

  public queryParams: SystemLogSearch;

  constructor() {
    this.queryParams = new SystemLogSearch();
  }

  ngOnInit() {}

  handleSearchClick() {
    console.log(this.publishDate);
    console.log(this.employeeAccount);
    console.log(this.roleCode);
    if (this.publishDate) {
      if (this.publishDate.beginDate) {
        this.queryParams.startTime = this.publishDate.endDate;
      }
      if (this.publishDate.endDate) {
        this.queryParams.endTime = this.publishDate.endDate;
      }
    } else {
      this.queryParams.startTime = undefined;
      this.queryParams.endTime = undefined;
    }
    this.queryParams.employeeAccount = this.employeeAccount;
    this.queryParams.roleCode = this.roleCode;
    console.log(this.queryParams);
    this.OnQueryClick.emit(this.queryParams);
  }
}
