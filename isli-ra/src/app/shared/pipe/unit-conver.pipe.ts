import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitConver'
})
export class UnitConverPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!value) {
      return 0;
    }
    if (args[0] === 'thousand') {
      return value / 1000;
    } else if (args[0] === 'million') {
      return value / 1000000;
    }
    return value;
  }

}
