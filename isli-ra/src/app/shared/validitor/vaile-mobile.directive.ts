import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormGroup } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { globalValidMsgServ } from 'mpr-form-valid';

@Directive({
  selector: '[appVaileMobile]',
  providers: [{ provide: NG_VALIDATORS, useExisting: VaileMobileDirective, multi: true }]
})
export class VaileMobileDirective {

  constructor(
    private translateServ: TranslateService
  ) {
    globalValidMsgServ.registerMsg('mobileError', '电话号码格式不正确');
  }

  validate(control: FormGroup) {
    console.log('email valid:', control.value);
    const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    const result = reg.test(control.value);
    console.log('email result:', result);
    if (!result) {
      return { mobileError: true };
    }
    return null;
  }
}
