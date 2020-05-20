import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import {
  AppExampleSearch,
  PageSearch,
  AppExample,
  AppExampleService,
  DropDownOption,
  LanguageService,
  SHOW_HIDE_STATUS_LIST
} from 'src/app/service';
import { clickOnce, clickWaitHttp, CommonFuncService, AppState } from 'src/app/core';

@Component({
  selector: 'app-app-example-list',
  templateUrl: './app-example-list.component.html',
  styleUrls: [ './app-example-list.component.scss' ]
})
export class AppExampleListComponent implements OnInit {
  public appExampleListData: Array<AppExample>;
  public appExampleSearch = new AppExampleSearch();
  public applicationExampleStatusList = SHOW_HIDE_STATUS_LIST;
  public dialogOnOff = false;
  public id: number;
  public langList: Array<DropDownOption>;
  public lang = this.appState.get('language') === 'EN_US' ? '-en' : '';
  public oldSearch = CommonFuncService.clone(this.appExampleSearch);
  public pageInfo = new PagingBoxObj(1, 0, 10, 0);
  public searchDate = null;
  public sortOnOff = false;
  public validFunc;

  constructor(
    private appExampleService: AppExampleService,
    private appState: AppState,
    private router: Router,
    private languageService: LanguageService
  ) {
    this.validFunc = () => {
      return new Promise<boolean>((resolve, reject) => {
        this.appExampleService
          .deleteAppExample(this.id)
          .success((res) => {
            this.getAppExampleList();
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
    this.getAppExampleList();
    this.getAllLanguages();
  }

  //  增加
  @clickOnce()
  public handleAddClick() {
    this.router.navigate([ '/content/site/content/app-examples/add' ]);
  }

  // 关闭弹窗
  @clickOnce()
  public handleCancelDialogClick() {
    this.dialogOnOff = false;
    this.sortOnOff = false;
  }

  // 删除
  @clickOnce()
  public handleDeleteClick(id) {
    this.dialogOnOff = true;
    this.id = id;
  }

  @clickOnce()
  handleDateChange(date: { beginDate: string; endDate: string }) {
    this.appExampleSearch.startTime = date.beginDate;
    this.appExampleSearch.endTime = date.endDate;
  }

  // 显示隐藏
  @clickWaitHttp((newsId) => 'handlehideOrShowNewsId' + newsId)
  public handlehideOrShow(newsId: number, isShow: number) {
    const hideOrShow = isShow === 1 ? 0 : 1;
    return this.appExampleService
      .updateAppExampleHideShow(newsId, hideOrShow)
      .success((res) => {
        this.getAppExampleList();
      })
      .error((res) => {
        console.log('hide fail');
      });
  }

  // 修改
  @clickOnce()
  public handleModifyClick(appExample: AppExample) {
    this.router.navigate([ '/content/site/content/app-examples/app-example-detail' ], {
      queryParams: { id: appExample.id, modify: true }
    });
  }

  @clickWaitHttp('handlePageChange')
  public handlePageChange(pageInfo: PagingBoxObj) {
    if (this.pageInfo.page === pageInfo.page) {
      return;
    }
    this.pageInfo.page = pageInfo.page;
    this.getAppExampleList();
  }

  // 搜索
  @clickWaitHttp('handleSearch')
  public handleSearch() {
    if (CommonFuncService.objectEq(this.appExampleSearch, this.oldSearch)) {
      return;
    }
    this.pageInfo = new PagingBoxObj(1, 0, 10, 0);
    this.getAppExampleList();
  }

  // 排序
  @clickWaitHttp((id) => 'handleSortId' + id)
  public handleSort(id, priorityLevel, oldValue) {
    if (priorityLevel === '') {
      this.sortOnOff = true;
      this.getAppExampleList();
    } else {
      if (oldValue !== priorityLevel) {
        return this.appExampleService
          .updateAppExampleSort(id, priorityLevel)
          .success((res) => {
            this.getAppExampleList();
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
        this.langList.unshift({ label: '全部', value: '' });
      })
      .error((res) => {
        console.log(res);
      });
  }

  private getAppExampleList() {
    return this.appExampleService
      .getAppExampleList(this.appExampleSearch, new PageSearch(this.pageInfo.page, this.pageInfo.rows))
      .success((res) => {
        this.appExampleListData = res.data.list;
        this.pageInfo.totalRecords = res.data.totalCount;
      })
      .error(() => {
        this.appExampleListData = [];
        this.pageInfo.totalRecords = 0;
      });
  }
}
