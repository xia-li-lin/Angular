import { Pipe, PipeTransform } from '@angular/core';
import { blockStatus } from 'src/app/service/model/area-manager.model';

@Pipe({
  name: 'blockStatus'
})
export class BlockStatusPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const index = blockStatus.findIndex(elem => elem.value === value);
    return index === -1 ? value : blockStatus[index].label;
  }
}
