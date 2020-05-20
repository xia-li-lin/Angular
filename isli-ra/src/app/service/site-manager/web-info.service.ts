import { Injectable } from '@angular/core';
import { HttpJson, HttpResponse } from 'src/app/core';
import { Contact } from '../model';

const HTTP_GET_WEB_INFO_LIST = '/isli/irms/manage-website/base/information/websiteInformationV1';
const HTTP_POST_WEB_INFO_LIST_UPDATE = '/isli/irms/manage-website/base/information/saveContactList';
const HTTP_POST_WEB_INFO_ADD = '/isli/irms/manage-website/base/information/addContact';
const HTTP_POST_WEB_INFO_UPDATE = '/isli/irms/manage-website/base/information/updateContact';

@Injectable({ providedIn: 'root' })
export class WebInfoService {
  constructor(private http: HttpJson) {}

  getWebInfo(): HttpResponse<{ links: Array<Contact>; copyrights: Array<Contact> }> {
    return this.http.get(HTTP_GET_WEB_INFO_LIST, {}, { langCode: '' });
  }

  updateWebInfoList(list: Array<Contact>) {
    return this.http.post(HTTP_POST_WEB_INFO_LIST_UPDATE, {}, {}, list);
  }

  // 添加“联系我们” 内容项
  addWebInfo(contact: Contact) {
    return this.http.post(HTTP_POST_WEB_INFO_ADD, {}, {}, contact);
  }

  // 更新“联系我们” 内容项
  updateWebInfo(contact: Contact) {
    return this.http.post(HTTP_POST_WEB_INFO_UPDATE, {}, {}, contact);
  }
}
