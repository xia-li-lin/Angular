import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import {
  FqManagerSearch,
  PageSearch,
  FqManager,
  FqManagerService,
  DropDownOption,
  LanguageService
} from 'src/app/service';
import { clickWaitHttp, clickOnce, CommonFuncService, AppState } from '../../../../core';

@Component({
  selector: 'app-fq-manager',
  templateUrl: './fq-manager.component.html',
  styleUrls: [ './fq-manager.component.scss' ]
})
export class FqManagerComponent implements OnInit {
  public dialogOnOff = false;
  public fqManagerListData: Array<FqManager>;
  public fqManagerSearch = new FqManagerSearch();
  public id: number;
  public isShowList = [
    new DropDownOption(this.translateService.instant('siteManager.common.all'), ''),
    new DropDownOption(this.translateService.instant('siteManager.common.show'), 1),
    new DropDownOption(this.translateService.instant('siteManager.common.hide'), 0)
  ];
  public langList: Array<DropDownOption>;
  public lang = this.appState.get('language') === 'EN_US' ? '-en' : '-zh';
  public oldSearch = CommonFuncService.clone(this.fqManagerSearch);
  public pageInfo = new PagingBoxObj(1, 0, 10, 0);
  public searchDate = null;
  public validFunc;

  constructor(
    private appState: AppState,
    private fqManagerService: FqManagerService,
    private languageService: LanguageService,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.validFunc = () => {
      return new Promise<boolean>((resolve, reject) => {
        this.fqManagerService
          .deleteFqManager(this.id)
          .success((res) => {
            this.getFqManagerList();
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
    this.getFqManagerList();
    this.getAllLanguages();
  }

  @clickOnce()
  public handleDateChange(date: { beginDate: string; endDate: string }) {
    this.fqManagerSearch.startTime = date.beginDate;
    this.fqManagerSearch.endTime = date.endDate;
  }

  // 关闭弹窗
  @clickOnce()
  public handleCancelDialogClick() {
    this.dialogOnOff = false;
  }

  // 查看
  @clickOnce()
  public handleCheckClick(id) {
    this.router.navigate([ '/content/site/interact/fqmanagers/fqmanager-detail' ], { queryParams: { id } });
  }

  // 删除
  @clickOnce()
  public handleDeleteClick(id) {
    this.dialogOnOff = true;
    this.id = id;
  }

  // 显示隐藏
  @clickWaitHttp((id) => 'handlehideOrShowId' + id)
  public handlehideOrShow(id, isShow) {
    const hideOrShow = isShow === 1 ? 0 : 1;
    return this.fqManagerService
      .hideShowFqManager(id, hideOrShow)
      .success((res) => {
        this.getFqManagerList();
      })
      .error((res) => {
        console.log('hide fail');
      });
  }

  @clickWaitHttp('handlePageChange')
  handlePageChange(pageInfo: PagingBoxObj) {
    if (this.pageInfo.page === pageInfo.page) {
      return;
    }
    this.pageInfo.page = pageInfo.page;
    this.getFqManagerList();
  }

  // 置顶
  @clickWaitHttp((id) => 'handleTopClickId' + id)
  public handleTopClick(id) {
    return this.fqManagerService
      .setFqmanagerTopSort(id)
      .success((res) => {
        this.getFqManagerList();
      })
      .error((res) => {
        console.log(res);
      });
  }

  public fqmanagerSort(type) {
    if (type === 'createTime') {
      if (this.fqManagerSearch.sortField === 'createTime,DESC') {
        this.fqManagerSearch.sortField = 'createTime,ASC';
      } else if (this.fqManagerSearch.sortField === 'createTime,ASC') {
        this.fqManagerSearch.sortField = 'createTime,DESC';
      } else {
        this.fqManagerSearch.sortField = 'createTime,DESC';
      }
      this.getFqManagerList();
    } else if (type === 'replayNum') {
      if (this.fqManagerSearch.sortField === 'replayNum,DESC') {
        this.fqManagerSearch.sortField = 'replayNum,ASC';
      } else if (this.fqManagerSearch.sortField === 'replayNum,ASC') {
        this.fqManagerSearch.sortField = 'replayNum,DESC';
      } else {
        this.fqManagerSearch.sortField = 'replayNum,DESC';
      }
      this.getFqManagerList();
    }
  }

  // 搜索
  @clickWaitHttp('handleSearch')
  handleSearch() {
    if (CommonFuncService.objectEq(this.fqManagerSearch, this.oldSearch)) {
      return;
    }
    this.pageInfo = new PagingBoxObj(1, 0, 10, 0);
    this.getFqManagerList();
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

  private getFqManagerList() {
    return this.fqManagerService
      .getManagerList(this.fqManagerSearch, new PageSearch(this.pageInfo.page, this.pageInfo.rows))
      .success((res) => {
        this.fqManagerListData = res.data.list;
        this.pageInfo.totalRecords = res.data.totalCount;
      })
      .error(() => {
        this.fqManagerListData = [];
        this.pageInfo.totalRecords = 0;
      });
  }
}
