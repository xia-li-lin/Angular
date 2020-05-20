import { Directive, forwardRef, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl, AsyncValidator } from '@angular/forms';

import { SystemAccountService } from 'src/app/service/system-account.service';

@Directive({
  selector: '[appJobNoExist]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => JobNoExistDirective),
      multi: true
    }
  ]
})
export class JobNoExistDirective implements AsyncValidator {

  constructor(
    private systemAccountService: SystemAccountService
  ) { }

  @Input() adminId: string;
  @Input() account: string;

  public validate(control: AbstractControl) {
    const account = control.value;
    if (!account || this.account === account) {
      return Promise.resolve(null);
    }
    if (this.adminId) {
      return this.systemAccountService.checkAccountExistForModify(this.adminId, account)
        .success(() => {
          console.log('------');
          return null;
        })
        .error(() => {
          console.log('error-----');
          return { existError: true };
        })
        .toPromise();
    } else {
      return this.systemAccountService.checkAccountExsit(account)
        .success(() => {
          return null;
        })
        .error(() => {
          return { existError: true };
        })
        .toPromise();
    }
  }
}

