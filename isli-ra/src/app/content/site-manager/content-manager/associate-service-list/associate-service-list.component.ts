import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import {
  AssociateSearch,
  PageSearch,
  Associate,
  AssociateService,
  DropDownOption,
  LanguageService,
  SHOW_HIDE_STATUS_LIST
} from 'src/app/service';
import { clickOnce, clickWaitHttp, CommonFuncService, AppState } from 'src/app/core';

@Component({
  selector: 'app-associate-service-list',
  templateUrl: './associate-service-list.component.html',
  styleUrls: [ './associate-service-list.component.scss' ]
})
export class AssociateServiceListComponent implements OnInit {
  public associateListData: Array<Associate>;
  public associateSearch = new AssociateSearch();
  public asStatusList = SHOW_HIDE_STATUS_LIST;
  public dialogOnOff = false;
  public id: number;
  public lang = this.appState.get('language') === 'EN_US' ? '-en' : '-zh';
  public langList: Array<DropDownOption>;
  public oldSearch = CommonFuncService.clone(this.associateSearch);
  public pageInfo = new PagingBoxObj(1, 0, 10, 0);
  public validFunc;
  public searchDate = null;
  public sortOnOff = false;

  constructor(
    private appState: AppState,
    private associateService: AssociateService,
    private languageService: LanguageService,
    private router: Router
  ) {
    this.validFunc = () => {
      return new Promise<boolean>((resolve, reject) => {
        this.associateService
          .deleteAssociate(this.id)
          .success((res) => {
            this.getAssociateList();
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
    this.getAllLanguages();
    this.getAssociateList();
  }

  //  增加
  @clickOnce()
  public handleAddClick() {
    this.router.navigate([ '/content/site/content/associates/add' ]);
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
  public handleDateChange(date: { beginDate: string; endDate: string }) {
    this.associateSearch.startTime = date.beginDate;
    this.associateSearch.endTime = date.endDate;
  }

  // 显示隐藏
  @clickWaitHttp((newsId) => 'newsId' + newsId)
  public handlehideOrShow(newsId: number, isShow: number) {
    const hideOrShow = isShow === 1 ? 0 : 1;
    return this.associateService
      .updateAssociateHideShow(newsId, hideOrShow)
      .success((res) => {
        this.getAssociateList();
      })
      .error((res) => {
        console.log('hide fail');
      });
  }

  // 修改
  @clickOnce()
  public handleModifyClick(associate: Associate) {
    this.router.navigate([ '/content/site/content/associates/associate-detail' ], {
      queryParams: { id: associate.id, modify: true }
    });
  }

  @clickOnce()
  public handlePageChange(pageInfo: PagingBoxObj) {
    if (this.pageInfo.page === pageInfo.page) {
      return;
    }
    this.pageInfo.page = pageInfo.page;
    this.getAssociateList();
  }

  // 搜索
  @clickWaitHttp('handleSearch')
  public handleSearch() {
    if (CommonFuncService.objectEq(this.associateSearch, this.oldSearch)) {
      return;
    }
    this.pageInfo = new PagingBoxObj(1, 0, 10, 0);
    this.getAssociateList();
  }

  // 排序
  @clickWaitHttp((id) => 'id' + id)
  public handleSort(id, priorityLevel, oldValue) {
    if (priorityLevel === '') {
      this.sortOnOff = true;
      this.getAssociateList();
    } else {
      if (oldValue !== priorityLevel) {
        return this.associateService
          .updateAssociateSort(id, priorityLevel)
          .success((res) => {
            this.getAssociateList();
          })
          .error((res) => {
            console.log(res);
          });
      }
    }
  }

  private getAssociateList() {
    return this.associateService
      .getAssociateList(this.associateSearch, new PageSearch(this.pageInfo.page, this.pageInfo.rows))
      .success((res) => {
        this.associateListData = res.data.list;
        this.pageInfo.totalRecords = res.data.totalCount;
      })
      .error(() => {
        this.associateListData = [];
        this.pageInfo.totalRecords = 0;
      });
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
}
