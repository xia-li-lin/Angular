import { PaginationResult } from './model/common.model';
import { Injectable } from '@angular/core';
import { HttpJson, HttpResponse } from '../core';
import { Language } from './model/language.model';

const HTTP_GET_LANAGUAGE_LIST = '/isli/irms/manage-system/base/langmanage/v1/languages';
const HTTP_GET_LANAGUAGE_LIST_ALL = '/isli/irms/manage-system/base/langmanage/Alllanguages';
const HTTP_POST_DISABLE_LANAGUAGE = '/isli/irms/manage-system/base/langmanage/v1/disableLanguage';
const HTTP_POST_ENABLE_LANAGUAGE = '/isli/irms/manage-system/base/langmanage/v1/updateLanguageStatus';
const HTTP_GET_NAVTREE = '/isli/irms/manage-website/base/navigation/navTreeNodes';
const HTTP_GET_HOME_BACKGROUND = 'HTTP_GET_HOME_BACKGROUND';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  constructor(private http: HttpJson) { }

  /**
   * 获取当前系统使用的语言，不包含隐藏的
   */
  getLanguages(): HttpResponse<Array<Language>> {
    return this.http.get(HTTP_GET_LANAGUAGE_LIST);
  }

  getAllLanguages(): HttpResponse<PaginationResult<Language>> {
    return this.http.get(HTTP_GET_LANAGUAGE_LIST_ALL);
  }

  enableLanguage(langCode: string): HttpResponse<any> {
    return this.http.post(HTTP_POST_ENABLE_LANAGUAGE, {}, {}, { langCode });
  }

  disableLanguage(langCode: string) {
    return this.http.post(HTTP_POST_DISABLE_LANAGUAGE, {}, {}, { langCode });
  }
  getHomeBackground() {
    return this.http.get(HTTP_GET_HOME_BACKGROUND, {}, {});
  }

}
