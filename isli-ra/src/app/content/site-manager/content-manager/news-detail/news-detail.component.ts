import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { GlobalValidService } from 'mpr-form-valid';
import {
  NewsService,
  News,
  NewsDetail,
  DropDownOption,
  formatDateTime,
  formatFilePaths,
  formatFilePathsReverse,
  languageEnable
} from 'src/app/service';
import { clickOnce, AppState, clickWaitHttp } from 'src/app/core';

const ERROR_MSG = {
  language: {
    required: 'siteManager.news.valid.language'
  },
  title: {
    required: 'siteManager.news.valid.title'
  },
  createDateTime: {
    required: 'siteManager.news.valid.createDateTime'
  },
  authorName: {
    required: 'siteManager.news.valid.authorName'
  },
  navigationId: {
    required: 'siteManager.news.valid.navigationId'
  },
  priorityLevel: {
    required: 'siteManager.news.valid.priorityLevel'
  },
  newsSummary: {
    required: 'siteManager.news.valid.newsSummary'
  },
  newsDetail: {
    required: 'siteManager.news.valid.newsDetail'
  }
};

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: [ './news-detail.component.scss' ]
})
export class NewsDetailComponent implements OnInit {
  public config = {
    initialFrameWidth: 570,
    initialFrameHeight: 320,
    wordCount: true,
    maximumWords: 10000
  };
  public errorMsg = ERROR_MSG;
  public filePaths = [];
  public info = new News();
  public langList: Array<DropDownOption>;
  public modify: boolean;
  public navNamesList: Array<DropDownOption>;

  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;

  constructor(
    private activeRoute: ActivatedRoute,
    private appState: AppState,
    private globalValidService: GlobalValidService,
    private newsService: NewsService,
    private router: Router
  ) {
    this.info.newsDetail = new NewsDetail();
    this.info.language = { langCode: '' };
    this.info.priorityLevel = 9;
    this.info.createDateTime = new Date().toString();
    this.activeRoute.queryParams.subscribe((params) => {
      if (params.newsId) {
        this.getNewsDetails(params.newsId);
      }
      this.modify = !!params.modify;
    });
  }

  ngOnInit() {
    this.info.isHided = 0;
    this.getAllLanguages();
  }

  // 取消
  @clickOnce()
  public handleCancle() {
    this.router.navigate([ '/content/site/content/news' ]);
  }

  // 语种切换
  handleChangeLanguage(event) {
    this.getNewsNavNames(event.value);
  }

  // 提交
  @clickWaitHttp('handleCommit')
  public handleCommit() {
    if (this.globalValidService.validAll()) {
      this.info.filePaths = formatFilePaths(this.filePaths);
      if (this.modify) {
        return this.newsService.updateNews(this.info).success((res) => {
          this.router.navigate([ '/content/site/content/news' ], {
            relativeTo: this.activeRoute.parent,
            queryParams: { reload: true }
          });
        });
      } else {
        this.info.createDateTime = formatDateTime(this.info.createDateTime);
        return this.newsService
          .addNews(this.info)
          .success((res) => {
            this.router.navigate([ '/content/site/content/news' ], {
              relativeTo: this.activeRoute.parent,
              queryParams: { reload: true }
            });
          })
          .error((res) => {
            console.error(res);
          });
      }
    }
  }

  public languageEnable(langCode) {
    return languageEnable(langCode);
  }

  private getAllLanguages() {
    const languages =
      typeof this.appState.get('languageType') === 'string'
        ? JSON.parse(this.appState.get('languageType'))
        : this.appState.get('languageType');
    this.langList = languages.map((elem) => {
      return { label: elem.langName, value: elem.langCode };
    });
  }

  private getNewsDetails(id: number) {
    this.newsService.getNewsDetail(id).success((res) => {
      this.info = res.data.news;
      this.info.createDateTime = formatDateTime(this.info.createDateTime);
      this.getNewsNavNames(this.info.language.langCode);
      if (!this.info.filePaths) {
        this.filePaths = [];
      } else {
        this.filePaths = formatFilePathsReverse(this.info.filePaths);
      }
    });
  }
  private getNewsNavNames(languageCode) {
    this.newsService
      .getNewsNavNames(languageCode)
      .success((res) => {
        this.navNamesList = res.data.map((elem) => {
          return { label: elem.navigationI18n.navigationName, value: elem.navigationI18n.navigationId };
        });
        console.log(this.navNamesList);
      })
      .error((res) => {
        console.log(res);
      });
  }
}
