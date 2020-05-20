import { Injectable } from '@angular/core';
import { AppState, HttpJson } from '../core';
import { ServiceDetailData } from '../service/model';

const GET_SERVICE_ASSOCIATION_TYPE_URL = '/v1/service/association/type'; // 获取关联类型
const GET_AUTO_GET_SERVICE_CODE_URL = '/v1/auto/get/service/code'; // 自动获取服务编码
const GET_SERVICE_EXIST_URL = '/v1/service/exist'; // 服务是否存在    注：关联类型是否存在（暂未做）
const GET_SERVICE_ASSOCIATION_TARGET_LIST_URL = '/v1/service/association/target/list'; // 服务管理目标
const POST_SAVE_SERVICE = '/v1/save/service'; // 保存服务

@Injectable({
  providedIn: 'root'
})
export class ServiceFormService {
  constructor(private appState: AppState, private http: HttpJson) {}

  // 服务是否存在
  public checkServiceExist(params: any): Promise<any> {
    console.log(params);
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    // const apiURL = `/v1/service/${params.serviceId}/${params.services}/exists`;
    return this.http.get(GET_SERVICE_EXIST_URL, { headers, params: params.value }).toPromise();
  }

  // 自动获取服务编码
  public autoGetServiceCode() {
    return this.http.get(GET_AUTO_GET_SERVICE_CODE_URL);
  }

  // 获取关联类型
  public getServiceAssociationType() {
    return this.http.get(GET_SERVICE_ASSOCIATION_TYPE_URL);
  }

  // 获取服务关联目标
  public getServiceAssociationTargetList() {
    return this.http.get(GET_SERVICE_ASSOCIATION_TARGET_LIST_URL);
  }

  // 保存服务
  public postSaveService(serviceDetail: ServiceDetailData) {
    return this.http.post(POST_SAVE_SERVICE, null, null, Object.assign({}, serviceDetail));
  }

  // 加上token
  private createAuthorizationHeader(headers: Headers) {
    headers.append('normal_login_token', this.appState.get('token'));
  }
}
