import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalValidService } from 'mpr-form-valid';

const ERROR_MSG = {
  submitReason: {
    required: 'service.register.dialog.submitReasonRequired'
  }
};

@Component({
  selector: 'app-enable',
  templateUrl: './enable.component.html',
  styleUrls: [ './enable.component.scss' ]
})
export class EnableComponent implements OnInit {
  @Output() closeEnableClick = new EventEmitter();
  @Output() enableSureClick = new EventEmitter();

  public submitReason: string;
  public errorMsg = ERROR_MSG;

  constructor(private globalValidServ: GlobalValidService, private translateServ: TranslateService) {}

  ngOnInit() {
    console.log('enable');
  }

  // 确定
  handleSureClick() {
    if (this.globalValidServ.validAll()) {
      this.enableSureClick.emit({ submitReason: this.submitReason });
    }
  }
}
