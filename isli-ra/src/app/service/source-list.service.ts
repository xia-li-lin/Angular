import { Injectable } from '@angular/core';
import { HttpJson, HttpResponse } from '../core';
import { PageParams, DataStructureOuterLayer, SourceListSearch } from './model';
import { EntityField, SourceList, EntityType, ParamCodeQueryParams } from './model/source-list.model';
import { ControllWorldService } from './control-world.service';

const PARAM_PREFIX = '/isli/irms/manage-field/base/field/param/v1';
const HTTP_GET_ENTITY_ATTR_LIST = PARAM_PREFIX + '/list';
const HTTP_POST_ENTITY_ATTR_ADD = PARAM_PREFIX + '/addParam';
const HTTP_POST_ENTITY_ATTR_UPDATE = PARAM_PREFIX + '/updateParam';
const HTTP_POST_ENTITY_ATTR_DELETE = PARAM_PREFIX + '/deleteParam';
const HTTP_GET_PARAM_CODE_EXIST = PARAM_PREFIX + '/existParamCode'; // 校验属性字段的唯一性/编目是否存在
const ENTITY_PREFIX = '/isli/irms/manage-field/base/entity/type/v1';
const HTTP_GET_SOURCE_LIST = ENTITY_PREFIX + '/list'; // 源列表
const HTTP_POST_SOURCE_DELETE = ENTITY_PREFIX + '/delete'; // 删除源
const HTTP_POST_SOURCE_ADD = ENTITY_PREFIX + '/add';
const HTTP_POST_SOURCE_UPDATE = ENTITY_PREFIX + '/update';
const HTTP_GET_SOURCE_EXIST = ENTITY_PREFIX + '/find';

@Injectable({
  providedIn: 'root'
})
export class SourceListService {
  constructor(private controllWorldServ: ControllWorldService, private http: HttpJson) {}

  // 获取源列表
  getSourceList(search: SourceListSearch, page: PageParams): HttpResponse<DataStructureOuterLayer<SourceList>> {
    return this.http.get(HTTP_GET_SOURCE_LIST, {}, Object.assign({}, search, page));
  }

  addSourceEntity(entity: EntityType) {
    return this.http.post(HTTP_POST_SOURCE_ADD, {}, {}, entity);
  }

  updateSourceEntity(entity: EntityType) {
    return this.http.post(HTTP_POST_SOURCE_UPDATE, {}, {}, entity);
  }

  // 删除源数据
  deleteSourceEntity(entityId: string) {
    console.log(entityId);
    return this.http.post(HTTP_POST_SOURCE_DELETE, {}, {}, { entityId });
  }

  checkSourceEntityExist(entity: EntityType) {
    return this.http.get(HTTP_GET_SOURCE_EXIST, {}, entity);
  }

  getEntityAttrs(page: PageParams, entityId?: number): HttpResponse<DataStructureOuterLayer<EntityField>> {
    return this.http.get(HTTP_GET_ENTITY_ATTR_LIST, {}, Object.assign({}, { entityId }, page));
  }

  addEntityAttr(entityField: EntityField) {
    return this.http.post(HTTP_POST_ENTITY_ATTR_ADD, {}, {}, entityField);
  }

  updateEntityAttr(entityField: EntityField) {
    return this.http.post(HTTP_POST_ENTITY_ATTR_UPDATE, {}, {}, entityField);
  }

  deleteEntityAttr(paramId: number) {
    return this.http.post(HTTP_POST_ENTITY_ATTR_DELETE, {}, {}, { paramId });
  }

  // 获取受控词列表
  getControllWordList(search, page: PageParams) {
    return this.controllWorldServ.getControllWordList(search, page);
  }

  // 校验属性字段的唯一性/编目是否存在
  checkParamCodeExist(paramCodeQueryParams: ParamCodeQueryParams) {
    return this.http.post(HTTP_GET_PARAM_CODE_EXIST, {}, Object.assign({}, paramCodeQueryParams), {});
  }
}
