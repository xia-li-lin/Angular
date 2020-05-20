import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { clickOnce, AppState, clickWaitHttp, CommonFuncService } from 'src/app/core';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { PageSearch } from 'src/app/service/model/common.model';
import { NewsSearch, News, NewsService, LanguageService, DropDownOption } from 'src/app/service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: [ './news-list.component.scss' ]
})
export class NewsListComponent implements OnInit {
  public dialogOnOff = false;
  public id: number;
  public langList: Array<DropDownOption>;
  public lang = this.appState.get('language') === 'EN_US' ? '-en' : '';
  public navNamesList: Array<DropDownOption>;
  public newsListData: Array<News>;
  public newsSearch = new NewsSearch();
  public oldSearch = CommonFuncService.clone(this.newsSearch);
  public pageInfo = new PagingBoxObj(1, 0, 10, 0);
  public searchDate = null;
  public sortOnOff = false;
  public validFunc;

  constructor(
    private appState: AppState,
    private languageService: LanguageService,
    private newsService: NewsService,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.validFunc = () => {
      return new Promise<boolean>((resolve, reject) => {
        this.newsService
          .deleteNews([ this.id ])
          .success((res) => {
            this.getNewsList();
            this.dialogOnOff = false;
            resolve(true);
          })
          .error((res) => {
            console.log(res);
            resolve(false);
          });
      });
    };
  }

  ngOnInit() {
    this.getNewsList();
    this.getAllLanguages();
    this.getNewsNavNames();
  }

  @clickOnce()
  public handleAddClick() {
    this.router.navigate([ '/content/site/content/news/add' ]);
  }

  // 关闭弹窗
  @clickOnce()
  public handleCancelDialogClick() {
    this.dialogOnOff = false;
    this.sortOnOff = false;
  }

  // 删除
  @clickOnce()
  public handleDeleteClick(newsId) {
    this.dialogOnOff = true;
    this.id = newsId;
  }

  @clickOnce()
  public handleDateChange(date: { beginDate: string; endDate: string }) {
    this.newsSearch.startTime = date.beginDate;
    this.newsSearch.endTime = date.endDate;
  }

  // 显示隐藏新闻
  @clickWaitHttp((newsId) => 'handlehideOrShowNewsId' + newsId)
  public handlehideOrShow(newsId) {
    return this.newsService
      .hideOrShowNews(newsId)
      .success((res) => {
        this.getNewsList();
      })
      .error((res) => {
        console.log('hide fail');
      });
  }

  @clickOnce()
  public handleModifyClick(news: News) {
    this.router.navigate([ '/content/site/content/news/news-detail' ], {
      queryParams: { newsId: news.newsId, modify: true }
    });
  }

  // 分页
  @clickWaitHttp('handlePageChange')
  public handlePageChange(pageInfo: PagingBoxObj) {
    if (this.pageInfo.page === pageInfo.page) {
      return;
    }
    this.pageInfo.page = pageInfo.page;
    this.getNewsList();
  }

  // 搜索
  @clickWaitHttp('handleSearch')
  handleSearch() {
    if (CommonFuncService.objectEq(this.newsSearch, this.oldSearch)) {
      return;
    }
    this.pageInfo = new PagingBoxObj(1, 0, 10, 0);
    this.getNewsList();
  }

  // 排序
  @clickWaitHttp((id) => 'handleSortId' + id)
  public handleSort(id, priorityLevel, oldValue) {
    if (priorityLevel === '') {
      this.sortOnOff = true;
      this.getNewsList();
    } else {
      if (oldValue !== priorityLevel) {
        this.newsService
          .sortNews(id, priorityLevel)
          .success((res) => {
            this.getNewsList();
          })
          .error((res) => {
            console.log(res);
          });
      }
    }
  }

  private getAllLanguages() {
    this.languageService
      .getAllLanguages()
      .success((res) => {
        this.langList = res.data.list.map((elem) => {
          return { label: elem.langName, value: elem.langCode };
        });
        this.langList.unshift({ label: this.translateService.instant('siteManager.common.all'), value: '' });
      })
      .error((res) => {
        console.log(res);
      });
  }

  // 列表
  private getNewsList() {
    return this.newsService
      .getNewsList(this.newsSearch, new PageSearch(this.pageInfo.page, this.pageInfo.rows))
      .success((res) => {
        console.log('get news list', res);
        this.newsListData = res.data.list;
        this.pageInfo.totalRecords = res.data.totalCount;
      })
      .error(() => {
        this.newsListData = [];
        this.pageInfo.totalRecords = 0;
      });
  }

  private getNewsNavNames() {
    this.newsService
      .getNewsNavNames(this.appState.get('language'))
      .success((res) => {
        this.navNamesList = res.data.map((elem) => {
          return { label: elem.navigationI18n.navigationName, value: elem.navigationI18n.navigationId };
        });
        this.navNamesList.unshift({ label: this.translateService.instant('siteManager.common.all'), value: '' });
      })
      .error((res) => {
        console.log(res);
      });
  }
}
