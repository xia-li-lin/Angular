import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'roleStatus'
})
export class RoleStatusPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (value) {
      return this.translateService.instant('common.enable');
    }
    return this.translateService.instant('common.stop');
  }
  constructor(private translateService: TranslateService) {}
}
