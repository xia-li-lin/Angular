import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DropDownOption } from 'src/app/service';
import { MessageSearch } from 'src/app/service/model/message-manager.model';
import { clickOnce } from 'src/app/core';

@Component({
  selector: 'app-message-list-search',
  templateUrl: './message-list-search.component.html',
  styleUrls: [ './message-list-search.component.scss' ]
})
export class MessageListSearchComponent implements OnInit {
  @Output() OnQueryClick: EventEmitter<any> = new EventEmitter();

  @Input() spAccountData: Array<DropDownOption>;

  public queryParams: MessageSearch;
  public publishDate: any;
  public theme: string;
  public selectedAccount: any;

  constructor() {
    this.queryParams = new MessageSearch();
  }

  ngOnInit() {}

  handleSearchClick() {
    console.log(this.publishDate);
    console.log(this.theme);
    console.log(this.selectedAccount);
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
    this.queryParams.tidingsTheme = this.theme;
    this.queryParams.sendObject = this.selectedAccount.join(',');
    console.log(this.queryParams);
    this.OnQueryClick.emit(this.queryParams);
  }
}
