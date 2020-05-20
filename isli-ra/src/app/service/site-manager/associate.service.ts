import { Injectable } from '@angular/core';
import { HttpJson, HttpResponse } from 'src/app/core';
import { PageSearch, Associate, PaginationResult, AssociateSearch } from '../model';

const HTTP_GET_ASSOCIATE_LIST = '/isli/irms/manage-website/base/associatedService/v1/list';
const HTTP_GET_ASSOCIATE_HIDE_SHOW = '/isli/irms/manage-website/base/associatedService/setIsShow';
const HTTP_GET_ASSOCIATE_SORT = '/isli/irms/manage-website/base/associatedService/updateSort';
const HTTP_POST_ASSOCIATE_UPDATE = '/isli/irms/manage-website/base/associatedService/v1/updateAssociatedService';
const HTTP_POST_ASSOCIATE_DELETE = '/isli/irms/manage-website/base/associatedService/delete';
const HTTP_POST_ASSOCIATE_ADD = '/isli/irms/manage-website/base/associatedService/v1/addAssociatedService';
const HTTP_GET_ASSOCIATE_DETAIL = '/isli/irms/manage-website/base/associatedService/detail';

@Injectable({ providedIn: 'root' })
export class AssociateService {
  constructor(private http: HttpJson) {}

  getAssociateList(search: AssociateSearch, page: PageSearch): HttpResponse<PaginationResult<Associate>> {
    return this.http.get(HTTP_GET_ASSOCIATE_LIST, {}, Object.assign({}, search, page));
  }

  updateAssociateHideShow(id: number, isShow: 0 | 1) {
    return this.http.get(HTTP_GET_ASSOCIATE_HIDE_SHOW, {}, { id, isShow });
  }

  updateAssociateSort(id: number, sort: number) {
    return this.http.get(HTTP_GET_ASSOCIATE_SORT, {}, { id, sort });
  }

  updateAssociate(associate: Associate) {
    return this.http.post(HTTP_POST_ASSOCIATE_UPDATE, {}, {}, associate);
  }

  deleteAssociate(id: number) {
    return this.http.post(HTTP_POST_ASSOCIATE_DELETE, {}, { id }, {});
  }

  addAssociate(associate: Associate) {
    return this.http.post(HTTP_POST_ASSOCIATE_ADD, {}, {}, associate);
  }

  getAssociateDetail(id: number) {
    return this.http.get(HTTP_GET_ASSOCIATE_DETAIL, {}, { id });
  }
}
