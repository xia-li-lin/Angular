import { PaginationResult } from './model/common.model';
import { Injectable } from '@angular/core';
import { HttpJson, HttpResponse } from '../core';
import { SystemLogSearch, PageSearch, AccountRole, SystemLog } from './model';

const HTTP_GET_SYSTEM_LOG_LIST = '/isli/irms/manage-system/base/syslogger/v1/list';
const HTTP_GET_ACCOUNT_ROLE_ALL = '/isli/irms/manage-system/base/syslogger/role/list';

@Injectable({ providedIn: 'root' })
export class SystemLogService {
  constructor(private http: HttpJson) {}

  getSystemLogList(search: SystemLogSearch, page: PageSearch): HttpResponse<PaginationResult<SystemLog>> {
    return this.http.get(HTTP_GET_SYSTEM_LOG_LIST, {}, Object.assign({}, search, page));
  }

  getAllRole(): HttpResponse<Array<AccountRole>> {
    return this.http.get(HTTP_GET_ACCOUNT_ROLE_ALL, {}, { langCode: 'ZH_CN' });
  }
}
