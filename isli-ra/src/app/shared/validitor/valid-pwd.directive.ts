import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS, FormGroup } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { globalValidMsgServ } from 'mpr-form-valid';

@Directive({
  selector: 'input[appValidPwd]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ValidPwdDirective, multi: true }]
})
export class ValidPwdDirective implements Validator, OnChanges {
  @Input() pwd;
  private control;

  constructor(
    private translateServ: TranslateService
  ) {
    // globalValidMsgServ.registerMsg('error', this.translateServ.instant('register.errorPwdInconformity'));
    globalValidMsgServ.registerMsg('errorMsg', '两次密码不一致');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if ('pwd' in changes && this.pwd) {
      if (this.control) {
        // this.control.setValue(this.control.value);
        this.control.updateValueAndValidity();
      }
    }
  }
  validate(control: FormGroup) {
    this.control = control;
    console.log(control.value);
    console.log('pwd:', this.pwd);
    if (this.pwd !== control.value) {
      return { errorMsg: true };
    }
    return null;
  }

}
