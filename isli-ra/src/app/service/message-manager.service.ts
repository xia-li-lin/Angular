import { Injectable } from '@angular/core';
import { HttpJson, HttpResponse } from '../core';
import { MessageSearch, MessageManager, SPAccount } from './model/message-manager.model';
import { PaginationResult, PageSearch, DropDownOption, WebFile } from './model';
import { CommonService } from './common.service';

const HTTP_GET_MESSAGE_LIST = '/isli/irms/manage-manager/base/tidings/list';
const HTTP_POST_MESSAGE = '/isli/irms/manage-manager/base/tidings/addTidings';
const HTTP_DELETE_MESSAGE = '';
const HTTP_GET_SP_ACCOUNT_LIST = '/isli/irms/manage-manager/base/tidings/getSPAccountList';

@Injectable({ providedIn: 'root' })
export class MessageManagerService {
  constructor(private http: HttpJson, private commonServ: CommonService) {}

  /**
   * 获取消息列表
   */
  getMessageList(search: MessageSearch, page: PageSearch): HttpResponse<PaginationResult<MessageManager>> {
    return this.http.get(HTTP_GET_MESSAGE_LIST, {}, Object.assign({}, search, page));
  }

  addMessage(messages: Array<MessageManager>): HttpResponse<string> {
    return this.http.post(HTTP_POST_MESSAGE, {}, {}, messages);
  }
  /**
   * 获取所有SP账号信息
   */
  getSPAccountList(): HttpResponse<Array<DropDownOption>> {
    return this.http.get(HTTP_GET_SP_ACCOUNT_LIST).translate((res) => {
      console.log(res);
      const data = res.map((item: SPAccount) => {
        return new DropDownOption(item.orgName, item.spEmail);
      });
      return data;
    });
  }

  uploadFiles(messageUId: string, files: Array<{ fileName: string; filePath: string; langCode: string }>) {
    const webFiles = files.map((elem) => {
      return new WebFile(null, 31, messageUId, null, elem.fileName, elem.filePath, elem.langCode);
    });
    return this.commonServ.addWebFile(webFiles);
  }
}
