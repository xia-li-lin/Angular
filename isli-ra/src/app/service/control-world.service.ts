import { PageParams } from 'src/app/service';
import { Injectable } from '@angular/core';
import { HttpJson, HttpResponse } from '../core';
import { ControllWord, ControllWordAttr, DataStructureOuterLayer } from './model';

const HTTP_GET_CONTROLL_WORD_LIST = '/isli/irms/manage-field/base/controlled/v1/list';
const HTTP_POST_CONTROLL_WORD_ADD = '/isli/irms/manage-field/base/controlledManager/v1/saveControlled';
const HTTP_POST_CONTROLL_WORD_UPDATE = '/isli/irms/manage-field/base/controlledManager/v1/updateControlled';
const HTTP_POST_CONTROLL_WORD_DELETE = '/isli/irms/manage-field/base/controlledManager/v1/deleteControlled';
const HTTP_GET_CONTROLL_WORD_ATTR_LIST = '/isli/irms/manage-field/base/controlled/v1/itemPageList';
const HTTP_POST_CONTROLL_WORD_ATTR_ADD = '/isli/irms/manage-field/base/controlledManager/v1/saveControlledItem';
const HTTP_POST_CONTROLL_WORD_ATTR_UPDATE = '/isli/irms/manage-field/base/controlledManager/v1/updateControlledItem';
const HTTP_POST_CONTROLL_WORD_ATTR_DELETE = '/isli/irms/manage-field/base/controlledManager/v1/deleteControlledItem';

@Injectable({ providedIn: 'root' })
export class ControllWorldService {
  constructor(private http: HttpJson) {}

  getControllWordList(search, page: PageParams): HttpResponse<DataStructureOuterLayer<ControllWord>> {
    return this.http.get(HTTP_GET_CONTROLL_WORD_LIST, {}, Object.assign({}, search || {}, page));
  }

  addControllWord(controllWord: ControllWord) {
    return this.http.post(HTTP_POST_CONTROLL_WORD_ADD, {}, {}, controllWord);
  }

  updateControllWord(controllWord: ControllWord) {
    return this.http.post(HTTP_POST_CONTROLL_WORD_UPDATE, {}, {}, controllWord);
  }

  deleteControllWord(controlledId: string) {
    return this.http.post(HTTP_POST_CONTROLL_WORD_DELETE, {}, {}, { controlledId });
  }

  getControllWordAttrList(
    controlledId: string,
    page: PageParams
  ): HttpResponse<DataStructureOuterLayer<ControllWordAttr>> {
    console.log(page);
    return this.http.get(HTTP_GET_CONTROLL_WORD_ATTR_LIST, {}, Object.assign({}, page, { controlledId }));
  }

  addControllWordAttr(controllWordAttr: ControllWordAttr) {
    return this.http.post(HTTP_POST_CONTROLL_WORD_ATTR_ADD, {}, {}, controllWordAttr);
  }

  updateControllWordAttr(controllWordAttr: ControllWordAttr) {
    return this.http.post(HTTP_POST_CONTROLL_WORD_ATTR_UPDATE, {}, {}, controllWordAttr);
  }

  deleteControllWordAttr(itemId: string) {
    return this.http.post(HTTP_POST_CONTROLL_WORD_ATTR_DELETE, {}, {}, { itemId });
  }
}
