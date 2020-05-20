import { Pipe, PipeTransform } from '@angular/core';
import { PARAM_TYPE } from 'src/app/service/model';

@Pipe({
  name: 'catalogType'
})
export class CatalogTypePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    switch (value) {
      case PARAM_TYPE.MUST_READ:
        return '必读';
      case PARAM_TYPE.COMMON:
        return '普通';
      case PARAM_TYPE.READ_ONLY:
        return '只读';
      case PARAM_TYPE.INVISIBLE:
        return '不可见';
      case PARAM_TYPE.CONTROLLED_WORD_OPTION_VALUE:
        return '受控词选项值';
      default:
        return '';
    }
  }
}
