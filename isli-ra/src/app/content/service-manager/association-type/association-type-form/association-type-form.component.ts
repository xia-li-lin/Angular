import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GlobalValidService } from 'mpr-form-valid';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppState, CommonFuncService, clickWaitHttp, clickOnce } from 'src/app/core';
import { AssociationType, DropDownOption, languageEnable, RelevanceTypeInfo } from 'src/app/service/model';
import { ServiceAssociationService } from 'src/app/service/service.association.service';

@Component({
  selector: 'app-association-type-form',
  templateUrl: './association-type-form.component.html',
  styleUrls: [ './association-type-form.component.scss' ]
})
export class AssociationTypeFormComponent implements OnInit, OnDestroy {
  public assoication = new RelevanceTypeInfo();
  public associationTypeCn = new AssociationType();
  public associationTypeEn = new AssociationType();
  public dataChange: boolean;
  public dialogConfirmTxt: string;
  public dialogOnOff = false;
  public language: string;
  public mark: boolean;
  public oldAssociationTypeCn = new AssociationType();
  public oldAssociationTypeEn = new AssociationType();
  public relevanceTypeId: string;
  public sourceTypeEnList: Array<DropDownOption>;
  public sourceTypeZhList: Array<DropDownOption>;
  public targetTypeEnList: Array<DropDownOption>;
  public targetTypeZhList: Array<DropDownOption>;
  public title: string;
  public validFunc: () => boolean | Promise<boolean>;

  private subscriptions: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private globalValidServ: GlobalValidService,
    private messageServ: MessageService,
    private router: Router,
    private serviceAssociationServ: ServiceAssociationService,
    private stateServ: AppState,
    private translateService: TranslateService
  ) {
    this.dialogConfirmTxt = this.translateService.instant('service.common.saveAndContinue');
    this.language = this.stateServ.get('language');

    this.subscriptions = this.activatedRoute.queryParams.subscribe((queryParams) => {
      const reload = queryParams && queryParams.reload;
      this.dataChange = reload === 'false' ? true : false;

      const relevanceTypeId = queryParams && queryParams.relevanceTypeId;
      this.relevanceTypeId = relevanceTypeId;
      this.mark = !relevanceTypeId ? true : false;
      console.log(queryParams);

      if (!this.mark) {
        this.title = 'service.associationType.modify';
        this.getAssocicationDetail(relevanceTypeId);
      } else {
        this.title = 'service.associationType.add';
      }
    });

    this.getSourceAndTargetType();

    this.validFunc = () => {
      return new Promise<boolean>((resolve, reject) => {
        this.serviceAssociationServ
          .addAssoication(this.assoication)
          .success((success) => {
            console.log(success);
            this.messageServ.add({
              severity: 'success',
              summary: this.translateService.instant('service.associationType.title'),
              detail: this.translateService.instant('service.common.operaSuccess')
            });
            this.dataChange = true;
            this.router.navigate([ '/content/service/association-type/list/add' ], { queryParams: { reload: false } });
            resolve(true);
          })
          .error((error) => {
            this.messageServ.add({
              severity: 'error',
              summary: this.translateService.instant('service.associationType.title'),
              detail: this.translateService.instant('service.common.operaFailed')
            });
            resolve(false);
          });
      });
    };
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // 新增关联类型
  addAssoication() {
    this.serviceAssociationServ
      .addAssoication(this.assoication)
      .success((success) => {
        console.log(success);
        this.messageServ.add({
          severity: 'success',
          summary: this.translateService.instant('service.associationType.title'),
          detail: this.translateService.instant('service.common.operaSuccess')
        });
        this.dataChange = true;
        this.router.navigate([ 'list' ], { relativeTo: this.activatedRoute.parent, queryParams: { reload: true } });
      })
      .error((error) => {
        this.messageServ.add({
          severity: 'error',
          summary: this.translateService.instant('service.associationType.title'),
          detail: this.translateService.instant('service.common.operaFailed')
        });
      });
  }

  // 获取关联类型
  getAssocicationDetail(relevanceTypeId: string) {
    this.serviceAssociationServ.getAssocicationDetail(relevanceTypeId).success((success) => {
      this.assoication = success && success.data;
      this.associationTypeCn.id = this.associationTypeEn.id = this.relevanceTypeId;
      this.associationTypeCn.createTime = this.associationTypeEn.createTime = this.assoication.createDateTime;

      this.associationTypeCn.associationTypeName = this.assoication.relevanceTypeNameZh;
      this.associationTypeCn.sourceTypeZh = this.assoication.sourceTypeZh;
      this.associationTypeCn.targetTypeZh = this.assoication.targetTypeZh;
      this.associationTypeCn.description = this.assoication.descriptionZh;

      this.associationTypeEn.associationTypeName = this.assoication.relevanceTypeNameEn;
      this.associationTypeEn.sourceTypeEn = this.assoication.sourceTypeEn;
      this.associationTypeEn.targetTypeEn = this.assoication.targetTypeEn;
      this.associationTypeEn.description = this.assoication.descriptionEn;

      this.oldAssociationTypeCn = CommonFuncService.clone(this.associationTypeCn);
      this.oldAssociationTypeEn = CommonFuncService.clone(this.associationTypeEn);
      // console.log(this.associationTypeCn, this.associationTypeEn);
    });
  }

  // 获取源类型
  getSourceAndTargetType() {
    if (this.stateServ.get('sourceAndTargetTypeList')) {
      const typeList = this.stateServ.get('sourceAndTargetTypeList');
      this.sourceAndTargetTypeData(typeList);
    } else {
      this.serviceAssociationServ
        .getSourceType()
        .translate(CommonFuncService.formatObjForLangCode(this.language))
        .success((success) => {
          const data = success && success.data;
          const typeList = (data || []).map((item) => {
            return {
              label: item.entityName,
              value: item.entityId
            };
          });
          this.stateServ.set('sourceAndTargetTypeList', typeList);
          this.sourceAndTargetTypeData(typeList);
          console.log(data);
        })
        .error((error) => {});
    }
  }

  // 确定/保存
  @clickWaitHttp('handleSaveClick')
  handleSaveClick() {
    console.log(this.assoication.relevanceTypeId);

    this.translateSubmitData();
    if (this.globalValidServ.validAll()) {
      return this.relevanceTypeId ? this.updateAssoication() : this.addAssoication();
    }
  }

  // 保存并继续
  @clickOnce()
  handleSaveAndContinueClick() {
    this.translateSubmitData();
    if (this.globalValidServ.validAll()) {
      this.dialogOnOff = true;
    }
  }

  // 取消
  @clickOnce()
  handleCancelClick() {
    console.log(this.dataChange);

    if (this.dataChange) {
      this.router.navigate([ 'list' ], {
        relativeTo: this.activatedRoute.parent,
        queryParams: { reload: true }
      });
    } else {
      this.router.navigate([ 'list' ], {
        relativeTo: this.activatedRoute.parent
      });
    }
  }

  // 关闭弹框
  @clickOnce()
  handleCancelDialogClick() {
    this.dialogOnOff = false;
  }

  // 源类型改变
  handleSourceTypeChange(sourceType: string) {
    this.associationTypeCn.sourceTypeZh = this.associationTypeEn.sourceTypeEn = sourceType;
  }

  // 目标类型改变
  handleTargetTypeChange(targetType: string) {
    this.associationTypeCn.targetTypeZh = this.associationTypeEn.targetTypeEn = targetType;
  }

  languageEnable(langCode: string) {
    return languageEnable(langCode);
  }

  sourceAndTargetTypeData(typeList) {
    let data;
    if (typeof typeList === 'string') {
      data = JSON.parse(typeList);
    } else {
      data = typeList;
    }
    this.sourceTypeZhList = [ { label: '- 請選擇源類型 -', value: '' } ].concat(CommonFuncService.clone(data));
    this.sourceTypeEnList = [ { label: '- Please select the source type -', value: '' } ].concat(
      CommonFuncService.clone(data)
    );
    this.targetTypeZhList = [ { label: '- 請選擇目標類型 -', value: '' } ].concat(CommonFuncService.clone(data));
    this.targetTypeEnList = [ { label: '- Please select the target type -', value: '' } ].concat(
      CommonFuncService.clone(data)
    );
  }

  translateSubmitData() {
    console.log(this.associationTypeCn, this.associationTypeEn);
    this.assoication = new RelevanceTypeInfo();
    this.assoication.relevanceTypeId = this.relevanceTypeId;
    if (this.associationTypeCn) {
      this.assoication.relevanceTypeNameZh = this.associationTypeCn.associationTypeName;
      this.assoication.sourceTypeZh = this.associationTypeCn.sourceTypeZh;
      this.assoication.targetTypeZh = this.associationTypeCn.targetTypeZh;
      this.assoication.descriptionZh = this.associationTypeCn.description;
    }
    if (this.associationTypeEn) {
      this.assoication.relevanceTypeNameEn = this.associationTypeEn.associationTypeName;
      this.assoication.sourceTypeEn = this.associationTypeEn.sourceTypeEn;
      this.assoication.targetTypeEn = this.associationTypeEn.targetTypeEn;
      this.assoication.descriptionEn = this.associationTypeEn.description;
    }
    return this.assoication;
  }

  // 修改关联类型
  updateAssoication() {
    this.serviceAssociationServ
      .updateAssoication(this.assoication)
      .success((success) => {
        console.log(success);
        this.messageServ.add({
          severity: 'success',
          summary: this.translateService.instant('service.associationType.title'),
          detail: this.translateService.instant('service.common.operaSuccess')
        });
        this.dataChange = true;
        this.router.navigate([ 'list' ], { relativeTo: this.activatedRoute.parent, queryParams: { reload: true } });
      })
      .error((error) => {
        this.messageServ.add({
          severity: 'error',
          summary: this.translateService.instant('service.associationType.title'),
          detail: this.translateService.instant('service.common.operaFailed')
        });
      });
  }
}
