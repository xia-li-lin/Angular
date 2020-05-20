import { PaginationResult } from './../model/common.model';
import { Injectable } from '@angular/core';
import { HttpJson, HttpResponse } from 'src/app/core';
import { PageSearch, ConsultingSearch, Consulting, ConsultNav, WebFile } from '../model';

const HTTP_GET_CONSULTING_LIST = '/isli/irms/manage-website/base/consulting/v1/list';
const HTTP_POST_CONSULTING_DELETE = '/isli/irms/manage-website/base/consulting/delete';
const HTTP_POST_CONSULTING_ADD = '/isli/irms/manage-website/base/consulting/v1/addConsulting';
const HTTP_POST_CONSULTING_UPDATE = '/isli/irms/manage-website/base/consulting/v1/updateConsulting';
const HTTP_GET_CONSULTING_HIDE_SHOW = '/isli/irms/manage-website/base/consulting/setIsShow';
const HTTP_GET_CONSULTING_SORT = '/isli/irms/manage-website/base/consulting/updateSort';
const HTTP_GET_CONSULTING_NAVS = '/isli/irms/manage-website/base/consulting/getNavNames';
const HTTP_GET_CONSULTING_DETAIL = '/isli/irms/manage-website/base/consulting/detail';

@Injectable({ providedIn: 'root' })
export class ConsultingService {
  constructor(private http: HttpJson) {}

  getConsultList(search: ConsultingSearch, page: PageSearch): HttpResponse<PaginationResult<Consulting>> {
    return this.http.get(HTTP_GET_CONSULTING_LIST, {}, Object.assign({}, search, page));
  }

  hideOrShowConsult(id: number, isShow: number) {
    return this.http.get(HTTP_GET_CONSULTING_HIDE_SHOW, {}, { id, isShow });
  }

  updateConsultSort(id: number, sort: number) {
    return this.http.get(HTTP_GET_CONSULTING_SORT, {}, { id, sort });
  }

  deleteConsult(id: number) {
    return this.http.post(HTTP_POST_CONSULTING_DELETE, {}, { id }, {});
  }

  updateConsult(consult: Consulting) {
    return this.http.post(HTTP_POST_CONSULTING_UPDATE, {}, {}, consult);
  }

  addConsult(consult: Consulting) {
    return this.http.post(HTTP_POST_CONSULTING_ADD, {}, {}, consult);
  }

  getConsultNavs(langCode: string): HttpResponse<Array<ConsultNav>> {
    return this.http.get(HTTP_GET_CONSULTING_NAVS, {}, { langCode });
  }

  getconsultDetail(id: number): HttpResponse<{ consulting: Consulting; files: Array<WebFile> }> {
    return this.http.get(HTTP_GET_CONSULTING_DETAIL, {}, { id });
  }
}
