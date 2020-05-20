import { Pipe, PipeTransform } from '@angular/core';
import { ATTR_TYPE } from 'src/app/service/model';

@Pipe({
  name: 'attrType'
})
export class AttrTypePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    console.log(value);
    switch (value) {
      case ATTR_TYPE.SINGLE_LINE_TEXT:
        return '单行文本';
      case ATTR_TYPE.INTERGER:
        return '整数';
      case ATTR_TYPE.DATE:
        return '日期';
      case ATTR_TYPE.TIME:
        return '时间';
      case ATTR_TYPE.MULTILINE_TEXT:
        return '多行文本';
      case ATTR_TYPE.CONTROLLED:
        return '受控词';
      default:
        return '';
    }
  }
}
