import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { STATUS } from 'src/app/service';

@Pipe({
  name: 'registerManagerStatus'
})
export class RegisterManagerStatusPipe implements PipeTransform {

  constructor(
    private translateService: TranslateService
  ) { }

  transform(value: any, ...args: any[]): any {
    console.log(value);
    switch (Number(value)) {
      case STATUS.NORMAL:
        return this.translateService.instant('service.register.status.normal');
      case STATUS.FORZEN:
        return this.translateService.instant('service.register.status.forzen');
      case STATUS.PEND_TRIAL:
        return this.translateService.instant('service.register.status.pendTrial');
      case STATUS.PEND_REVIEW:
        return this.translateService.instant('service.register.status.pendReview');
      case STATUS.STOP:
        return this.translateService.instant('service.register.status.stop');
      case STATUS.NOT_PASS:
        return this.translateService.instant('service.register.status.notPass');
      case STATUS.BUILD:
        return this.translateService.instant('service.register.status.build');
    }
  }

}
