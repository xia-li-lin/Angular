import { Injectable } from '@angular/core';

import { HttpJson, AppState, httpMerge, HttpFormUrlencodedService } from '../core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

const POST_LOGIN_URL = '/isli/irms/manage-manager/base/v1/login';
const POST_SEND_VALIDCODE = '/isli/irms/manage-manager/base/v1/sendSMS';
const HTTP_GET_ACCOUNT_DETAIL = '/isli/irms/manage-manager/base/accountInfor/getAccountInfor';
const HTTP_POST_CHANGE_PASSWORD = '/isli/irms/manage-manager/base/accountInfor/modifyPasswd';
const HTTP_POST_ACCOUNT_UPDATE = '/isli/irms/manage-manager/base/accountInfor/updateAccount';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private http: HttpJson,
    private appState: AppState,
    private router: Router,
    private httpMultServ: HttpFormUrlencodedService
  ) {}

  public login(userInfo: any) {
    return this.http.post(POST_LOGIN_URL, {}, {}, userInfo).after((res) => {
      console.log(res);
      if (res && res.success) {
        this.appState.set('user_login_success', '1');
        console.log(this.appState.get('user_login_success'));
      }
    });
  }

  @httpMerge('getAccountInfo')
  public getAccountInfo() {
    return this.http.get(HTTP_GET_ACCOUNT_DETAIL);
  }

  public sendValidCode(username: string) {
    return this.http.post(POST_SEND_VALIDCODE, {}, {}, { mobile: username });
  }

  public canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.checkLogin()) {
      this.router.navigate([ '/login' ]);
      return false;
    }
    return this.checkLogin();
  }

  public checkLogin(): boolean {
    return this.appState.get('user_login_success') === '1';
  }

  public clearLogin() {
    this.appState.set('user_login_success', '0');
  }

  public chanePwd(newPwd: string, oldPwd: string) {
    return this.httpMultServ.post(HTTP_POST_CHANGE_PASSWORD, {}, {}, { oldPassword: oldPwd, password: newPwd });
  }

  public updateAccountInfo(userInfo: any) {
    return this.http.post(HTTP_POST_ACCOUNT_UPDATE, {}, {}, userInfo);
  }
}
