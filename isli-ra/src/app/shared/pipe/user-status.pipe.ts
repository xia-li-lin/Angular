import { userStatus } from './../../service/model/user.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userStatus'
})
export class UserStatusPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const index = userStatus.findIndex((elem) => elem.value === value);
    return index === -1 ? value : userStatus[index].label;
  }
}
