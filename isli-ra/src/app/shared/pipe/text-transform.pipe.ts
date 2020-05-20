import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DATE_SELECTION, DATA_TYPE, SEARCH_STATISTIC_SEARCH_TYPE } from '../../service/model';

@Pipe({
  name: 'textTransform'
})
export class TextTransformPipe implements PipeTransform {

  constructor(
    private translateService: TranslateService
  ) { }

  transform(value: any, ...args: any[]): any {
    if (!value) {
      return null;
    }
    console.log(args);
    if (args[0] === 'serviceCode') {
      switch (value) {
        case DATA_TYPE.SP:
          return this.translateService.instant('statistic.spUser');
        case DATA_TYPE.TIME:
          return this.translateService.instant('statistic.year');
        default:
          return this.translateService.instant('statistic.country');
      }
    } else if (args[0] === 'searchStat' && args[1] === SEARCH_STATISTIC_SEARCH_TYPE.YEAR) {
      switch (value) {
        case SEARCH_STATISTIC_SEARCH_TYPE.YEAR:
          return this.translateService.instant('statistic.year');
        case SEARCH_STATISTIC_SEARCH_TYPE.MONTH:
          return this.translateService.instant('statistic.month');
        default:
          return this.translateService.instant('statistic.day');
      }
    } else if (args[0] === 'searchStat' && args[1] === SEARCH_STATISTIC_SEARCH_TYPE.AREA) {
      switch (value) {
        case SEARCH_STATISTIC_SEARCH_TYPE.AREA:
          return this.translateService.instant('statistic.country');
        default:
          return this.translateService.instant('statistic.provinces');
      }
    } else if (args[0] === 'searchStat' && args[1] === SEARCH_STATISTIC_SEARCH_TYPE.RELATIONTYPE) {
      return this.translateService.instant('statistic.service');
    } else {
      switch (value) {
        case DATE_SELECTION.YEAR:
          return this.translateService.instant('statistic.year');
        case DATE_SELECTION.MONTH:
          return this.translateService.instant('statistic.month');
        default:
          return this.translateService.instant('statistic.day');
      }
    }
  }

}
