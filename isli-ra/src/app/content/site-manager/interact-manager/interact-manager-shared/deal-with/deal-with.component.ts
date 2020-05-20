import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-deal-with',
  templateUrl: './deal-with.component.html',
  styleUrls: [ './deal-with.component.scss' ]
})
export class DealWithComponent implements OnInit {
  @Output() OnCloseEnableClick = new EventEmitter();
  @Output() OnEnableSureClick = new EventEmitter();

  public submitReason: string;
  public errMsg: string;
  public emailCheck = false;

  constructor(private translateService: TranslateService) {}

  ngOnInit() {}

  //
  handleOnfocus() {
    if (this.submitReason && this.submitReason.length > 0) {
      this.errMsg = '';
    } else {
      this.errMsg = this.translateService.instant('siteManager.feedbacks.dialog.submitReasonPlaceholder');
    }
  }

  handleSureClick() {
    if (!this.submitReason) {
      this.errMsg = this.translateService.instant('siteManager.feedbacks.dialog.submitReasonPlaceholder');
      return;
    }
    this.OnEnableSureClick.emit({ submitReason: this.submitReason, emailCheck: this.emailCheck });
  }
}
