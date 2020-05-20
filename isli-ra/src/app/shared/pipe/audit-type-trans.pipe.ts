import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'auditTypeTrans'
})
export class AuditTypeTransPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    // 游戏审批类别（1 属于《关于移动游戏出版服务管理的通知》第三条范围，2 属于《关于移动游戏出版服务管理的通知》第四条范围
    if (value === 1) {
      return '属于《关于移动游戏出版服务管理的通知》第三条范围';
    } else if (value === 2) {
      return '属于《关于移动游戏出版服务管理的通知》第四条范围';
    }
    return null;
  }

}
