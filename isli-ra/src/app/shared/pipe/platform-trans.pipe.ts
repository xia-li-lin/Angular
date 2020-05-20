import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'platformTrans'
})
export class PlatformTransPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    // platform字段0:安卓；1:苹果
    if (value === 1) {
      return 'iOS';
    } else {
      return 'android';
    }
  }

}
