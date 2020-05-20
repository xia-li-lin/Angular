import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gameStatusTrans'
})
export class GameStatusTransPipe implements PipeTransform {
  transform(value: any, args: any[]): any {
    if (value) {
      let statusName;
      const statusArr = value.split('-');
      if (statusArr.length) {
        args.forEach((element) => {
          if (element.value === statusArr[0]) {
            if (element.data.length) {
              element.data.forEach((ele) => {
                if (ele.value === statusArr[1]) {
                  statusName = ele.label;
                }
              });
            }
          }
        });
        return statusName;
      }
      return null;
    }
  }
}
