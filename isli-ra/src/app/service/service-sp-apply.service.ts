import { DropDownOption } from './model/common.model';
import { Injectable } from '@angular/core';
import { HttpJson, AppState, HttpResponse } from '../core';
import { ServiceSpApplySearch, PageSearch, ServiceSpApply, PaginationResult, ServiceName, SpService } from './model';

const HTTP_GET_SERVICE_NAME_LIST = '/isli/irms/manage-manager/base/servicenameinfo/getServiceNameInfoList';
const HTTP_GET_SERVICE_LIST = '/isli/irms/manage-manager/base/servicenameinfo/serviceList';
const HTTP_GET_SP_SERVICE_LIST = '/isli/irms/manage-manager/base/servicenameinfo/spServiceList';
const HTTP_GET_SERVICE_NAME_EXCEL_EXPORT = '/isli/irms/manage-manager/base/servicenameinfo/exportExcel';
const HTTP_GET_SP_ACCOUNT_LIST = '/isli/irms/manage-manager/base/tidings/getSPAccountList';
// const HTTP_POST_SERVICE_TIDINGS_ADD = '/isli/irms/manage-manager/base/servicenameinfo/v1/addTidings';

@Injectable({ providedIn: 'root' })
export class ServiceSpApplyService {
  constructor(private http: HttpJson, private stateServ: AppState) {}

  getApplyServiceList(search: ServiceSpApplySearch, page: PageSearch): HttpResponse<PaginationResult<ServiceSpApply>> {
    return this.http.get(HTTP_GET_SERVICE_NAME_LIST, {}, Object.assign({}, search, page));
  }

  getServices(): HttpResponse<Array<ServiceName>> {
    return this.http.get(HTTP_GET_SERVICE_LIST);
  }

  getSpServices(): HttpResponse<Array<SpService>> {
    return this.http.get(HTTP_GET_SP_SERVICE_LIST);
  }

  /**
   * 获取所有SP账号信息
   */
  getSPAccountList(): HttpResponse<Array<DropDownOption>> {
    return this.http.get(HTTP_GET_SP_ACCOUNT_LIST).translate((res) => {
      console.log(res);
      const data = res.map((item) => {
        return {
          label: item.orgName,
          value: item.spEmail,
          unificationId: item.unificationId
        };
      });
      return data;
    });
  }

  exportApplyService(searchParams: ServiceSpApplySearch) {
    const langCode = this.stateServ.get('language') || 'ZH_TW';
    saveAs(
      HTTP_GET_SERVICE_NAME_EXCEL_EXPORT +
        '?' +
        this.http.formatParams(Object.assign({}, searchParams, { langCode, selectedLanguage: langCode })).toString()
    );
  }
}
