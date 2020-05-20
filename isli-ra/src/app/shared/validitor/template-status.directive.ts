import { Directive, forwardRef, Input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl, AsyncValidator } from '@angular/forms';

import { EmailTemplateService } from 'src/app/service';

@Directive({
  selector: '[appTemplateStatus]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => TemplateStatusDirective),
      multi: true
    }
  ]
})
export class TemplateStatusDirective implements AsyncValidator {
  @Input() oldStatus: string;

  constructor(private emailTemplateService: EmailTemplateService) {}

  public validate(control: AbstractControl) {
    const status = control.value;
    if (!status || this.oldStatus === status) {
      return Promise.resolve(null);
    }
    return this.emailTemplateService
      .getEmailTemplateByStatus(status)
      .success((res) => {
        console.log('account----', res.data);
        if (res.data && res.data.length) {
          return { existError: true };
        } else {
          return null;
        }
      })
      .toPromise();
  }
}
