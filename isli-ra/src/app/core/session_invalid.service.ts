import { Injectable } from '@angular/core';

import { HTTP_HOOKS, HttpHookService } from './http';
import { AppState } from './app-state.service';
import { SUBJECT, SubjectService } from './subject';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable()
export class SessionInvalid {
  public called = false;
  state: AppState;

  constructor(
    private httpHook: HttpHookService,
    private sub: SubjectService,
    private messageServ: MessageService,
    private router: Router
  ) {
    httpHook.registerHttpHook(HTTP_HOOKS.HTTP_ERROR, (req, res) => {
      if (res !== 200 && res !== 401 && res !== 302 && res !== 0) {
        this.messageServ.clear();
        this.messageServ.add({ severity: 'error', summary: '系统调用', detail: '服务异常' });
        return;
      }

      // if (res && res.response && (res.response.status !== 401)) {
      //     return;
      // }
      if (this.called) {
        return;
      }
      this.called = true;

      if (res === 401 || res === 302 || res === 0) {
        this.called = false;
        router.navigateByUrl('/login');
      }
    });

    httpHook.registerHttpHook(HTTP_HOOKS.HTTP_FALIES, (_, res) => {
      if (res && res.code === 'GM-00090005') {
        router.navigateByUrl('/login');
      }
    });
  }
}
