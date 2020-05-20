import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { STATUS, RegisterManagerService, RegisterManagerData } from 'src/app/service';
import { CommonService } from 'src/app/service/common.service';
import { AppState, CommonFuncService, HttpResponse, clickOnce, clickWaitHttp } from 'src/app/core';

@Component({
  selector: 'app-register-detail',
  templateUrl: './register-detail.component.html',
  styleUrls: [ './register-detail.component.scss' ]
})
export class RegisterDetailComponent implements OnInit, OnDestroy {
  public appealReviewOnOff = false;
  public dataChange = false;
  public id: string;
  public serviceRegisterDetail: RegisterManagerData;
  public status: number;
  public statusObj = STATUS;
  public toExamineOnOff = false;

  private subscriptions: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private commonServ: CommonService,
    private messageServ: MessageService,
    private registerManagerServ: RegisterManagerService,
    private router: Router,
    private stateServ: AppState,
    private translateServ: TranslateService
  ) {
    this.subscriptions = this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.id = queryParams && queryParams.id;
      this.status = queryParams && queryParams.status;
      if (this.id && this.status) {
        this.getServiceRegisterDetail();
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get phone() {
    let telObj = '';
    const scInfo = this.serviceRegisterDetail || {};
    if (scInfo.phoneArea != null && scInfo.phoneArea !== '') {
      telObj += scInfo.phoneType + '-' + scInfo.phoneArea + '-' + scInfo.phone;
      if (scInfo.phoneExt != null && scInfo.phoneExt !== '') {
        telObj += '-' + scInfo.phoneExt;
      }
    } else {
      telObj += scInfo.phone;
    }
    return telObj;
  }

  // 获取服务登记详情信息
  getServiceRegisterDetail() {
    this.registerManagerServ
      .getSpAndScInfo(this.id)
      .translate(CommonFuncService.formatObjForLangCode(this.stateServ.get('language')))
      .success((success) => {
        const data = success && success.data;
        this.serviceRegisterDetail = data;
        this.status = this.serviceRegisterDetail && this.serviceRegisterDetail.applicationStatus;
      });
  }

  // 申诉审核-打开弹窗
  @clickOnce()
  handleAppealAuditClick() {
    this.appealReviewOnOff = true;
  }

  // 申诉审核-确定
  @clickWaitHttp('handleAppealReviewSubmitClick')
  handleAppealReviewSubmitClick(operatInfo: any) {
    console.log(typeof this.id);
    // console.log(operatInfo);
    return this.registerManagerServ
      .appealReview(Number(this.id), Number(operatInfo.approvalOperation), operatInfo.approvalOpinion)
      .success(() => {
        this.messageServ.add({
          severity: 'success',
          summary: this.translateServ.instant('service.common.tips'),
          detail: this.translateServ.instant('service.common.operaSuccess')
        });
        this.getServiceRegisterDetail();
        this.appealReviewOnOff = false;
        this.dataChange = true;
      })
      .failed((error) => {
        this.messageServ.add({
          severity: 'error',
          summary: this.translateServ.instant('service.common.tips'),
          detail: this.translateServ.instant('service.common.operaFailed')
        });
      });
  }

  // 返回
  @clickOnce()
  handleBackClick() {
    console.log(this.dataChange);

    if (this.dataChange) {
      this.router.navigate([ 'register' ], { relativeTo: this.activatedRoute.parent, queryParams: { reload: true } });
    } else {
      this.router.navigate([ 'register' ], { relativeTo: this.activatedRoute.parent });
    }
  }

  // 复制成功---回调函数
  @clickOnce()
  handleCopySuccessClick() {
    this.messageServ.add({
      severity: 'success',
      summary: this.translateServ.instant('service.common.tips'),
      detail: this.translateServ.instant('service.common.copySuccess')
    });
  }

  // 取消 --- 待审核
  @clickOnce()
  handleCancelClick() {
    this.toExamineOnOff = false;
  }

  @clickOnce('handleDownloadClick', 3000)
  handleDownloadClick() {
    this.commonServ.downLoadFile(this.serviceRegisterDetail.originalServicePlan);
  }

  @clickWaitHttp('handlePrePDFClick')
  handlePrePDFClick(uuid: string) {
    if (!uuid) {
      return;
    }
    return this.commonServ.getFileDownloadURL(uuid).success((res) => {
      window.open(res.data, '_blank');
    });
  }

  // 提交 --- 待审核
  @clickWaitHttp('handleSubmitClick')
  handleSubmitClick(operatInfo: any) {
    let req: HttpResponse<any>;
    if (operatInfo.status === STATUS.BUILD) {
      // 建设中到审核
      req = this.registerManagerServ.buildToPendTrial(
        this.serviceRegisterDetail.scId,
        operatInfo.approvalOpinion,
        operatInfo.approvalOperation
      );
    } else if (operatInfo.status === STATUS.PEND_REVIEW) {
      req = this.registerManagerServ.postPendReview(
        this.serviceRegisterDetail.scId,
        operatInfo.approvalOpinion,
        operatInfo.approvalOperation
      );
    } else if (operatInfo.status === STATUS.PEND_TRIAL) {
      req = this.registerManagerServ.postPendTrial(
        this.serviceRegisterDetail.scId,
        operatInfo.approvalOpinion,
        operatInfo.approvalOperation
      );
    }
    return req
      .success(() => {
        this.messageServ.add({
          severity: 'success',
          summary: this.translateServ.instant('service.common.tips'),
          detail: this.translateServ.instant('service.common.operaSuccess')
        });
        this.getServiceRegisterDetail();
        this.toExamineOnOff = false;
        this.dataChange = true;
      })
      .failed((error) => {
        this.messageServ.add({
          severity: 'error',
          summary: this.translateServ.instant('service.common.tips'),
          detail: this.translateServ.instant('service.common.operaFailed')
        });
      });
  }

  // 待审核
  @clickOnce()
  handleToExamineClick() {
    this.toExamineOnOff = true;
  }
}
