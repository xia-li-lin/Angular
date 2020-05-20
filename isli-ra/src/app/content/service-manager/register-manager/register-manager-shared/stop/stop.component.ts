import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalValidService } from 'mpr-form-valid';
import { clickOnce } from 'src/app/core';

const ERROR_MSG = {
  submitReason: {
    required: 'service.register.dialog.submitReasonRequired'
  }
};

@Component({
  selector: 'app-stop',
  templateUrl: './stop.component.html',
  styleUrls: [ './stop.component.scss' ]
})
export class StopComponent implements OnInit {
  @Output() closeStopClick = new EventEmitter();
  @Output() stopSureClick = new EventEmitter();

  public submitReason: string;
  public errorMsg = ERROR_MSG;

  constructor(private globalValidServ: GlobalValidService, private translateServ: TranslateService) {}

  ngOnInit() {}

  // 确定
  @clickOnce()
  handleSureClick() {
    if (this.globalValidServ.validAll()) {
      this.stopSureClick.emit(this.submitReason);
    }
  }
}
