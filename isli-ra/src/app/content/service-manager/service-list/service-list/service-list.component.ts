import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState, clickOnce, clickWaitHttp, CommonFuncService } from 'src/app/core';
import { DropDownOption, ServiceInfo, ServiceSearch } from 'src/app/service/model';
import { ServiceListService } from 'src/app/service/service-list.service';
import { CommonService } from 'src/app/service/common.service';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: [ './service-list.component.scss' ]
})
export class ServiceListComponent implements OnInit {
  public currentId: string;
  public districtRowOnOff = false;
  public districtRowList: Array<any>;
  public language: string;
  public oldServiceSearch: ServiceSearch;
  public pagingBoxObj = new PagingBoxObj(1, 0, 10, 0);
  public serviceCodeList: Array<DropDownOption>;
  public serviceList: Array<ServiceInfo>;
  public serviceSearch = new ServiceSearch();

  constructor(
    private commonServ: CommonService,
    private router: Router,
    private serviceListService: ServiceListService,
    private stateServ: AppState
  ) {
    this.language = this.stateServ.get('language');
  }

  ngOnInit() {
    this.getServiceCode();
    this.getServiceList();
    // this.getDistrictRowList();
  }

  // 获取区行列表
  getDistrictRowList() {
    this.serviceListService
      .getDistrictRowList()
      .success((success) => {
        const data = success && success.data;
        this.districtRowList = data;
      })
      .error((error) => {
        this.districtRowList = [];
        // console.error(error);
      });
  }

  // 获取服务编码
  getServiceCode() {
    this.commonServ
      .getServiceCodeList()
      .translate(CommonFuncService.formatObjForLangCode(this.stateServ.get('language')))
      .success((res) => {
        this.serviceCodeList = [ { label: 'service.common.all', value: '' } ].concat(
          (res.data || []).map((elem) => {
            return { value: elem.serviceCode, label: elem.serviceCode };
          })
        );
      });
  }

  // 获取服务列表
  getServiceList() {
    const pageIndex = this.pagingBoxObj.page;
    const pageRows = this.pagingBoxObj.rows;
    const queryParams = this.serviceSearch;
    return this.serviceListService
      .getServiceList(pageIndex, pageRows, queryParams)
      .translate(CommonFuncService.formatObjForLangCode(this.stateServ.get('language')))
      .success((success) => {
        const data = success && success.data;
        this.serviceList = data && data.list;
        this.pagingBoxObj.totalRecords = data && data.totalCount;
      })
      .error((error) => {
        this.serviceList = [];
        this.pagingBoxObj.totalRecords = 0;
        // console.error(error);
      });
  }

  // 新增服务
  @clickOnce()
  handleAddServiceClick() {
    this.router.navigate([ '/content/service/services/list/add' ]);
  }

  // 点击关闭---服务推送
  @clickOnce()
  handleCancelClick() {
    this.districtRowOnOff = false;
  }

  // 切换分页
  handlePageChange(pageInfo: PagingBoxObj) {
    this.pagingBoxObj.page = pageInfo.page;
    this.pagingBoxObj.rows = pageInfo.rows;
    this.getServiceList();
  }

  // 点击搜索
  @clickWaitHttp('handleSearchClick')
  handleSearchClick(serviceSearch: ServiceSearch) {
    this.serviceSearch = serviceSearch;
    if (this.oldServiceSearch && CommonFuncService.objectEq(this.oldServiceSearch, this.serviceSearch)) {
      return;
    }
    return this.getServiceList();
  }

  // 服务推送
  // handleServicePushClick(e) {
  //   console.log(e);
  //   this.currentId = e;
  //   this.districtRowOnOff = true;
  // }

  // 确定---服务推送
  @clickWaitHttp('handleSureClick')
  handleSureClick(e) {
    return this.serviceListService
      .postServicePush(this.currentId, e)
      .success((success) => {
        this.districtRowOnOff = false;
        this.getServiceList();
      })
      .error((error) => {
        // console.error(error);
      });
  }
}
