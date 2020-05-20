import { Injectable } from '@angular/core';
import { HttpJson, AppState, HttpFormUrlencodedService } from '../core';
import { httpCacheForEver } from '../core/cache';
import { SPAccountSearch, PageSearch, LcAccountSearch, USER_STATUS } from './model';

const HTTP_GET_PERMISSION = '/isli/irms/manage-manager/base/accountInfor/perms';
const HTTP_GET_LC_USERS = '/isli/irms/manage-usercenter/base/lcAccount/selPageList';
const HTTP_GET_LC_USERS_DETAIL = '/isli/irms/manage-usercenter/base/lcAccount/details';
const HTTP_POST_LC_USERS_ENABLE = '/isli/irms/manage-usercenter/base/lcAccount/enable';
const HTTP_POST_LC_USERS_FREEZE = '/isli/irms/manage-usercenter/base/lcAccount/disable';
const HTTP_POST_LC_USERS_STOP = '/isli/irms/manage-usercenter/base/lcAccount/disable';
const HTTP_GET_LC_USERS_AUTH_INFO = '/isli/irms/manage-usercenter/base/lcAccount/selRegisterBlockAuthPageList';
const HTTP_GET_SP_ACCOUNT_LIST = '/isli/irms/manage-provider/base/serviceProviderAccount/v1/serviceProviderAccounts';
const HTTP_GET_SP_USERS_DETAIL = '/isli/irms/manage-provider/base/serviceProviderAccount/serviceProviderAccounts/{id}';
const HTTP_POST_SP_USERS_ENABLE = '/isli/irms/manage-provider/base/serviceProviderAccount/changeStatus';
const HTTP_POST_SP_USERS_FREEZE = '/isli/irms/manage-provider/base/serviceProviderAccount/changeStatus';
const HTTP_POST_SP_USERS_STOP = '/isli/irms/manage-provider/base/serviceProviderAccount/changeStatus';

@Injectable()
export class UserService {
  constructor(private http: HttpJson, private stateServ: AppState, private httpMultiServ: HttpFormUrlencodedService) {}

  @httpCacheForEver('getPermission')
  getPermission() {
    return this.http.get(HTTP_GET_PERMISSION);
  }

  getLCUsers(search: LcAccountSearch, page: PageSearch) {
    return this.http.get(HTTP_GET_LC_USERS, {}, Object.assign({}, search, page));
  }

  getLCUserAuth(userId: string) {
    return this.http.get(HTTP_GET_LC_USERS_AUTH_INFO, {}, { unificationId: userId, type: 1 });
  }

  getSPUserAuth(userId: string) {
    return this.http.get(HTTP_GET_LC_USERS_AUTH_INFO, {}, { unificationId: userId, type: 2 });
  }

  getLCUserDetail(userId: string) {
    return this.http.get(HTTP_GET_LC_USERS_DETAIL, {}, { unificationId: userId });
  }

  enableLCUser(userId: string, reason: string) {
    return this.http.post(
      HTTP_POST_LC_USERS_ENABLE,
      {},
      { unificationId: userId, optDesc: reason },
      { optDesc: reason }
    );
  }

  freezeLCUser(userId: string, reason: string) {
    return this.http.post(
      HTTP_POST_LC_USERS_FREEZE,
      {},
      { unificationId: userId, optDesc: reason },
      { optDesc: reason }
    );
  }

  stopLCUser(userId: string, reason: string) {
    return this.http.post(HTTP_POST_LC_USERS_STOP, {}, { unificationId: userId, optDesc: reason }, { optDesc: reason });
  }

  getSPUsers(search: SPAccountSearch, page: PageSearch) {
    return this.http.get(HTTP_GET_SP_ACCOUNT_LIST, {}, Object.assign({}, search, page)).translate((data) => {
      const language: string = this.stateServ.get('language') || 'ZH_TW';
      if (language.toLowerCase().indexOf('zh') !== -1) {
        (data.list || []).forEach((elem) => {
          Object.keys(elem).forEach((keyName) => {
            if (keyName.endsWith('Zh')) {
              const propertyName = keyName.substring(0, keyName.length - 2);
              elem[propertyName] = elem[keyName] || elem[propertyName + 'En'];
            }
          });
        });
      } else {
        (data.list || []).forEach((elem) => {
          Object.keys(elem).forEach((keyName) => {
            if (keyName.endsWith('En')) {
              const propertyName = keyName.substring(0, keyName.length - 2);
              elem[propertyName] = elem[keyName] || elem[propertyName + 'Zh'];
            }
          });
        });
      }
      return data;
    });
  }

  getSPUserDetail(userId: string) {
    return this.http.get(HTTP_GET_SP_USERS_DETAIL, { id: userId }, {});
  }

  enableSPUser(userId: string, reason: string) {
    return this.httpMultiServ.post(
      HTTP_POST_SP_USERS_ENABLE,
      {},
      {},
      { id: userId, status: USER_STATUS.NORMAIL, reason }
    );
  }

  freezeSPUser(userId: string, reason: string) {
    return this.httpMultiServ.post(
      HTTP_POST_SP_USERS_FREEZE,
      {},
      {},
      { id: userId, status: USER_STATUS.FREEZE, reason }
    );
  }

  stopSPUser(userId: string, reason: string) {
    return this.http.post(HTTP_POST_SP_USERS_STOP, {}, { unificationId: userId }, { reason });
  }
}
