import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appIntMaxMin]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IntMaxMinDirective),
      multi: true
    }
  ]
})
export class IntMaxMinDirective implements Validator {
  @Input() min: number;
  @Input('appIntMaxMin') max: number;
  constructor() {}

  validate(control: AbstractControl) {
    const intVal = Number(control.value);
    if (Number.isNaN(intVal)) {
      return null;
    }
    if (this.min && intVal < Number(this.min)) {
      return { min: intVal };
    }
    if (this.max && intVal > Number(this.max)) {
      return { max: intVal };
    }
    return null;
  }
}
