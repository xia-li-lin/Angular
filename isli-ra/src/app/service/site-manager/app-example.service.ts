import { Injectable } from '@angular/core';
import { HttpJson, HttpResponse, HttpFormUrlencodedService } from 'src/app/core';
import { AppExampleSearch, PageSearch, AppExample, PaginationResult, WebFile } from '../model';

const HTTP_GET_APPEXAMPLE_LIST = '/isli/irms/manage-website/base/applicationexample/v1/list';
const HTTP_GET_APPEXAMPLE_HIDE_SHOW = '/isli/irms/manage-website/base/applicationexample/setIsShow';
const HTTP_GET_APPEXAMPLE_SORT = '/isli/irms/manage-website/base/applicationexample/updateSort';
const HTTP_POST_APPEXAMPLE_UPDATE = '/isli/irms/manage-website/base/applicationexample/v1/updateApplicationExample';
const HTTP_POST_APPEXAMPLE_DELETE = '/isli/irms/manage-website/base/applicationexample/delete';
const HTTP_POST_APPEXAMPLE_ADD = '/isli/irms/manage-website/base/applicationexample/v1/addApplicationExample';
const HTTP_GET_APPEXAMPLE_DETAIL = '/isli/irms/manage-website/base/applicationexample/detail';

@Injectable({ providedIn: 'root' })
export class AppExampleService {
  constructor(private http: HttpJson, private httpFormUrlencodedSer: HttpFormUrlencodedService) {}

  getAppExampleList(search: AppExampleSearch, page: PageSearch): HttpResponse<PaginationResult<AppExample>> {
    return this.http.get(HTTP_GET_APPEXAMPLE_LIST, {}, Object.assign({}, search, page));
  }

  getAppExampleDetail(id: number): HttpResponse<{ appExample: AppExample; files: Array<WebFile> }> {
    return this.http.get(HTTP_GET_APPEXAMPLE_DETAIL, {}, { id });
  }

  updateAppExampleHideShow(id: number, isShow: 0 | 1) {
    return this.http.get(HTTP_GET_APPEXAMPLE_HIDE_SHOW, {}, { id, isShow });
  }

  updateAppExampleSort(id: number, sort: number) {
    return this.http.get(HTTP_GET_APPEXAMPLE_SORT, {}, { id, sort });
  }

  updateAppExample(appExample: AppExample) {
    return this.http.post(HTTP_POST_APPEXAMPLE_UPDATE, {}, {}, appExample);
  }

  deleteAppExample(id: number) {
    return this.http.post(HTTP_POST_APPEXAMPLE_DELETE, {}, { id }, {});
  }

  addAppExample(appExample: AppExample) {
    return this.http.post(HTTP_POST_APPEXAMPLE_ADD, {}, {}, appExample);
  }
}
