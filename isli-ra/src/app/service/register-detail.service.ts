import { Injectable } from '@angular/core';
import { HttpJson } from '../core';
import { STATUS } from './model';

const GET_SERVICE_REGISTER_DETAIL_URL = '/isli/irms/manage-servicecode/base/scManager/v1/toView'; // 服务服务登记详情信息

@Injectable({
  providedIn: 'root'
})
export class RegisterDetailService {
  constructor(private http: HttpJson) {}

  // 获取服务登记详情信息
  public getServiceRegisterDetail(id: string, status: STATUS | string) {
    return this.http.get(GET_SERVICE_REGISTER_DETAIL_URL, {}, { scId: id });
  }
}
