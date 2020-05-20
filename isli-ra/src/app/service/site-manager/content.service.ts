import { PaginationResult } from './../model/common.model';
import { Injectable } from '@angular/core';
import { HttpJson, HttpResponse, AppState } from 'src/app/core';
import { ContentSearch, PageSearch, Content } from '../model';

const HTTP_GET_CONTENT_LIST = '/isli/irms/manage-website/base/content/v1/list';
const HTTP_GET_CONTENT_DETAIL = '/isli/irms/manage-website/base/content/detail';
const HTTP_GET_CONTENT_BY_ID = '/isli/irms/manage-website/base/content/{contentId}';
const HTTP_POST_CONTENT_UPDATE = '/isli/irms/manage-website/base/content/update';
const HTTP_POST_CONTENT_ADD = '/isli/irms/manage-website/base/content/add';
const HTTP_GET_CONTENT_LANG_LIST = '/isli/irms/manage-website/base/content/contentList';

@Injectable({ providedIn: 'root' })
export class ContentService {
  constructor(private http: HttpJson, private stateServ: AppState) {}

  getContentList(search: ContentSearch, page: PageSearch): HttpResponse<PaginationResult<Content>> {
    return this.http.get(HTTP_GET_CONTENT_LIST, {}, Object.assign({}, search, page));
  }

  getContentDetail(
    contentId: number,
    navigationId?: number,
    navigationName?: string
  ): HttpResponse<{
    content: Content;
    imagePath: string;
  }> {
    return this.http.get(HTTP_GET_CONTENT_DETAIL, {}, { contentId, navigationId, navigationName });
  }

  getContentById(contentId: number) {
    return this.http.get(HTTP_GET_CONTENT_BY_ID, { contentId });
  }

  addContent(content: Content) {
    return this.http.post(HTTP_POST_CONTENT_ADD, {}, {}, { contents: [ content ] });
  }

  updateContent(content: Content) {
    return this.http.post(HTTP_POST_CONTENT_UPDATE, {}, {}, { contents: [ content ] });
  }

  /**
   * 语种启用，第三步列表接口
   *
   */
  getContentLangList(langCode?: string): HttpResponse<PaginationResult<Content>> {
    return this.http.get(HTTP_GET_CONTENT_LANG_LIST, {}, { langCode: langCode || this.stateServ.get('language') });
  }
}
