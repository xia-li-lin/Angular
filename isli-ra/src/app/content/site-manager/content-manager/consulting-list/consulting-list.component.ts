import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import {
  ConsultingSearch,
  PageSearch,
  Consulting,
  ConsultingService,
  DropDownOption,
  LanguageService,
  SHOW_HIDE_STATUS_LIST
} from 'src/app/service';
import { clickOnce, clickWaitHttp, AppState, CommonFuncService } from 'src/app/core';

@Component({
  selector: 'app-consulting-list',
  templateUrl: './consulting-list.component.html',
  styleUrls: [ './consulting-list.component.scss' ]
})
export class ConsultingListComponent implements OnInit {
  public consultingStatusList = SHOW_HIDE_STATUS_LIST;
  public consultingListData: Array<Consulting>;
  public consultingSearch = new ConsultingSearch();
  public dialogOnOff = false;
  public id: number;
  public langList: Array<DropDownOption>;
  public lang = this.appState.get('language') === 'EN_US' ? '-en' : '';
  public oldSearch = CommonFuncService.clone(this.consultingSearch);
  public pageInfo = new PagingBoxObj(1, 0, 10, 0);
  public searchDate = null;
  public sortOnOff = false;
  public validFunc;

  constructor(
    private appState: AppState,
    private consultingService: ConsultingService,
    private languageService: LanguageService,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.validFunc = () => {
      return new Promise<boolean>((resolve, reject) => {
        this.consultingService
          .deleteConsult(this.id)
          .success((res) => {
            this.getConsultingList();
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
    this.getConsultingList();
    this.getAllLanguages();
  }

  //  增加
  @clickOnce()
  public handleAddClick() {
    this.router.navigate([ '/content/site/content/consulting/add' ]);
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

  public handleDateChange(date: { beginDate: string; endDate: string }) {
    this.consultingSearch.startTime = date.beginDate;
    this.consultingSearch.endTime = date.endDate;
  }

  // 显示隐藏
  @clickWaitHttp((newsId) => 'handlehideOrShowNewsId' + newsId)
  public handlehideOrShow(newsId: number, isShow: number) {
    const hideOrShow = isShow === 1 ? 0 : 1;
    this.consultingService
      .hideOrShowConsult(newsId, hideOrShow)
      .success((res) => {
        this.getConsultingList();
      })
      .error((res) => {
        console.log('hide fail');
      });
  }

  // 分页
  @clickWaitHttp('handlePageChange')
  public handlePageChange(pageInfo: PagingBoxObj) {
    if (this.pageInfo.page === pageInfo.page) {
      return;
    }
    this.pageInfo.page = pageInfo.page;
    this.getConsultingList();
  }

  // 修改
  @clickOnce()
  public handleModifyClick(consulting: Consulting) {
    this.router.navigate([ '/content/site/content/consulting/consulting-detail' ], {
      queryParams: { id: consulting.id, modify: true }
    });
  }

  // 搜索
  @clickWaitHttp('handleSearch')
  public handleSearch() {
    if (CommonFuncService.objectEq(this.consultingSearch, this.oldSearch)) {
      return;
    }
    this.pageInfo = new PagingBoxObj(1, 0, 10, 0);
    this.getConsultingList();
  }

  // 排序
  @clickWaitHttp((id) => 'handleSortId' + id)
  public handleSort(id, priorityLevel, oldValue) {
    if (priorityLevel === '') {
      this.sortOnOff = true;
      this.getConsultingList();
    } else {
      if (oldValue !== priorityLevel) {
        return this.consultingService
          .updateConsultSort(id, priorityLevel)
          .success((res) => {
            this.getConsultingList();
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
  private getConsultingList() {
    return this.consultingService
      .getConsultList(this.consultingSearch, new PageSearch(this.pageInfo.page, this.pageInfo.rows))
      .success((res) => {
        this.consultingListData = res.data.list;
        this.pageInfo.totalRecords = res.data.totalCount;
      })
      .error(() => {
        this.consultingListData = [];
        this.pageInfo.totalRecords = 0;
      });
  }
}
