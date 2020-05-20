import { Injectable } from '@angular/core';
import { HttpJson, HttpResponse } from '../core';
import { PageParams, ServiceSearch, PaginationResult, ServiceInfo, RelevanceTypeInfo } from '../service/model';

const INTERFACE_PREFIX = '/isli/irms/manage-manager/base/serviceinfo';
const HTTP_GET_SERVICE_LIST = INTERFACE_PREFIX + '/serviceInfoListV1'; // 服务列表
const HTTP_SERVICE_ADD = INTERFACE_PREFIX + '/serviceInfoAddV1';
const HTTP_SERVICE_UPDATE = INTERFACE_PREFIX + '/serviceInfoUpdateV1';
const HTTP_SERVICE_ALL = INTERFACE_PREFIX + '/getServiceInfos';
const HTTP_SERVICE_DETAIL = INTERFACE_PREFIX + '/detail';
const HTTP_SERVICE_CODE_GENERATE = INTERFACE_PREFIX + '/gainServiceCode';
const HTTP_SERVICENAME_ZH_EXIST = INTERFACE_PREFIX + '/queryServiceNameZhExist';
const HTTP_SERVICENAME_EN_EXIST = INTERFACE_PREFIX + '/queryServiceNameEnExist';
const HTTP_RELEVANCETYPR_HAS_USED = INTERFACE_PREFIX + '/queryRelevanceTypeIdsExist';
const HTTP_GET_DISTRICT_ROW_LIST = '/v1/service/district/row/list'; // 区行列表---暂时不做
const HTTP_POST_SERVICE_PUSH = '/v1/service/:id'; // 确定---服务推送---暂时不做

@Injectable({
  providedIn: 'root'
})
export class ServiceListService {
  private pageParams = new PageParams();

  constructor(private http: HttpJson) {}

  // 获取服务列表
  public getServiceList(
    pageIndex = this.pageParams.pageIndex,
    pageRows = this.pageParams.pageRows,
    queryParams: ServiceSearch
  ): HttpResponse<PaginationResult<ServiceInfo>> {
    return this.http.get(HTTP_GET_SERVICE_LIST, null, Object.assign({}, queryParams, { pageIndex, pageRows }));
  }

  // 新增服务
  public addService(serviceInfo: any) {
    const { serviceWordUrlFileName, serviceWordUrlFileNameEn, ...data } = serviceInfo;
    return this.http.post(HTTP_SERVICE_ADD, {}, {}, Object.assign({}, data));
  }

  // 修改服务
  public updateService(serviceInfo: any) {
    const { serviceWordUrlFileName, serviceWordUrlFileNameEn, ...data } = serviceInfo;
    return this.http.post(HTTP_SERVICE_UPDATE, {}, {}, Object.assign({}, data));
  }

  public getAllService(): HttpResponse<Array<ServiceInfo>> {
    return this.http.get(HTTP_SERVICE_ALL);
  }

  // 获取服务详情
  public getServiceDetail(
    serviceInfoId: string
  ): HttpResponse<{ service: ServiceInfo; relevanceList: Array<RelevanceTypeInfo> }> {
    return this.http.get(HTTP_SERVICE_DETAIL, {}, { serviceInfoId });
  }

  // 检查服务名称是否存在---中文
  public checkServiceNameZhExist(serviceName: string) {
    return this.http.get(HTTP_SERVICENAME_ZH_EXIST, {}, { serviceNameZh: serviceName });
  }

  // 检查服务名称是否存在---英文
  public checkServiceNameEnExist(serviceName: string) {
    return this.http.get(HTTP_SERVICENAME_EN_EXIST, {}, { serviceNameEn: serviceName });
  }
  /**
   * 自动生成服务编码
   * @param serviceCode 用户填写的固定编码
   * errorCode: 10000002 服务编码已经被占用
   */
  public generateServiceCode(serviceCode?: string): HttpResponse<string> {
    return this.http.get(HTTP_SERVICE_CODE_GENERATE, {}, { serviceCodeZh: serviceCode });
  }

  // 检查关联类型是否存在
  public checkRelevanceTypeIdExist(relevanceType: string) {
    return this.http.get(HTTP_RELEVANCETYPR_HAS_USED, {}, { relevanceTypeZh: relevanceType });
  }

  // 获取区行列表
  public getDistrictRowList() {
    return this.http.get(HTTP_GET_DISTRICT_ROW_LIST);
  }

  // 确定---服务推送
  public postServicePush(id: string, servicePush: Array<any>) {
    return this.http.post(HTTP_POST_SERVICE_PUSH, { id }, null, Object.assign({}, servicePush));
  }
}
