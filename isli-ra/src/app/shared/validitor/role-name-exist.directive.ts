import { Directive, forwardRef, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl, AsyncValidator } from '@angular/forms';
import { AccountRoleService } from 'src/app/service';

@Directive({
  selector: '[appRoleNameExist]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => RoleNameExistDirective),
      multi: true
    }
  ]
})
export class RoleNameExistDirective implements AsyncValidator {
  @Input() langCode = 'ZH_TW';
  @Input() roleId = -1;

  constructor(private accountRoleService: AccountRoleService) {}

  public validate(control: AbstractControl) {
    const account = control.value;
    if (!account) {
      return Promise.resolve(null);
    }
    return this.accountRoleService
      .checkRoleName(account, this.langCode, this.roleId || -1)
      .success((res) => {
        return null;
      })
      .error(() => {
        return { error: true };
      })
      .toPromise();
  }
}
