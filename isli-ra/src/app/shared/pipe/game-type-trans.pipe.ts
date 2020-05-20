import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gameTypeTrans'
})
export class GameTypeTransPipe implements PipeTransform {
  transform(value: any, args: any[]): any {
    console.log(args);
    const val = Number(value);
    let label = '未知';
    if (args && args.length) {
      args.forEach((ele) => {
        if (val === ele.value) {
          label = ele.label;
        }
      });
    }
    return label;
  }
}
