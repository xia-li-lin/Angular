import { userGroups } from './../../service/model/user.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userGroup'
})
export class UserGroupPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const index = userGroups.findIndex((elem) => elem.value === value);
    return index === -1 ? value : userGroups[index].label;
  }
}
