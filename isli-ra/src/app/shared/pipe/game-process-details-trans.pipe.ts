import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gameProcessDetailsTrans'
})
export class GameProcessDetailsTransPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const processData = args[0];
    const version = args[1];
    if (value) {
      let statusName;
      const statusArr = value.split('-');
      if (statusArr.length) {
        processData.forEach((element: any) => {
          if (element.value === statusArr[0]) {
            if (element.data.length) {
              element.data.forEach((ele) => {
                if (ele.value === statusArr[1]) {
                  statusName = ele.data.replace('{version}', 'V' + version);
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
