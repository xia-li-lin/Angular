import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msToHour'
})
export class MsToHourPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value) {
      const val = Number(value);
      const hh = Math.floor(val / 1000 / 60 / 60);
      const hhStr = hh > 0 ? hh + '小时' : '';
      const mm = Math.ceil(val / 1000 / 60 - hh * 60);
      const mmStr = mm > 0 ? mm + '分钟' : '0分钟';
      console.log('hh', hh);
      console.log('mm', mm);
      return hhStr + mmStr;
    }
    return '--';
  }

}
