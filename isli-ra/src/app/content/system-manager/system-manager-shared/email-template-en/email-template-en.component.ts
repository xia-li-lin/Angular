import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmailTemplateService, DropDownOption, EmailTemplate } from 'src/app/service';
import { UEditorComponent } from 'src/app/shared/ueditor';
import { CommonFuncService } from 'src/app/core';

const ERROR_MSG = {
  emailTitle: {
    required: 'Please enter your email subject'
  },
  emailType: {
    required: 'Please choose the type of email'
  },
  operatingStatus: {
    required: 'Please choose the status',
    existError: 'This email template already exists'
  },
  creatorName: {
    required: 'Please enter the name of email writer'
  },
  emailTemplate: {
    required: 'Please enter the email content',
    lengthError: 'The email content exceeds the limit of 10000 characters'
  }
};
const UEDITOR_CONFIG = {
  initialFrameWidth: 450,
  initialFrameHeight: 320,
  wordCount: true,
  maximumWords: 10000
};
@Component({
  selector: 'app-email-template-en',
  templateUrl: './email-template-en.component.html',
  styleUrls: [ './email-template-en.component.scss' ]
})
export class EmailTemplateEnComponent implements OnInit, OnChanges {
  @Input() info: EmailTemplate;

  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;
  @ViewChild(UEditorComponent, { read: UEditorComponent, static: true })
  full: UEditorComponent;

  public emailTypeArray: Array<DropDownOption>;
  public operatingStatusArray: Array<DropDownOption>;
  public errorMsg = ERROR_MSG;
  public config = UEDITOR_CONFIG;
  public oldInfo: EmailTemplate;

  constructor(private emailTemplateService: EmailTemplateService) {}

  ngOnInit() {
    this.getEmailType();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('info' in changes && this.info) {
      this.oldInfo = CommonFuncService.clone(this.info);
      this.getOperatingStatus(this.info.emailType);
    }
  }

  getEmailType() {
    this.emailTemplateService.getEmailTemplateTypeList().success((res) => {
      this.emailTypeArray = (res.data || []).filter((elem) => elem.mailLangCode === 'EN').map((elem) => {
        return new DropDownOption(elem.mailTypeName, '' + elem.mailTypeId);
      });
    });
  }

  getOperatingStatus(emailType: string) {
    this.emailTemplateService.getEmailTemplateOperatStatus(emailType).success((res) => {
      console.log('operation---', res);
      this.operatingStatusArray = (res.data || []).map((ele) => {
        return new DropDownOption(ele.operatingStatusName, ele.operatingStatusId);
      });
    });
  }

  handleEmailTypeChange(emailType: string) {
    this.getOperatingStatus(emailType);
  }
}
