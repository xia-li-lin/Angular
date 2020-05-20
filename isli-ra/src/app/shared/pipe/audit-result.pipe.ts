import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'auditResult'
})
export class AuditResultPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    switch (value) {
      case 'Y':
        return 'service.register.dialog.pass';
      case 'N':
        return 'service.register.dialog.notPass';
      default:
        return null;
    }
  }
}
