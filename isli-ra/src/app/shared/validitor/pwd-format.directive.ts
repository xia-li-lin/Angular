import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appPwdFormat]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PwdFormatDirective),
      multi: true
    }
  ]
})
export class PwdFormatDirective implements Validator {
  constructor() {}

  validate(control: AbstractControl) {
    if (!control.value) {
      return null;
    }
    if (/\d/.test(control.value) && /[A-Za-z]/.test(control.value)) {
      return null;
    }
    return { format: true };
  }
}
