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
  selector: 'app-forzen',
  templateUrl: './forzen.component.html',
  styleUrls: [ './forzen.component.scss' ]
})
export class ForzenComponent implements OnInit {
  @Output() closeForzenClick = new EventEmitter();
  @Output() forzenSureClick = new EventEmitter();

  public errorMsg = ERROR_MSG;
  public submitReason: string;

  constructor(private globalValidServ: GlobalValidService, private translateServ: TranslateService) {}

  ngOnInit() {}

  // 确定
  @clickOnce()
  handleSureClick() {
    if (this.globalValidServ.validAll()) {
      this.forzenSureClick.emit(this.submitReason);
    }
  }
}
