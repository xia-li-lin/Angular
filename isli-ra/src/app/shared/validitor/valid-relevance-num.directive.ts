import { Directive, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, FormGroup } from '@angular/forms';

@Directive({
  selector: '[appValidRelevanceNum]',
  providers: [ { provide: NG_VALIDATORS, useExisting: ValidRelevanceNumDirective, multi: true } ]
})
export class ValidRelevanceNumDirective implements OnChanges {
  @Input() relevanceLength: string;

  private control;

  ngOnChanges(changes: SimpleChanges) {
    if ('relevanceLength' in changes && this.relevanceLength) {
      if (this.control) {
        this.control.updateValueAndValidity();
      }
    }
  }

  constructor() {}

  public validate(control: FormGroup) {
    this.control = control;
    const value = control.value;
    if (!value) {
      return;
    }
    const arr = value.split(',');
    console.log(arr, typeof this.relevanceLength);

    const num = arr.map(Number).reduce((item, total) => {
      return (total += item);
    });
    // tslint:disable-next-line:triple-equals
    if (!isNaN(num) && num == this.relevanceLength) {
      console.log(1);

      return null;
    }
    console.log(2);

    return { pattern: true };
  }
}
