import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppState, CommonFuncService, clickOnce, clickWaitHttp } from 'src/app/core';
import { MessageManager } from 'src/app/service/model/message-manager.model';
import { PageSearch, DropDownOption, ServiceSpApply, ServiceSpApplySearch } from 'src/app/service/model';
import { ServiceSpApplyService } from 'src/app/service/service-sp-apply.service';
import { MessageManagerService } from 'src/app/service/message-manager.service';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';

@Component({
  selector: 'app-sp-apply-add-service',
  templateUrl: './sp-apply-add-service.component.html',
  styleUrls: [ './sp-apply-add-service.component.scss' ]
})
export class SpApplyAddServiceComponent implements OnInit {
  public applyServiceList: Array<ServiceSpApply>;
  public oldServiceSpApplySearch: ServiceSpApplySearch;
  public pagingBoxObj = new PagingBoxObj(1, 0, 10, 0);
  public selectedAccount: any;
  public servicesList: Array<DropDownOption>;
  public serviceSpApplySearch = new ServiceSpApplySearch();
  public serviceProviderList: Array<any>;
  public showSendMessage = false;
  public spAccountData: Array<any>;

  constructor(
    private messageManagerServ: MessageManagerService,
    private serviceSpApplyServ: ServiceSpApplyService,
    private stateServ: AppState,
    private translateServ: TranslateService
  ) {}

  ngOnInit() {
    this.getServices();
    this.getServiceProvider();
    this.getApplyServiceList();
    this.getSendObjectData();
  }

  // 获取SP申请新增服务列表
  getApplyServiceList() {
    const pageSearch = new PageSearch(this.pagingBoxObj.page, this.pagingBoxObj.rows);
    return this.serviceSpApplyServ
      .getApplyServiceList(this.serviceSpApplySearch, pageSearch)
      .success((success) => {
        const data = success && success.data;
        const list = data && data.list;
        list.forEach((item) => {
          if (item.serviceNameSwf) {
            item.title = 'service.sPServiceAdd.table.preview';
          } else {
            item.title = 'service.sPServiceAdd.table.previewedTemporary';
          }
        });
        console.log(list);

        this.applyServiceList = list;
        this.pagingBoxObj.totalRecords = data && data.totalCount;
      })
      .error((error) => {
        this.applyServiceList = [];
        this.pagingBoxObj.totalRecords = 0;
      });
  }

  // 获取发送对象
  getSendObjectData() {
    this.serviceSpApplyServ.getSPAccountList().success((res) => {
      this.spAccountData = res.data;
    });
  }

  // 获取服务提供商
  getServiceProvider() {
    this.serviceSpApplyServ
      .getSpServices()
      .success((success) => {
        const data = success && success.data;
        this.serviceProviderList = [ { label: this.translateServ.instant('service.common.all'), value: '' } ].concat(
          (data || []).map((elem) => {
            return {
              label: elem.orgName,
              value: elem.spId,
              email: elem.email
            };
          })
        );
      })
      .error((error) => {
        this.serviceProviderList = [];
        // console.error(error);
      });
  }

  // 获取服务
  getServices() {
    this.serviceSpApplyServ
      .getServices()
      .translate(CommonFuncService.formatObjForLangCode(this.stateServ.get('language')))
      .success((success) => {
        const data = success && success.data;
        this.servicesList = [ { label: this.translateServ.instant('service.common.all'), value: '' } ].concat(
          (data || []).map((elem) => {
            return {
              label: elem.serviceNameEn || elem.serviceName,
              value: elem.serviceNameId
            };
          })
        );
      })
      .error((error) => {
        this.servicesList = [];
        // console.error(error);
      });
  }

  // 发送消息---取消
  @clickOnce()
  handleCancelClick() {
    this.showSendMessage = false;
  }

  // 导出Excel
  @clickOnce('handleExportExcelClick', 5000)
  handleExportExcelClick() {
    return this.serviceSpApplyServ.exportApplyService(this.serviceSpApplySearch);
  }

  // 分页切换
  handlePageChange(pageInfo: PagingBoxObj) {
    this.pagingBoxObj.page = pageInfo.page;
    this.pagingBoxObj.rows = pageInfo.rows;
    this.getApplyServiceList();
  }

  // 搜索
  @clickWaitHttp('handleSearchClick')
  handleSearchClick(serviceSpApplySearch: ServiceSpApplySearch) {
    this.serviceSpApplySearch = serviceSpApplySearch;
    if (
      this.oldServiceSpApplySearch &&
      CommonFuncService.objectEq(this.oldServiceSpApplySearch, this.serviceSpApplySearch)
    ) {
      return;
    }
    return this.getApplyServiceList();
  }

  // 发送消息
  @clickOnce()
  handleSendMessageClick(spId: any) {
    this.showSendMessage = true;
    this.selectedAccount = [];
    this.spAccountData.forEach((item) => {
      if (item.unificationId === spId.toString()) {
        this.selectedAccount.push(item.value);
      }
    });
  }

  // 发送消息---确定
  @clickWaitHttp('handleSureClick')
  handleSureClick(messageManager: Array<MessageManager>) {
    console.log(messageManager);

    let files = [];
    messageManager.forEach((item) => {
      if (item.fileList) {
        files = files.concat(item.fileList);
      }
    });
    return this.messageManagerServ.addMessage(messageManager).success((res) => {
      console.log(res.data);
      this.messageManagerServ.uploadFiles(res.data, files).success(() => {
        this.pagingBoxObj.page = 1;
        this.getApplyServiceList();
        this.showSendMessage = false;
      });
    });
  }
}
