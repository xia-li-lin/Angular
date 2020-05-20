import { Component, OnInit, Input, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmailTemplateService, DropDownOption, EmailTemplate } from 'src/app/service';
import { UEditorComponent } from 'src/app/shared/ueditor';
import { CommonFuncService } from 'src/app/core';

const ERROR_MSG = {
  emailTitle: {
    required: '请输入邮件主題'
  },
  emailType: {
    required: '请选择邮件类型'
  },
  operatingStatus: {
    required: '请选择状态',
    existError: '该邮件模板已经存在'
  },
  creatorName: {
    required: '请输入邮件拟定人'
  },
  emailTemplate: {
    required: '请输入邮件正文',
    maxlength: '邮件正文超过10000字符'
  }
};
const UEDITOR_CONFIG = {
  initialFrameWidth: 450,
  initialFrameHeight: 320,
  wordCount: true,
  maximumWords: 10000
};

@Component({
  selector: 'app-email-template-tw',
  templateUrl: './email-template-tw.component.html',
  styleUrls: [ './email-template-tw.component.scss' ]
})
export class EmailTemplateTwComponent implements OnInit, OnChanges {
  @Input() info: EmailTemplate;

  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;
  @ViewChild(UEditorComponent, { read: UEditorComponent, static: true })
  full: UEditorComponent;

  public emailTypeArray: Array<DropDownOption> = [];
  public operatingStatusArray: Array<DropDownOption> = [];
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
      this.emailTypeArray = (res.data || []).filter((elem) => elem.mailLangCode === 'ZH').map((elem) => {
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
