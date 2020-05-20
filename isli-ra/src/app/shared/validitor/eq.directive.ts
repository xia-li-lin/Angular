import { debounceTime } from 'rxjs/operators';
import { Directive, forwardRef, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appEq]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EqDirective),
      multi: true
    }
  ]
})
export class EqDirective implements Validator, OnInit, OnChanges {
  @Input() appEq: any;
  @Input() eqControl: AbstractControl;
  confirmControl: AbstractControl;
  private sub: Subscription;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if ('eqControl' in changes && this.eqControl) {
      if (this.sub) {
        this.sub.unsubscribe();
      }
      this.sub = this.eqControl.valueChanges.pipe(debounceTime(100)).subscribe((value) => {
        // tslint:disable-next-line:no-unused-expression
        this.confirmControl && this.confirmControl.value && this.confirmControl.updateValueAndValidity();
      });
    }
  }

  validate(control: AbstractControl) {
    this.confirmControl = control;
    if (!control.value) {
      return null;
    }
    if (control.value !== this.appEq) {
      return { notEq: true };
    }
    return null;
  }
  ngOnInit(): void {}
}
