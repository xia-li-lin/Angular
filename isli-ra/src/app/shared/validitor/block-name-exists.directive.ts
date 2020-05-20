import { Directive, forwardRef, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl, AsyncValidator } from '@angular/forms';
import { AreaManagerService } from 'src/app/service';

@Directive({
  selector: '[appValidBlockName]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => ValidBlockNameDirective),
      multi: true
    }
  ]
})
export class ValidBlockNameDirective implements AsyncValidator {
  constructor(private areaManagerServ: AreaManagerService) {}
  @Input() oldName: string;
  public validate(control: AbstractControl) {
    const blockName = control.value;
    if (!blockName || this.oldName === blockName) {
      return Promise.resolve(null);
    }
    return this.areaManagerServ
      .checkAreaBlockName(blockName)
      .success(() => {
        return null;
      })
      .error(() => {
        return { existError: true };
      })
      .toPromise();
  }
}
