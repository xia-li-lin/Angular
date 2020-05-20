import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'accountStatus'
})
export class AccountStatusPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (value) {
      if ('' + value === '1') {
        return this.translateService.instant('systemAccount.list.normal');
      } else {
        return this.translateService.instant('common.stop');
      }
    }
    return null;
  }
  constructor(private translateService: TranslateService) {}
}
