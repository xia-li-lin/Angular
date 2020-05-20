import { PageSearch } from './model/common.model';
import { Injectable } from '@angular/core';
import { HttpJson, AppState, HttpResponse } from '../core';
import { RelevanceTypeInfo, PaginationResult, EntityTypeInfo, AssicuationSearch } from './model';

const HTTP_POST_ASSOCIATION_ADD = '/isli/irms/manage-manager/base/relevancetypeinfo/relevanceTypeAddV1';
const HTTP_POST_ASSOCIATION_UPDATE = '/isli/irms/manage-manager/base/relevancetypeinfo/relevanceTypeUpdateV1';
const HTTP_GET_ASSOCIATION_DETAIL = '/isli/irms/manage-manager/base/relevancetypeinfo/getRelevanceTypeInfo';
const HTTP_GET_ASSOCIATION_LIST = '/isli/irms/manage-manager/base/relevancetypeinfo/getRelevanceTypeList';
const HTTP_GET_ASSOCIATION_NAME_EXIST =
  '/isli/irms/manage-manager/base/relevancetypeinfo/queryRelevanceTypeNameZhExist';
const HTTP_GET_ASSOCIATION_NAME_EN_EXIST =
  '/isli/irms/manage-manager/base/relevancetypeinfo/queryRelevanceTypeNameEnExist';
const HTTP_POST_ASSOCIATION_ENABLE_DISABLE =
  '/isli/irms/manage-manager/base/relevancetypeinfo/updateRelevanceTypeByEnabledFlagV1';
const HTTP_GET_ASSOCIATION_TYPE = '/isli/irms/manage-manager/base/relevancetypeinfo/relevanceTypeListToSc';
const HTTP_GET_ENTITYTYPE_LIST = '/isli/irms/manage-manager/base/relevancetypeinfo/getEntityTypeList';
const HTTP_GET_ENTITY_TYPE = '/isli/irms/manage-field/base/entity/type/v1/allList';

@Injectable({ providedIn: 'root' })
export class ServiceAssociationService {
  constructor(private http: HttpJson, private stateSev: AppState) {}

  // 新增关联类型
  addAssoication(assoication: RelevanceTypeInfo) {
    return this.http.post(HTTP_POST_ASSOCIATION_ADD, {}, {}, assoication);
  }

  // 修改关联类型
  updateAssoication(assoication: RelevanceTypeInfo) {
    return this.http.post(HTTP_POST_ASSOCIATION_UPDATE, {}, {}, assoication);
  }

  // 获取关联类型详情
  getAssocicationDetail(relevanceTypeId: string): HttpResponse<RelevanceTypeInfo> {
    return this.http.get(HTTP_GET_ASSOCIATION_DETAIL, {}, { relevanceTypeId });
  }

  // 获取关联类型列表
  getAssociationList(search: AssicuationSearch, page: PageSearch): HttpResponse<PaginationResult<RelevanceTypeInfo>> {
    return this.http.get(HTTP_GET_ASSOCIATION_LIST, {}, Object.assign({}, search, page));
  }

  // 停用
  disableAssocition(relevanceTypeId: string) {
    return this.http.post(HTTP_POST_ASSOCIATION_ENABLE_DISABLE, {}, {}, { relevanceTypeId, enabledFlag: 'N' });
  }

  // 启用
  enableAssocition(relevanceTypeId: string) {
    return this.http.post(HTTP_POST_ASSOCIATION_ENABLE_DISABLE, {}, {}, { relevanceTypeId, enabledFlag: 'Y' });
  }

  /**
   * 中文名称是否存在
   */
  checkAssocitionNameZhExist(name: string) {
    return this.http.get(HTTP_GET_ASSOCIATION_NAME_EXIST, {}, { relevanceTypeNameZh: name });
  }

  /**
   * 英文名称是否存在
   */
  checkAssocitionNameEnExist(name: string) {
    return this.http.get(HTTP_GET_ASSOCIATION_NAME_EN_EXIST, {}, { relevanceTypeNameEn: name });
  }

  /**
   * 服务界面查看所有的关联类型
   */
  getAssociationType(langCode?: string): HttpResponse<Array<RelevanceTypeInfo>> {
    return this.http.get(
      HTTP_GET_ASSOCIATION_TYPE,
      {},
      { startRow: 0, endRow: 10000, enabledFlag: 'Y', langCode: langCode || this.stateSev.get('language') }
    );
  }

  /**
   * 获取实体类型
   */
  getEntityTypeList(): HttpResponse<Array<EntityTypeInfo>> {
    return this.http.get(HTTP_GET_ENTITYTYPE_LIST);
  }

  /**
   * 获取源类型
   */
  getSourceType() {
    return this.http.get(HTTP_GET_ENTITY_TYPE, {}, { entityType: 1 });
  }

  /**
   * 获取目标类型
   */
  geTargetType() {
    return this.http.get(HTTP_GET_ENTITY_TYPE, {}, { entityType: 2 });
  }
}
