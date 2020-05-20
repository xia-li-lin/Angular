import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import {
  PageSearch,
  ServiceProductSearch,
  ServiceProduct,
  ServiceProductService,
  DropDownOption,
  LanguageService,
  SHOW_HIDE_STATUS_LIST
} from 'src/app/service';
import { clickOnce, clickWaitHttp, CommonFuncService, AppState } from 'src/app/core';

@Component({
  selector: 'app-service-product-list',
  templateUrl: './service-product-list.component.html',
  styleUrls: [ './service-product-list.component.scss' ]
})
export class ServiceProductListComponent implements OnInit {
  public dialogOnOff = false;
  public id: number;
  public langList: Array<DropDownOption>;
  public lang = this.appState.get('language') === 'EN_US' ? '-en' : '';
  public searchDate = null;
  public serviceProductListData: Array<ServiceProduct>;
  public serviceProductSearch = new ServiceProductSearch();
  public sortOnOff = false;
  public sppStatusList = SHOW_HIDE_STATUS_LIST;
  public oldSearch = CommonFuncService.clone(this.serviceProductSearch);
  public pageInfo = new PagingBoxObj(1, 0, 10, 0);
  public validFunc;

  constructor(
    private appState: AppState,
    private languageService: LanguageService,
    private router: Router,
    private serviceProductService: ServiceProductService
  ) {
    this.validFunc = () => {
      return new Promise<boolean>((resolve, reject) => {
        this.serviceProductService
          .deleteServiceProduct(this.id)
          .success((res) => {
            this.getServiceProductsList();
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
    this.getServiceProductsList();
    this.getAllLanguages();
  }

  //  增加
  @clickOnce()
  public handleAddClick() {
    this.router.navigate([ '/content/site/content/products/add' ]);
  }

  // 关闭弹窗
  @clickOnce()
  public handleCancelDialogClick() {
    this.dialogOnOff = false;
    this.sortOnOff = false;
  }

  @clickOnce()
  public handleDateChange(date: { beginDate: string; endDate: string }) {
    this.serviceProductSearch.startTime = date.beginDate;
    this.serviceProductSearch.endTime = date.endDate;
  }

  // 删除
  handleDeleteClick(id) {
    this.dialogOnOff = true;
    this.id = id;
  }

  // 显示隐藏
  @clickWaitHttp((newsId) => 'newsId' + newsId)
  handlehideOrShow(newsId: number, isShow: number) {
    const hideOrShow = Number(isShow) === 1 ? 0 : 1;
    return this.serviceProductService
      .updateServiceProductHideShow(newsId, hideOrShow)
      .success((res) => {
        this.getServiceProductsList();
      })
      .error((res) => {
        console.log('hide fail');
      });
  }

  // 修改
  @clickOnce()
  public handleModifyClick(serviceProduct: ServiceProduct) {
    this.router.navigate([ '/content/site/content/products/product-detail' ], {
      queryParams: { id: serviceProduct.id, modify: true }
    });
  }

  @clickOnce()
  public handlePageChange(pageInfo: PagingBoxObj) {
    if (this.pageInfo.page === pageInfo.page) {
      return;
    }
    this.pageInfo.page = pageInfo.page;
    this.getServiceProductsList();
  }

  // 搜索
  @clickWaitHttp('handleSearch')
  handleSearch() {
    if (CommonFuncService.objectEq(this.serviceProductSearch, this.oldSearch)) {
      return;
    }
    this.pageInfo = new PagingBoxObj(1, 0, 10, 0);
    this.getServiceProductsList();
  }
  // 排序
  @clickWaitHttp((id) => 'id' + id)
  public handleSort(id, priorityLevel, oldValue) {
    if (priorityLevel === '') {
      this.sortOnOff = true;
      this.getServiceProductsList();
    } else {
      if (oldValue !== priorityLevel) {
        return this.serviceProductService
          .updateServiceProductSort(id, priorityLevel)
          .success((res) => {
            this.getServiceProductsList();
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

  private getServiceProductsList() {
    return this.serviceProductService
      .getServiceProductList(this.serviceProductSearch, new PageSearch(this.pageInfo.page, this.pageInfo.rows))
      .success((res) => {
        this.serviceProductListData = res.data.list;
        this.pageInfo.totalRecords = res.data.totalCount;
      })
      .error(() => {
        this.serviceProductListData = [];
        this.pageInfo.totalRecords = 0;
      });
  }
}
