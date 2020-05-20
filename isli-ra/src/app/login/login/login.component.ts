import { timer } from 'rxjs';
import { take, debounceTime } from 'rxjs/operators';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgControl } from '@angular/forms';

import { LoginService } from '../../service/login.service';
import { GlobalValidService } from 'mpr-form-valid';
import { AppState, ResponseModel } from 'src/app/core';
import { clickWaitHttp, clickOnce } from '../../core/cache';
import { UserService, LanguageService } from 'src/app/service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit, AfterViewInit {
  public errorMsg = {
    form: {
      username: {
        required: 'login.valid.userName.required',
        loginError: 'login.valid.userName.loginError'
      },
      password: {
        required: 'login.valid.password.required'
      },
      mobileCode: {
        required: 'login.valid.code.required',
        validError: 'login.valid.code.validError',
        getError: 'login.valid.code.getError'
      }
    }
  };
  public userInfo = {
    username: '',
    password: '',
    mobileCode: ''
  };
  public errorFlag: string;
  public remberpassword: boolean;
  public validBtnTxt = 'login.sendCode';
  public disableSendCode = false;
  public restSecond = 120;

  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;

  @ViewChild('password', { read: NgControl, static: true })
  passowrd: NgControl;

  constructor(
    private router: Router,
    private languageServ: LanguageService,
    private loginService: LoginService,
    private globalValidServ: GlobalValidService,
    private stateServ: AppState,
    private userServ: UserService
  ) {}

  ngOnInit() {
    this.loginService.clearLogin();
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    this.passowrd.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.form.controls.username.updateValueAndValidity();
    });
  }

  @clickWaitHttp('handleLoginClick')
  handleLoginClick() {
    if (this.globalValidServ.validAll()) {
      if (!this.userInfo.mobileCode) {
        this.form.controls.mobileCode.setErrors({ required: true });
        return;
      }
      return this.loginService
        .login(this.userInfo)
        .success(() => {
          this.loginService.getAccountInfo().success((res) => {
            this.stateServ.set('userId', res.data.adminId);
            this.stateServ.set('usernmae', res.data.username);
            this.stateServ.set('nickname', res.data.name);
          });
          this.stateServ.clear('passwordExpiredRemind');
          this.router.navigate([ '/content' ]);
          this.languageServ.getLanguages().success((res) => {
            this.stateServ.set('languageType', res.data || []);
          });
          this.stateServ.setPromise(
            'permission',
            new Promise((resolve) => {
              this.userServ.getPermission().success((res) => {
                resolve(res.data);
              });
            })
          );
        })
        .failed((res) => {
          if (res.code && res.code.startsWith('02005')) {
            this.form.controls.username.setErrors({ loginError: res.msg });
          } else if (res.code && res.code === '10000000') {
            this.form.controls.username.setErrors({ loginError: res.msg });
          } else {
            this.form.controls.mobileCode.setErrors({ validError: true });
          }
        });
    }
  }

  @clickOnce()
  @clickWaitHttp('handleSendCodeClick')
  handleSendCodeClick() {
    if (this.disableSendCode) {
      return;
    }
    this.form.controls.mobileCode.setErrors(null);
    this.userInfo.mobileCode = '';
    if (!this.globalValidServ.validAll()) {
      return;
    }
    return this.loginService
      .sendValidCode(this.userInfo.username)
      .success(() => {
        this.validBtnTxt = 'login.resendCode';
        this.restSecond = 120;
        this.disableSendCode = true;
        timer(0, 1000).pipe(take(120)).subscribe(
          (value) => {
            this.restSecond -= 1;
          },
          () => {},
          () => {
            this.validBtnTxt = 'login.sendCode';
            this.disableSendCode = false;
          }
        );
      })
      .failed(() => {
        this.form.controls.mobileCode.markAsDirty();
        this.form.controls.mobileCode.setErrors({ getError: true });
      });
  }
}
