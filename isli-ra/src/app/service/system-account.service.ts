import { Injectable } from '@angular/core';

import { HttpJson, HttpResponse, HttpFormUrlencodedService } from '../core';
import { AccountListQueryObj, AccountUserDetailsObj, AccountRole, PaginationResult } from './model';

const GET_ACCOUNT_LIST = '/isli/irms/manage-manager/base/accountManage/accounts'; // 系统账户-列表
const GET_ACCOUNT_DETAILS = '/isli/irms/manage-manager/base/accountManage/accounts/:adminId'; // 系统账户-账户详情
const POST_ACCOUNT_UPDATE = '/isli/irms/manage-manager/base/accountManage/updateAccount'; // 系统账户-修改账户
const HTTP_DELETE_ACCOUNT = '/isli/irms/manage-manager/base/accountManage/{id}'; // 删除账号
const HTTP_GET_ACCOUNT_DISABLE = '/isli/irms/manage-manager/base/accountManage/disable/{id}'; // 禁用账号
const HTTP_GET_ACCOUNT_ENABLE = '/isli/irms/manage-manager/base/accountManage/enable/{id}'; // 启用账号
const HTT_GET_ACCOUNT_NAME_CAN_USE = '/isli/irms/manage-manager/base/accountManage/v1/accountExist'; // 检查账号是否可用
const HTT_GET_ACCOUNT_NAME_CAN_USE_MODIFY = '/isli/irms/manage-manager/base/accountManage/v1/accountEQ1'; // 修改时检查账号是否可用
const HTTP_GET_ACCOUNT_EMAIL_CAN_USE = '/isli/irms/manage-manager/base/accountManage/v1/linkEmailExist';

const HTTP_POST_ACCOUNT_ADD = '/isli/irms/manage-manager/base/accountManage/addAccount';
const HTTP_POST_ACCOUNT_UPDATE = '/isli/irms/manage-manager/base/accountManage/updateAccount';

const HTTP_GET_ACCOUNT_ROLE = '/isli/irms/manage-manager/base/accountManage/getAccountRoles';
const HTTP_GET_ACCOUNT_ROLE_ALL = '/isli/irms/manage-manager/base/roleManage/getRoleListAll';
const HTTP_POST_ACCOUNT_ROLE_UPDATE = '/isli/irms/manage-manager/base/accountManage/updateAccountRoles';

const HTTP_GET_ACCOUNT_PASSWORD_RESET = '/isli/irms/manage-manager/base/accountManage/resetPassword/{accountId}';

@Injectable({
  providedIn: 'root'
})
export class SystemAccountService {
  constructor(private http: HttpJson, private httpUrlEncodeServ: HttpFormUrlencodedService) {}

  getAccountList(query: AccountListQueryObj): HttpResponse<PaginationResult<AccountUserDetailsObj>> {
    return this.httpUrlEncodeServ.post(
      GET_ACCOUNT_LIST,
      {},
      {},
      Object.assign({}, query, { _PAGINATION_FLAG_: '_PAGINATION_REQUIRED_' })
    );
  }

  getAccountDetails(adminId: string) {
    return this.http.get(GET_ACCOUNT_DETAILS, { adminId }, {});
  }

  postUpdateAccount(data: AccountUserDetailsObj) {
    return this.http.post(POST_ACCOUNT_UPDATE, {}, {}, data);
  }

  deleteAccount(adminId: string): HttpResponse<{ success: boolean }> {
    return this.http.delete(HTTP_DELETE_ACCOUNT, { id: adminId });
  }

  disableAccount(adminId: string): HttpResponse<AccountUserDetailsObj> {
    return this.http.get(HTTP_GET_ACCOUNT_DISABLE, { id: adminId });
  }

  enableAccount(adminId: string): HttpResponse<AccountUserDetailsObj> {
    return this.http.get(HTTP_GET_ACCOUNT_ENABLE, { id: adminId });
  }

  /**
   * 新建时检查账号，员工工号是否可用
   * @param account 账号或者员工工号
   */
  checkAccountExsit(account: string): HttpResponse<boolean> {
    return this.http.get(HTT_GET_ACCOUNT_NAME_CAN_USE, {}, { account });
  }

  /**
   * 修改时检查账号，员工工号是否可用
   * @param adminId 账号ID
   * @param account  员工工号
   */
  checkAccountExistForModify(adminId: string, account: string): HttpResponse<boolean> {
    return this.http.get(HTT_GET_ACCOUNT_NAME_CAN_USE_MODIFY, {}, { id: adminId, account });
  }

  checkAccountEMailCanLink(email: string, adminId?: string): HttpResponse<boolean> {
    return this.http.get(HTTP_GET_ACCOUNT_EMAIL_CAN_USE, {}, { email, adminId });
  }

  createAccount(account: AccountUserDetailsObj) {
    return this.http.post(HTTP_POST_ACCOUNT_ADD, {}, {}, account);
  }

  updateAccount(account: AccountListQueryObj) {
    return this.http.post(HTTP_POST_ACCOUNT_UPDATE, {}, {}, account);
  }

  getRoleListAll(): HttpResponse<Array<AccountRole>> {
    return this.http.get(HTTP_GET_ACCOUNT_ROLE_ALL, {}, {});
  }

  getAccountRole(adminId: string): HttpResponse<Array<AccountRole>> {
    return this.httpUrlEncodeServ.get(HTTP_GET_ACCOUNT_ROLE, {}, { id: adminId });
  }

  updateAccountRole(roleIds: Array<string>, adminId: string) {
    return this.httpUrlEncodeServ.post(HTTP_POST_ACCOUNT_ROLE_UPDATE, {}, {}, { adminId, roleIds: roleIds.join(',') });
  }

  resetAccountPassword(email: string, adminId: string) {
    return this.http.get(HTTP_GET_ACCOUNT_PASSWORD_RESET, { accountId: adminId }, { email });
  }
}
