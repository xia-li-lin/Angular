import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'languageStatus'
})
export class LanguageStatusPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (value && value === 1) {
      return this.translateService.instant('systemLanguage.list.notStart');
    } else {
      return this.translateService.instant('systemLanguage.list.start');
    }
  }
  constructor(private translateService: TranslateService) {}
}
