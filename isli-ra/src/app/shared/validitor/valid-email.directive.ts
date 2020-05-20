import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormGroup } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { globalValidMsgServ } from 'mpr-form-valid';

@Directive({
  selector: '[appValidEmail]',
  providers: [ { provide: NG_VALIDATORS, useExisting: ValidEmailDirective, multi: true } ]
})
export class ValidEmailDirective {
  constructor(private translateServ: TranslateService) {
    globalValidMsgServ.registerMsg('emailError', '邮箱格式不正确');
  }

  validate(control: FormGroup) {
    if (!control.value) {
      return;
    }
    const reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
    const result = reg.test(control.value);
    if (!result) {
      return { emailError: true };
    }
    return null;
  }
}
