import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'showHideTrans'
})
export class ShowHideTransPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (args[0] === 1) {
      return value && value === 1
        ? this.translateService.instant('siteManager.common.hide')
        : this.translateService.instant('siteManager.common.show');
    } else {
      return value && value === 1
        ? this.translateService.instant('siteManager.common.show')
        : this.translateService.instant('siteManager.common.hide');
    }
  }

  constructor(private translateService: TranslateService) {}
}
