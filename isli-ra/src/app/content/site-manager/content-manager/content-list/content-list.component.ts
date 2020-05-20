import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { PageSearch } from 'src/app/service/model/common.model';
import { ContentSearch, Content, LanguageService, ContentService } from 'src/app/service';
import { clickOnce, clickWaitHttp, CommonFuncService } from 'src/app/core';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: [ './content-list.component.scss' ]
})
export class ContentListComponent implements OnInit {
  public contentListData: Array<Content>;
  public contentSearch = new ContentSearch();
  public langList = [];
  public oldSearch = CommonFuncService.clone(this.contentSearch);
  public pageInfo = new PagingBoxObj(1, 0, 10, 0);
  public searchDate = null;

  constructor(
    private contentService: ContentService,
    private languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getContentList();
    this.getAllLanguages();
  }

  @clickOnce()
  handleDateChange(date: { beginDate: string; endDate: string }) {
    this.contentSearch.startTime = date.beginDate;
    this.contentSearch.endTime = date.endDate;
  }

  // 修改
  @clickOnce()
  public handleEditClick(contentId, navigationId, navigationName, langCode) {
    this.router.navigate([ '/content/site/content/content/content-detail' ], {
      queryParams: {
        contentId,
        navigationId,
        navigationName,
        langCode
      }
    });
  }

  // 分页
  @clickWaitHttp('handlePageChange')
  public handlePageChange(pageInfo: PagingBoxObj) {
    if (this.pageInfo.page === pageInfo.page) {
      return;
    }
    this.pageInfo.page = pageInfo.page;
    this.getContentList();
  }

  // 搜索
  @clickWaitHttp('handleSearch')
  handleSearch() {
    if (CommonFuncService.objectEq(this.contentSearch, this.oldSearch)) {
      return;
    }
    this.pageInfo = new PagingBoxObj(1, 0, 10, 0);
    this.getContentList();
  }

  private getAllLanguages() {
    this.languageService
      .getAllLanguages()
      .success((res) => {
        this.langList = res.data.list.map((elem) => {
          return { label: elem.langName, value: elem.langCode };
        });
        this.langList.unshift({ label: '全部', value: '' });
      })
      .error((res) => {
        console.log(res);
      });
  }

  // 列表
  private getContentList() {
    return this.contentService
      .getContentList(this.contentSearch, new PageSearch(this.pageInfo.page, this.pageInfo.rows))
      .success((res) => {
        this.contentListData = res.data.list;
        this.pageInfo.totalRecords = res.data.totalCount;
      })
      .error(() => {
        this.contentListData = [];
        this.pageInfo.totalRecords = 0;
      });
  }
}
