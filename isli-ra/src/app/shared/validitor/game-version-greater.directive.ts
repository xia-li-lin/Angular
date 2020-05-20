import { Directive, Input, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appGameVersionGreater]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => GameVersionGreaterDirective),
      multi: true
    }
  ]
})
export class GameVersionGreaterDirective implements Validator {
  @Input() appGameVersionGreater: string;
  @Input() readOnly = false;

  constructor() {}

  validate(control: AbstractControl) {
    if (this.readOnly) {
      return null;
    }
    if (control.value && this.appGameVersionGreater && this.appGameVersionGreater >= control.value) {
      return { versionGreater: true };
    }
    return null;
  }
}
