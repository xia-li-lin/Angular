import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GlobalValidService } from 'mpr-form-valid';
import { clickOnce, clickWaitHttp } from 'src/app/core/cache';
import { AppState, CommonFuncService } from 'src/app/core';
import {
  DropDownOption,
  languageEnable,
  RelevanceTypeInfo,
  ServiceInfo,
  ServiceListFormZh,
  ServiceListFormEn
} from 'src/app/service/model';
import { TranslateService } from '@ngx-translate/core';
import { ServiceAssociationService } from 'src/app/service/service.association.service';
import { ServiceListService } from 'src/app/service/service-list.service';
import { SUBJECT, SubjectService } from 'src/app/core/subject';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: [ './service-form.component.scss' ]
})
export class ServiceFormComponent implements OnInit, OnDestroy {
  public associatedFieldSegmentsList: Array<DropDownOption>;
  public associationTypeEnList: Array<DropDownOption> = [];
  public associationTypeZhList: Array<DropDownOption> = [];
  public dataChange: boolean;
  public dialogConfirmTxt: string;
  public dialogOnOff = false;
  public dialogTitle: string;
  public language: string;
  public mark: boolean; // true:新增 false:修改
  public oldServiceDetail = new ServiceInfo();
  public relevanceList: Array<RelevanceTypeInfo>;
  public serviceAssociationTargetList: Array<DropDownOption>;
  public serviceDetail = new ServiceInfo();
  public title: string;
  public validFunc: () => boolean | Promise<boolean>;

  private subscription: Subscription;

  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;

  constructor(
    private activatedRoute: ActivatedRoute,
    private globalValidServ: GlobalValidService,
    private router: Router,
    private serviceAssociationServ: ServiceAssociationService,
    private serviceListServ: ServiceListService,
    private stateServ: AppState,
    private subjectServ: SubjectService,
    private translateServ: TranslateService
  ) {
    this.dialogConfirmTxt = this.translateServ.instant('service.common.continueCreate');
    this.dialogTitle = this.translateServ.instant('service.common.tips');
    this.language = this.stateServ.get('language');

    this.subscription = this.activatedRoute.queryParams.subscribe((queryParams) => {
      const reload = queryParams && queryParams.reload;
      this.dataChange = reload === 'false' ? true : false;
      const id = queryParams && queryParams.id;
      this.stateServ.set('serviceId', id);
      this.mark = !id ? true : false;
      if (!this.mark) {
        // 修改
        this.title = 'service.serviceList.modify';
        this.getServiceDetail(id);
      } else {
        this.title = 'service.serviceList.add';
        this.serviceDetail.relevanceNumEn = this.serviceDetail.relevanceNumZh = 1;
      }
    });

    this.validFunc = () => {
      return new Promise<boolean>((resolve, reject) => {
        this.serviceListServ
          .addService(this.serviceDetail)
          .success((success) => {
            this.router.navigate([ '/content/service/services/list/add' ], { queryParams: { reload: false } });
            this.dataChange = true;
            resolve(true);
          })
          .error((error) => {
            resolve(false);
            console.error('error');
          });
      });
    };
  }

  ngOnInit() {
    this.initAssociatedFieldSegmentsList();
    this.getServiceAssociationTargetList();
    this.getAssociationTypeList();
    this.getServiceAssociationTargetList();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // 新增服务
  addService(serviceInfo: any) {
    this.serviceListServ
      .addService(serviceInfo)
      .success((success) => {
        this.router.navigate([ 'list' ], { relativeTo: this.activatedRoute.parent, queryParams: { reload: true } });
        this.dataChange = true;
      })
      .error((error) => {
        console.error('error');
      });
  }

  // 关联类型列表
  getAssociationTypeList() {
    this.serviceAssociationServ
      .getAssociationType()
      .success((success) => {
        const data = success && success.data;
        // 繁体
        this.associationTypeZhList = this.translateAssociationTypeList(data, 'cn');
        // English
        this.associationTypeEnList = this.translateAssociationTypeList(data, 'en');
      })
      .error((error) => {
        console.error('error');
      });
  }

  // 获取服务关联目标
  getServiceAssociationTargetList() {
    this.serviceAssociationServ
      .geTargetType()
      .translate(CommonFuncService.formatObjForLangCode(this.stateServ.get('language')))
      .success((success) => {
        const data = success && success.data;
        this.serviceAssociationTargetList = (data || []).map((item) => {
          return {
            label: item.entityName,
            value: item.entityId
          };
        });
      });
  }

  // 获取服务详情信息
  getServiceDetail(serviceInfoId: string) {
    this.serviceListServ
      .getServiceDetail(serviceInfoId)
      .success((success) => {
        const data = success && success.data;
        this.serviceDetail = data && data.service;
        this.relevanceList = data && data.relevanceList;
        this.serviceDetail.targetEntityType = Number(this.serviceDetail.targetEntityType);

        this.oldServiceDetail = CommonFuncService.clone(this.serviceDetail);
      })
      .error((error) => {
        console.error('error');
      });
  }

  // 自动获取服务编码
  @clickWaitHttp('handleAutoGetServiceCodeClick')
  handleAutoGetServiceCodeClick() {
    return this.serviceListServ.generateServiceCode().success((success) => {
      const data = success && success.data;
      this.serviceDetail.serviceCodeZh = this.serviceDetail.serviceCodeEn = data;
      // console.log(data);
    });
  }

  // 改变关联字段分段
  handleAssociatedFieldSegmentsChange(e) {
    const value = e && e.value;
    this.serviceDetail.relevanceNumZh = this.serviceDetail.relevanceNumEn = value;
  }

  // 取消
  @clickOnce()
  handleCancelClick() {
    console.log(this.dataChange);

    if (this.dataChange) {
      this.router.navigate([ 'list' ], { relativeTo: this.activatedRoute.parent, queryParams: { reload: true } });
    } else {
      this.router.navigate([ 'list' ], { relativeTo: this.activatedRoute.parent });
    }
  }

  // 关闭弹框
  @clickOnce()
  handleCancelDialogClick() {
    this.dialogOnOff = false;
  }

  // 改变关联类型
  handleMultiSelectChange(e) {
    this.serviceDetail.relevanceTypeZh = this.serviceDetail.relevanceTypeEn = e;
    console.log(e);
    this.subjectServ.pubscript(SUBJECT.ASSOCIATION_TYPE, e);
  }

  // 保存并继续
  @clickOnce()
  handleSaveAndContinueClick() {
    if (this.globalValidServ.validAll(true)) {
      this.dialogOnOff = true;
    }
  }

  // 保存
  @clickWaitHttp('handleSaveClick')
  handleSaveClick() {
    if (this.globalValidServ.validAll(true)) {
      return this.mark ? this.addService(this.serviceDetail) : this.postSaveService(this.serviceDetail);
    }
  }

  // 改变服务关联目标
  handleServiceAssociationTargetChange(e) {
    this.serviceDetail.targetEntityType = e.value;
  }

  // 更新关联字段长度
  handleRelevanceLengthUpdate(e) {
    this.serviceDetail.relevanceLengthZh = this.serviceDetail.relevanceLengthEn = e;
  }

  // 更新关联字段分段
  handleUpdataFildes(e) {
    this.serviceDetail.relevanceSubsectionZh = this.serviceDetail.relevanceSubsectionEn = e;
    console.log(e);
  }

  initAssociatedFieldSegmentsList() {
    this.associatedFieldSegmentsList = [];
    for (let i = 0; i < 20; i++) {
      this.associatedFieldSegmentsList.push(new DropDownOption(`${i + 1}`, i + 1));
    }
  }

  // 语种配置 - 状态：启用
  languageEnable(langCode: string) {
    return languageEnable(langCode);
  }

  // 保存服务
  postSaveService(sericeInfo: any) {
    this.serviceListServ
      .updateService(sericeInfo)
      .success((success) => {
        this.router.navigate([ 'list' ], { relativeTo: this.activatedRoute.parent, queryParams: { reload: true } });
        this.dataChange = true;
      })
      .error((error) => {
        console.error('error');
      });
  }

  // 关联类型数据转换
  translateAssociationTypeList(relevanceTypeInfo: Array<RelevanceTypeInfo>, language: string) {
    return (relevanceTypeInfo || []).map((item) => {
      return {
        label: language === 'en' ? item.relevanceTypeNameEn : item.relevanceTypeNameZh,
        value: item.relevanceTypeId
      };
    });
  }
}
