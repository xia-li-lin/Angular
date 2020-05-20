import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { EmailTemplate } from 'src/app/service';
import { GlobalValidService } from 'mpr-form-valid';
import { clickOnce } from 'src/app/core';

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: [ './email-template.component.scss' ]
})
export class EmailTemplateComponent implements OnInit, OnChanges {
  @Output() OnCancelClick: EventEmitter<any> = new EventEmitter();
  @Output() OnSureClick: EventEmitter<any> = new EventEmitter();
  @Input() emailTemplateDetails: Array<EmailTemplate>;
  @Input() showSaveBtnFlag: boolean;

  public infoTw = new EmailTemplate();
  public infoEn = new EmailTemplate();

  constructor(private globalValidService: GlobalValidService) {}
  ngOnChanges(change: SimpleChanges) {
    if ('emailTemplateDetails' in change) {
      const emailTemplateDetails = change.emailTemplateDetails && change.emailTemplateDetails.currentValue;
      if (emailTemplateDetails && emailTemplateDetails.length) {
        emailTemplateDetails.forEach((element) => {
          if (element.langCode === 'ZH') {
            this.infoTw = element;
          } else if (element.langCode === 'EN') {
            this.infoEn = element;
          }
        });
      }
    }
  }

  ngOnInit() {}

  handleCancelClick() {
    this.OnCancelClick.emit();
  }

  @clickOnce()
  handleSendClick() {
    console.log(this.infoTw);
    console.log(this.infoEn);
    this.infoTw.langCode = 'ZH';
    this.infoEn.langCode = 'EN';
    const data = [].concat(this.infoTw, this.infoEn);
    if (this.globalValidService.validAll()) {
      this.OnSureClick.emit(data);
    }
  }
}
