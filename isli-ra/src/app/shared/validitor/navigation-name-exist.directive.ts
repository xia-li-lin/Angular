import { Directive, forwardRef, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl, AsyncValidator } from '@angular/forms';
import { NavigationService } from 'src/app/service';

@Directive({
  selector: '[appValidNacName]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => ValidNavigatinNameDirective),
      multi: true
    }
  ]
})
export class ValidNavigatinNameDirective implements AsyncValidator {
  @Input() i18nId: string;
  @Input() langCode: string;

  constructor(private navigationServ: NavigationService) {}

  public validate(control: AbstractControl) {
    if (!control.value) {
      return Promise.resolve(null);
    }
    return this.navigationServ
      .checkNameExist(this.i18nId, control.value, this.langCode)
      .success((res) => {
        if (res.data) {
          return { existError: true };
        }
        return null;
      })
      .error(() => {
        return { existError: true };
      })
      .toPromise();
  }
}
