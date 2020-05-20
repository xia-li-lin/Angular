import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormGroup } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { globalValidMsgServ } from 'mpr-form-valid';

@Directive({
  selector: '[appValidJobNo]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ValidJobNoDirective, multi: true }]
})
export class ValidJobNoDirective {

  constructor(
    private translateServ: TranslateService
  ) {
    globalValidMsgServ.registerMsg('error', '工號由6位字母或數字組成');
  }

  validate(control: FormGroup) {
    console.log('email valid:', control.value);
    const reg = /^[0-9a-zA-Z]{6}$/;
    const result = reg.test(control.value);
    if (!result) {
      return { error: true };
    }
    return null;
  }
}
