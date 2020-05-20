import { Injectable } from '@angular/core';
import { HttpJson } from '../core';

const GET_SERVICE_DETAIL_URL = '/v1/service/detail';    // 服务详情

@Injectable({
  providedIn: 'root'
})
export class ServiceDetailService {

  constructor(private http: HttpJson) { }

  // 服务详情
  public getServiceDetail() {
    return this.http.get(GET_SERVICE_DETAIL_URL);
  }

}
