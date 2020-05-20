import { PaginationResult } from './../model/common.model';
import { Injectable } from '@angular/core';
import { HttpJson, HttpResponse } from 'src/app/core';
import { NewsSearch, News, NewsNavigation, WebFile } from '../model/site-manager/news.model';
import { PageSearch } from '../model';

const HTTP_GET_NEWS_LIST = '/isli/irms/manage-website/base/news/v1/getNewsList';
const HTTP_GET_NAVS_NAME = '/isli/irms/manage-website/base/news/getNewsNavNames';
const HTTP_POST_NEWS_DELETE = '/isli/irms/manage-website/base/news/v1/deleteNewsOrBatch';
const HTTP_POST_NEWS_ADD = '/isli/irms/manage-website/base/news/v1/addNews';
const HTTP_GET_NEWS_EXISTS = '/isli/irms/manage-website/base/news/v1/newsTitleExist';
const HTTP_POST_NEWS_UPDATE = '/isli/irms/manage-website/base/news/v1/editNews';
const HTTP_GET_NEWS_HIDE_SHOW = '/isli/irms/manage-website/base/news/hideNews';
const HTTP_GET_NEWS_SORT = '/isli/irms/manage-website/base/news/sortNews';
const HTTP_GET_NEWS_DETAIL = '/isli/irms/manage-website/base/news/detail';

@Injectable({ providedIn: 'root' })
export class NewsService {
  constructor(private http: HttpJson) {}

  getNewsList(search: NewsSearch, page: PageSearch): HttpResponse<PaginationResult<News>> {
    return this.http.get(HTTP_GET_NEWS_LIST, {}, Object.assign({}, search, page));
  }

  /**
   * 获取广告所属栏目
   * @param langCode 语言代码
   */
  getNewsNavNames(langCode: string) {
    return this.http.get(HTTP_GET_NAVS_NAME, {}, { langCode });
  }

  deleteNews(newsIds: Array<number>) {
    return this.http.post(HTTP_POST_NEWS_DELETE, {}, {}, { newsIds });
  }

  addNews(news: News) {
    return this.http.post(HTTP_POST_NEWS_ADD, {}, {}, news);
  }

  checkNewsTitleExist(newsTitle: string, langCode: string, newsId?: number) {
    return this.http.get(HTTP_GET_NEWS_EXISTS, {}, { newsTitle, langCode, newsId });
  }

  updateNews(news: News) {
    return this.http.post(HTTP_POST_NEWS_UPDATE, {}, {}, news);
  }

  hideOrShowNews(newsId: number) {
    return this.http.get(HTTP_GET_NEWS_HIDE_SHOW, {}, { newsId });
  }

  sortNews(newsId: number, priority: number) {
    return this.http.get(HTTP_GET_NEWS_SORT, {}, { newsId, priority });
  }

  getNewsDetail(newsId: number): HttpResponse<{ news: News; files: Array<WebFile> }> {
    return this.http.get(HTTP_GET_NEWS_DETAIL, {}, { newsId });
  }
}
