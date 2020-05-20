import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppState } from '../core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class PermissionActiveService implements CanActivate {
  constructor(private stateServ: AppState, private messageServ: MessageService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!route.data || !route.data.permission) {
      return true;
    }
    const permission = route.data.permission;
    return this.stateServ.getPromise('permission').then((res) => {
      if (!res) {
        console.warn('has not get permission');
      }
      const permissions: Array<string> = res || [];
      const find = permissions.some((elem) => elem.startsWith(permission));
      if (!find) {
        this.messageServ.add({ severity: 'error', summary: '', detail: '您没有访问权限' });
      }
      return find;
    });
  }
}
