import { GlobalValidService } from 'mpr-form-valid';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { clickOnce } from 'src/app/core';
import { NgControl } from '@angular/forms';
import { LoginService } from 'src/app/service';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: [ './modify-password.component.scss' ]
})
export class ModifyPasswordComponent implements OnInit {
  public oldPassword: string;
  public newPassword: string;
  public confirmPwd: string;
  @ViewChild('newPwd', {
    read: NgControl,
    static: true
  })
  newPwdControl: NgControl;
  public errMsg = {
    oldPassword: {
      required: 'index.changePassword.valid.currentPassword',
      min: 'index.changePassword.valid.currentPassword',
      max: 'index.changePassword.valid.currentPassword'
    },
    newPassword: {
      required: 'index.changePassword.valid.newPassword',
      minlength: 'index.changePassword.valid.patternLen',
      maxlength: 'index.changePassword.valid.patternLen',
      format: 'index.changePassword.valid.patternLen',
      notEq: 'index.changePassword.valid.patternLen'
    },
    confirmPwd: {
      required: 'index.changePassword.valid.confirmPassword',
      notEq: 'index.changePassword.valid.patternLen',
      minlength: 'index.changePassword.valid.patternLen',
      maxlength: 'index.changePassword.valid.patternLen',
      format: 'index.changePassword.valid.patternLen'
    }
  };

  constructor(private router: Router, private globalValidServ: GlobalValidService, private loginServ: LoginService) {}

  ngOnInit() {}

  @clickOnce()
  handleSubmit() {
    if (!this.globalValidServ.validAll()) {
      return;
    }
    return this.loginServ.chanePwd(this.newPassword, this.oldPassword).success((res) => {});
  }

  @clickOnce()
  handleCancel() {
    this.router.navigate([ '/content/index' ]);
  }
}
