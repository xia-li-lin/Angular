import { Component, OnInit } from '@angular/core';
import { GlobalValidService } from 'mpr-form-valid';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppState, clickOnce, clickWaitHttp, CommonFuncService } from 'src/app/core';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { ATTR_TYPE, EntityField, PageParams, PERMISSION, PARAM_TYPE, SOURCE_TYPE } from 'src/app/service/model';
import { SourceListService } from 'src/app/service/source-list.service';

@Component({
  selector: 'app-source-config',
  templateUrl: './source-config.component.html',
  styleUrls: [ './source-config.component.scss' ]
})
export class SourceConfigComponent implements OnInit {
  public controllWordList = [];
  public currentParamId: number;
  public dialogOnOff = false;
  public entityField: EntityField;
  public entityFields: Array<EntityField>;
  public entityId: string;
  public entityName: string;
  public language: string;
  public pagingBoxObj = new PagingBoxObj(1, 0, 10, 0);
  public sourceAttrOnOff = false;
  public validFunc: () => boolean | Promise<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private globalValidServ: GlobalValidService,
    private messageServ: MessageService,
    private router: Router,
    private sourceListServ: SourceListService,
    private stateServ: AppState,
    private translateServ: TranslateService
  ) {
    this.language = this.stateServ.get('language');

    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.entityId = queryParams && queryParams.entityId;
      this.entityName = queryParams && queryParams.entityName;

      if (this.entityId) {
        this.getEntityAttrs();
        this.getControllWordList();
      }
    });

    this.validFunc = () => {
      return new Promise<boolean>((resolve, reject) => {
        this.deleteEntityAttr();
        resolve(true);
      });
    };
  }

  ngOnInit() {}

  // 添加属性
  addEntityAttr() {
    return this.sourceListServ
      .addEntityAttr(this.entityField)
      .success((success) => {
        this.sourceAttrOnOff = false;
        this.messageServ.add({
          severity: 'success',
          summary: this.translateServ.instant('service.sourceList.config.configurationProperty'),
          detail: this.translateServ.instant('service.common.operaSuccess')
        });
        this.getEntityAttrs();
      })
      .error((error) => {
        this.messageServ.add({
          severity: 'error',
          summary: this.translateServ.instant('service.sourceList.config.configurationProperty'),
          detail: this.translateServ.instant('service.common.operaFailed')
        });
      });
  }

  // 删除属性
  deleteEntityAttr() {
    this.sourceListServ.deleteEntityAttr(this.currentParamId).success((success) => {
      this.dialogOnOff = false;
      this.getEntityAttrs();
    });
  }

  // 获取受控词列表
  getControllWordList() {
    const pageSearch = new PageParams(1, 1000000);
    this.sourceListServ
      .getControllWordList(null, pageSearch)
      .translate(CommonFuncService.formatObjForLangCode(this.language))
      .success((success) => {
        const data = success && success.data;
        const pageDataList = data && data.pageDataList;
        this.controllWordList = (pageDataList || []).map((item) => {
          return {
            label: item.controlledName,
            value: item.controlledId
          };
        });
        console.log(data);
      })
      .error((error) => {
        this.controllWordList = [];
        console.log(error);
      });
  }

  // 获取词条列表
  getEntityAttrs() {
    const pageSearch = new PageParams(this.pagingBoxObj.page, this.pagingBoxObj.rows);
    this.sourceListServ
      .getEntityAttrs(pageSearch, Number(this.entityId))
      .translate(CommonFuncService.formatObjForLangCode(this.language))
      .success((success) => {
        const data = success && success.data;
        this.entityFields = data && data.pageDataList;
        this.pagingBoxObj.totalRecords = data && data.pageDataSize;
      });
  }

  // 添加
  @clickOnce()
  handleAddClick() {
    this.sourceAttrOnOff = true;
    this.initAttrForm();
  }

  // 关闭删除对话框
  @clickOnce()
  handleCancelDialogClick() {
    this.dialogOnOff = false;
  }

  // 删除
  @clickOnce()
  handleDeleteClick(entityField: EntityField) {
    this.currentParamId = entityField.paramId;
    this.dialogOnOff = true;
    console.log(this.currentParamId);
  }

  // 修改
  @clickOnce()
  handleModifyClick(entityField: EntityField) {
    this.sourceAttrOnOff = true;
    this.entityField = entityField;
    console.log(this.entityField);
  }

  // 分页切换
  handlePageChange(pageInfo: PagingBoxObj) {
    this.pagingBoxObj.page = pageInfo.page;
    this.pagingBoxObj.rows = pageInfo.rows;
    this.getEntityAttrs();
  }

  // 保存
  @clickWaitHttp('handleSaveClick')
  handleSaveClick(entityField: EntityField) {
    console.log(entityField);
    entityField.entityId = Number(this.entityId);
    entityField.entityType = SOURCE_TYPE.ENTITY;
    if (this.globalValidServ.validAll()) {
      const paramId = entityField.paramId;
      return paramId ? this.updateEntityAttr() : this.addEntityAttr();
    }
  }

  // 初始化属性表单数据
  initAttrForm() {
    this.entityField = new EntityField();
    this.entityField.permission = PERMISSION.CONTROLLED;
    this.entityField.dataId = ATTR_TYPE.SINGLE_LINE_TEXT;
    this.entityField.paramType = PARAM_TYPE.MUST_READ;
    this.entityField.multiValue = 1;
    this.entityField.entityId = Number(this.entityId);
  }

  // 修改属性
  updateEntityAttr() {
    console.log(this.entityField);
    return this.sourceListServ
      .updateEntityAttr(this.entityField)
      .success((success) => {
        this.sourceAttrOnOff = false;
        this.messageServ.add({
          severity: 'success',
          summary: this.translateServ.instant('service.sourceList.config.configurationProperty'),
          detail: this.translateServ.instant('service.common.operaSuccess')
        });
        this.getEntityAttrs();
      })
      .error((error) => {
        this.messageServ.add({
          severity: 'error',
          summary: this.translateServ.instant('service.sourceList.config.configurationProperty'),
          detail: this.translateServ.instant('service.common.operaFailed')
        });
      });
  }
}
