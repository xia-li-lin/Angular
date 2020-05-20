import { TelephonePreArray } from './../../../service/model/system-account.model';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service';
import { SystemAccountService } from 'src/app/service/system-account.service';
import { AppState, clickOnce, clickWaitHttp } from 'src/app/core';
import { Router } from '@angular/router';
import { GlobalValidService } from 'mpr-form-valid';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: [ './index.component.scss' ]
})
export class IndexComponent implements OnInit {
  userInfo: any = {};
  roleNames = '';
  telephonePres = TelephonePreArray;
  readonly = true;
  constructor(
    private loginServ: LoginService,
    private systemAccountServ: SystemAccountService,
    private stateServ: AppState,
    private router: Router,
    private globalServ: GlobalValidService
  ) {}

  ngOnInit() {
    this.loginServ.getAccountInfo().success((res) => {
      this.userInfo = res.data;
      const passwordExpiredRemind =
        new Date().getTime() - new Date(this.userInfo.passwordEffectiveTime).getTime() > 3600 * 24 * 83;
      if (!this.stateServ.get('passwordExpiredRemind') && passwordExpiredRemind) {
        this.userInfo.passwordExpiredRemind = true;
        this.stateServ.set('passwordExpiredRemind', passwordExpiredRemind);
      }
    });

    this.systemAccountServ.getAccountRole(this.stateServ.get('userId')).success((res) => {
      this.roleNames = res.data.map((elem) => elem.roleName).join(',');
    });
  }

  handleModifyClick() {
    this.readonly = false;
  }

  handleCancelClick() {
    this.readonly = true;
  }

  @clickOnce()
  handleModifyPwdClick() {
    this.router.navigate([ '/content/index/modify' ]);
  }

  @clickWaitHttp('handleSaveClick')
  handleSaveClick() {
    if (!this.globalServ.validAll()) {
      return;
    }
    return this.loginServ.updateAccountInfo(this.userInfo).success(() => {
      this.readonly = true;
    });
  }
}
