import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { clickOnce, clickWaitHttp, CommonFuncService, HttpResponse, SUBJECT, SubjectService } from 'src/app/core';
import { RegisterManagerSearch, RegisterManagerData, DropDownOption, STATUS } from 'src/app/service/model';
import { RegisterManagerService, ServiceSpApplyService } from 'src/app/service';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-register-manager',
  templateUrl: './register-manager.component.html',
  styleUrls: [ './register-manager.component.scss' ]
})
export class RegisterManagerComponent implements OnInit, OnDestroy {
  public appealReviewOnOff = false;
  public checkSystemDataOnOff = false;
  public currentId: string;
  public currentRowData: RegisterManagerData;
  public enableOnOff = false;
  public forzenOnOff = false;
  public oldSearch: RegisterManagerSearch;
  public pagingBoxObj = new PagingBoxObj(1, 0, 10, 0);
  public registerManagerSearch = new RegisterManagerSearch();
  public registerManagerList: Array<RegisterManagerData>;
  public serviceCodeList: Array<DropDownOption>;
  public serviceProviderList: Array<DropDownOption>;
  public servicesList: Array<DropDownOption>;
  public statusList: Array<DropDownOption>;
  public stopOnOff = false;
  public systemData: RegisterManagerData;
  public toExamineOnOff = false;

  private subscriptions: Subscription;

  constructor(
    private commonServ: CommonService,
    private messageServ: MessageService,
    private registerManagerServ: RegisterManagerService,
    private serviceSpServ: ServiceSpApplyService,
    private subjectServ: SubjectService,
    private translateServ: TranslateService
  ) {
    // 查看系统资料
    this.subscriptions = this.subjectServ.subscript(SUBJECT.CHECK_SYSTEM_DATA).subscribe((res) => {
      this.currentId = res && res.scId;
      this.getSystemData(this.currentId);
    });

    // 冻结
    let subscript = this.subjectServ.subscript(SUBJECT.FORZEN).subscribe((res) => {
      this.forzenOnOff = true;
      this.currentId = res && res.scId;
    });
    this.subscriptions.add(subscript);

    // 启用
    subscript = this.subjectServ.subscript(SUBJECT.ENABLE).subscribe((res) => {
      this.enableOnOff = true;
      this.currentId = res && res.scId;
    });
    this.subscriptions.add(subscript);

    // 停用
    subscript = this.subjectServ.subscript(SUBJECT.STOP).subscribe((res) => {
      this.stopOnOff = true;
      this.currentId = res && res.scId;
    });
    this.subscriptions.add(subscript);

    // 申诉审核
    subscript = this.subjectServ.subscript(SUBJECT.APPEAL_REVIEW).subscribe((res) => {
      this.currentId = res && res.scId;
      this.registerManagerServ.getSpAndScInfo(this.currentId).success((httpRes) => {
        this.currentRowData = httpRes.data;
        this.appealReviewOnOff = true;
      });
    });
    this.subscriptions.add(subscript);

    // 待初审,待复审,建设中-审核
    subscript = this.subjectServ.subscript(SUBJECT.TO_EXAMINE).subscribe((res) => {
      this.currentId = res && res.scId;
      this.registerManagerServ.getSpAndScInfo(this.currentId).success((httpRes) => {
        this.currentRowData = httpRes.data;
        this.toExamineOnOff = true;
      });
    });
    this.subscriptions.add(subscript);
  }

  ngOnInit() {
    this.getStatus();
    this.getServices();
    this.getServiceCode();
    this.getServiceProvider();
    this.getServiceRegisterManager();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // 获取服务编码
  getServiceCode() {
    return this.commonServ.getServiceCodeList().success((res) => {
      this.serviceCodeList = [ { label: 'service.common.all', value: '' } ].concat(
        (res.data || []).map((elem) => {
          const serviceCode = elem.serviceCodeZh || elem.serviceCodeEn;
          return { value: serviceCode, label: serviceCode };
        })
      );
    });
  }

  // 获取服务提供商
  getServiceProvider() {
    return this.serviceSpServ.getSpServices().success((res) => {
      this.serviceProviderList = [ { label: 'service.common.all', value: '' } ].concat(
        (res.data || []).map((elem) => {
          return { label: elem.orgName, value: elem.spId };
        })
      );
    });
  }

  // 获取服务登记管理列表
  getServiceRegisterManager() {
    const pageIndex = this.pagingBoxObj.page;
    const pageRows = this.pagingBoxObj.rows;
    return this.registerManagerServ
      .getServiceRegisterManager(pageIndex, pageRows, this.registerManagerSearch)
      .success((success) => {
        const data = success && success.data;
        this.registerManagerList = data && data.list;
        this.pagingBoxObj.totalRecords = data && data.totalCount;
      })
      .error(() => {
        this.registerManagerList = [];
      });
  }

  // 获取服务
  getServices() {
    return this.serviceSpServ.getServices().success((res) => {
      this.servicesList = [ { label: 'service.common.all', value: '' } ].concat(
        res.data.map((elem) => {
          return { label: elem.serviceName, value: elem.serviceNameId };
        })
      );
    });
  }

  // 获取状态
  getStatus() {
    this.statusList = this.registerManagerServ.getStatus();
  }

  // 服务登记申请资料--获取系统资料
  getSystemData(id: string) {
    return this.registerManagerServ.getSystemData(id).success((res) => {
      this.systemData = res.data;
      this.checkSystemDataOnOff = true;
    });
  }

  // 申诉审核-提交表单
  @clickWaitHttp('handleAppealReviewSubmitClick')
  handleAppealReviewSubmitClick(operatInfo: any) {
    console.log(typeof this.currentId);
    return this.registerManagerServ
      .appealReview(Number(this.currentId), Number(operatInfo.approvalOperation), operatInfo.approvalOpinion)
      .success(() => {
        this.messageServ.add({
          severity: 'success',
          summary: this.translateServ.instant('service.common.tips'),
          detail: this.translateServ.instant('service.common.operaSuccess')
        });
        this.getServiceRegisterManager();
        this.appealReviewOnOff = false;
      })
      .failed((error) => {
        this.messageServ.add({
          severity: 'error',
          summary: this.translateServ.instant('service.common.tips'),
          detail: this.translateServ.instant('service.common.operaFailed')
        });
      });
  }

  // 取消 --- 待审核
  @clickOnce()
  handleCancelClick() {
    this.toExamineOnOff = false;
  }

  // 关闭启用对话框
  @clickOnce()
  handleCloseEnableClick() {
    this.enableOnOff = false;
  }

  // 关闭冻结对话框
  @clickOnce()
  handleCloseForzenClick() {
    this.forzenOnOff = false;
  }

  // 关闭停用对话框
  @clickOnce()
  handleCloseStopClick() {
    this.stopOnOff = false;
  }

  // 关闭系统资料
  @clickOnce()
  handleCloseSystemDataClick() {
    this.checkSystemDataOnOff = false;
  }

  // 确定 - 启用
  @clickWaitHttp('handleEnableSureClick')
  handleEnableSureClick(e: any) {
    return this.postEnable(this.currentId, e && e.submitReason);
  }

  // 导出Excel
  @clickOnce('handleExportExcelClick', 5000)
  handleExportExcelClick() {
    return this.registerManagerServ.getExportExcel();
  }

  // 确定 - 冻结
  @clickWaitHttp('handleForzenSureClick')
  handleForzenSureClick(reason: string) {
    return this.postForzen(this.currentId, reason);
  }

  // 切换分页
  handlePageChange(pageInfo: PagingBoxObj) {
    this.pagingBoxObj.page = pageInfo.page;
    this.pagingBoxObj.rows = pageInfo.rows;
    this.getServiceRegisterManager();
  }

  // 搜索
  @clickWaitHttp('handleSearchClick')
  handleSearchClick(registerManagerSearch: RegisterManagerSearch) {
    this.pagingBoxObj.page = 1;
    this.registerManagerSearch = registerManagerSearch;
    if (this.oldSearch && CommonFuncService.objectEq(this.oldSearch, this.registerManagerSearch)) {
      return;
    }
    return this.getServiceRegisterManager();
  }

  // 确定 - 停用
  @clickWaitHttp('handleStopSureClick')
  handleStopSureClick(reason: string) {
    return this.postStop(this.currentId, reason);
  }

  // 提交 --- 待审核
  @clickWaitHttp('handleSubmitClick')
  handleSubmitClick(operatInfo: any) {
    let req: HttpResponse<any>;
    if (operatInfo.status === STATUS.BUILD) {
      // 建设中到审核
      req = this.registerManagerServ.buildToPendTrial(
        this.currentId,
        operatInfo.approvalOpinion,
        operatInfo.approvalOperation
      );
    } else if (operatInfo.status === STATUS.PEND_REVIEW) {
      req = this.registerManagerServ.postPendReview(
        this.currentId,
        operatInfo.approvalOpinion,
        operatInfo.approvalOperation
      );
    } else if (operatInfo.status === STATUS.PEND_TRIAL) {
      req = this.registerManagerServ.postPendTrial(
        this.currentId,
        operatInfo.approvalOpinion,
        operatInfo.approvalOperation
      );
    }
    req
      .success(() => {
        this.messageServ.add({
          severity: 'success',
          summary: this.translateServ.instant('service.common.tips'),
          detail: this.translateServ.instant('service.common.operaSuccess')
        });
        this.getServiceRegisterManager();
        this.toExamineOnOff = false;
      })
      .failed((error) => {
        this.messageServ.add({
          severity: 'error',
          summary: this.translateServ.instant('service.common.tips'),
          detail: this.translateServ.instant('service.common.operaFailed')
        });
      });
  }

  // 启用
  postEnable(id: string, content: string) {
    return this.registerManagerServ
      .postEnable(id, content)
      .success(() => {
        this.enableOnOff = false;
        this.messageServ.add({
          severity: 'success',
          summary: this.translateServ.instant('service.common.tips'),
          detail: this.translateServ.instant('service.common.operaSuccess')
        });
        this.getServiceRegisterManager();
      })
      .failed((error) => {
        this.messageServ.add({
          severity: 'error',
          summary: this.translateServ.instant('service.common.tips'),
          detail: this.translateServ.instant('service.common.operaFailed')
        });
      });
  }

  // 冻结
  postForzen(id: string, reason: string) {
    return this.registerManagerServ
      .postForzen(id, reason)
      .success(() => {
        this.forzenOnOff = false;
        this.messageServ.add({
          severity: 'success',
          summary: this.translateServ.instant('service.common.tips'),
          detail: this.translateServ.instant('service.common.operaSuccess')
        });
        this.getServiceRegisterManager();
      })
      .failed((error) => {
        this.messageServ.add({
          severity: 'error',
          summary: this.translateServ.instant('service.common.tips'),
          detail: this.translateServ.instant('service.common.operaFailed')
        });
      });
  }

  // 停用
  postStop(id: string, reason: string) {
    return this.registerManagerServ
      .postStop(id, reason)
      .success(() => {
        this.stopOnOff = false;
        this.messageServ.add({
          severity: 'success',
          summary: this.translateServ.instant('service.common.tips'),
          detail: this.translateServ.instant('service.common.operaSuccess')
        });
        this.getServiceRegisterManager();
      })
      .failed((error) => {
        this.messageServ.add({
          severity: 'error',
          summary: this.translateServ.instant('service.common.tips'),
          detail: this.translateServ.instant('service.common.operaFailed')
        });
      });
  }
}
