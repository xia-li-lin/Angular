import { Component, OnInit, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { GlobalValidService } from 'mpr-form-valid';
import { MessageService } from 'primeng/api';

import { AccountUserDetailsObj, DropDownOption, TelephonePreArray } from '../../../service';
import { SystemAccountService } from 'src/app/service/system-account.service';
import { clickWaitHttp, HttpResponse } from 'src/app/core';
import { TranslateService } from '@ngx-translate/core';

const ERROR_MSG = {
  username: {
    required: 'systemAccount.create.valid.username',
    existError: 'systemAccount.create.valid.uernameExist'
  },
  jobNo: {
    required: 'systemAccount.create.valid.jobNo',
    existError: 'systemAccount.create.valid.jobNoExist'
  },
  name: {
    required: 'systemAccount.create.valid.name'
  },
  telephone: {},
  mobileType: {
    required: ''
  },
  mobile: {
    required: 'systemAccount.create.valid.mobile'
  },
  email: {
    required: 'systemAccount.create.valid.emial'
  },
  password: {
    required: 'stemAccount.create.valid.password',
    minlength: 'systemAccount.create.valid.format',
    maxlength: 'systemAccount.create.valid.format',
    format: 'systemAccount.create.valid.format',
    notEq: 'systemAccount.create.valid.noeEq'
  },
  confirmPassword: {
    required: 'systemAccount.create.valid.passwordConfirm',
    minlength: 'systemAccount.create.valid.format',
    maxlength: 'systemAccount.create.valid.format',
    format: 'systemAccount.create.valid.format',
    notEq: 'systemAccount.create.valid.noeEq'
  }
};

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: [ './account.component.scss' ]
})
export class AccountComponent implements OnInit {
  public errorMsg = ERROR_MSG;
  public info = new AccountUserDetailsObj();
  public createPageFlag = true;
  public createTxt: string;
  public telephonePreArray = TelephonePreArray;
  public id: string;

  @ViewChild('newPwd', { read: NgControl, static: true })
  public newPwdControl: NgControl;

  constructor(
    private globalValidService: GlobalValidService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private systemAccountService: SystemAccountService,
    private messageService: MessageService,
    private translateService: TranslateService
  ) {
    activeRoute.queryParams.subscribe((params) => {
      console.log('account params---', params);
      if (params.id) {
        this.createPageFlag = false;
        this.createTxt = this.translateService.instant('systemAccount.create.edit');
        this.id = params.id;
        this.getAccountDetails(params.id);
      } else {
        this.createPageFlag = true;
        this.createTxt = this.translateService.instant('systemAccount.create.create');
      }
    });
  }

  ngOnInit() {}

  getAccountDetails(id: string) {
    this.systemAccountService.getAccountDetails(id).success((res) => {
      const telephone = {
        telType: res.data.telType,
        telArea: res.data.telArea,
        telNumber: res.data.telNumber,
        telExt: res.data.telExt
      };
      this.info = res.data;
      this.info.telephone = telephone;
      console.log('account info---', this.info);
    });
  }

  @clickWaitHttp('handleSaveClick')
  handleSaveClick() {
    if (this.globalValidService.validAll()) {
      const telephone = {
        telArea: this.info.telephone.telArea,
        telExt: this.info.telephone.telExt,
        telNumber: this.info.telephone.telNumber,
        telType: this.info.telephone.telType
      };
      const data: any = Object.assign({}, this.info, telephone);
      console.log('sava data----', data);
      let req: HttpResponse<any>;
      if (this.createPageFlag) {
        req = this.systemAccountService.createAccount(data);
      } else {
        req = this.systemAccountService.updateAccount(data);
      }
      return req
        .success((res) => {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('common.operaSuccess')
          });
          this.router.navigate([ '/content/system' ]);
        })
        .failed(() => {
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('common.operaFailed')
          });
        });
    }
  }
}
