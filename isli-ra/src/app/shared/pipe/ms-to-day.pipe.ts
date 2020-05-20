import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msToDay'
})
export class MsToDayPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const val = Number(value);
    const day = Math.ceil(val / 1000 / 60 / 60 / 24);
    return day;
  }

}
