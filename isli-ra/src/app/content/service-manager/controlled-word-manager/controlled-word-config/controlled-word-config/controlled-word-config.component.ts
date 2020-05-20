import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalValidService } from 'mpr-form-valid';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AppState, clickOnce, clickWaitHttp, CommonFuncService } from 'src/app/core';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { ControllWord, ControllWordAttr, PageParams } from 'src/app/service/model';
import { ControllWorldService } from 'src/app/service/control-world.service';

@Component({
  selector: 'app-controlled-word-config',
  templateUrl: './controlled-word-config.component.html',
  styleUrls: [ './controlled-word-config.component.scss' ]
})
export class ControlledWordConfigComponent implements OnInit, OnDestroy {
  public addOnOff = false;
  public controlledId: string;
  public controlledName: string;
  public controllWord: ControllWord;
  public controllWordAttrList: Array<ControllWordAttr>;
  public currentItemId: string;
  public dialogOnOff = false;
  public language: string;
  public pagingBoxObj = new PagingBoxObj(1, 0, 10, 0);
  public title: string;
  public validFunc: () => boolean | Promise<boolean>;

  private subscriptions: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private controllWorldServ: ControllWorldService,
    private globalValidServ: GlobalValidService,
    private messageServ: MessageService,
    private router: Router,
    private stateServ: AppState,
    private translateServ: TranslateService
  ) {
    this.language = this.stateServ.get('language');

    this.subscriptions = this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.controlledId = queryParams && queryParams.controlledId;
      this.controlledName = queryParams && queryParams.controlledName;
      // console.log(queryParams);

      if (this.controlledId) {
        this.getControllWordAttrList();
      }
    });

    this.validFunc = () => {
      return new Promise<boolean>((resolve, reject) => {
        this.controllWorldServ
          .deleteControllWordAttr(this.currentItemId)
          .success((res) => {
            this.getControllWordAttrList();
            this.dialogOnOff = false;
            resolve(true);
          })
          .error((res) => {
            resolve(false);
          });
      });
    };
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // 添加词条
  addControllWordAttr(controllWordAttr: ControllWordAttr) {
    return this.controllWorldServ
      .addControllWordAttr(controllWordAttr)
      .success((success) => {
        this.addOnOff = false;
        this.messageServ.add({
          severity: 'success',
          summary: this.translateServ.instant('service.controlledWordManagement.config.term'),
          detail: this.translateServ.instant('service.common.operaSuccess')
        });
        this.getControllWordAttrList();
      })
      .error((error) => {
        this.messageServ.add({
          severity: 'error',
          summary: this.translateServ.instant('service.controlledWordManagement.config.term'),
          detail: this.translateServ.instant('service.common.operaFailed')
        });
      });
  }

  // 获取词条列表
  getControllWordAttrList() {
    const pageSearch = new PageParams(this.pagingBoxObj.page, this.pagingBoxObj.rows);
    this.controllWorldServ
      .getControllWordAttrList(this.controlledId, pageSearch)
      .translate(CommonFuncService.formatObjForLangCode(this.stateServ.get('language')))
      .success((success) => {
        const data = success && success.data;
        this.controllWordAttrList = data && data.pageDataList;
        this.pagingBoxObj.totalRecords = data && data.pageDataSize;
      })
      .error((error) => {
        this.controllWordAttrList = [];
        this.pagingBoxObj.totalRecords = 0;
      });
  }

  // 添加词条
  @clickOnce()
  handleAddClick() {
    this.addOnOff = true;
    this.controllWord = new ControllWord();
    this.currentItemId = null;
    this.title = 'service.controlledWordManagement.config.form.addTerm';
  }

  // 关闭删除对话框
  @clickOnce()
  handleCancelDialogClick() {
    this.dialogOnOff = false;
  }

  // 删除
  @clickOnce()
  handleDeleteClick(rowData) {
    this.currentItemId = rowData.itemId;
    this.dialogOnOff = true;
    console.log(rowData);
  }

  // 修改
  @clickOnce()
  handleModifyClick(rowData) {
    console.log(rowData);
    this.currentItemId = rowData.itemId;
    this.addOnOff = true;
    this.title = 'service.controlledWordManagement.config.form.modifyTerm';
    this.controllWord = new ControllWord(
      rowData.controlledId,
      rowData.code,
      rowData.value,
      rowData.valueZh,
      rowData.valueEn,
      rowData.createTime,
      rowData.displayOrder
    );
  }

  // 保存
  @clickWaitHttp('handleSaveClick')
  handleSaveClick(controllWord: ControllWord) {
    console.log(controllWord);
    const controllWordAttr = new ControllWordAttr();
    controllWordAttr.valueZh = controllWord.controlledNameZh;
    controllWordAttr.valueEn = controllWord.controlledNameEn;
    controllWordAttr.code = controllWord.controlledCode;
    controllWordAttr.displayOrder = controllWord.displayOrder;
    controllWordAttr.controlledId = Number(this.controlledId);
    controllWordAttr.itemId = Number(this.currentItemId);

    if (this.globalValidServ.validAll()) {
      return this.currentItemId
        ? this.updateControllWordAttr(controllWordAttr)
        : this.addControllWordAttr(controllWordAttr);
    }
  }

  // 分页切换
  handlePageChange(pageInfo: PagingBoxObj) {
    this.pagingBoxObj.page = pageInfo.page;
    this.pagingBoxObj.rows = pageInfo.rows;
    this.getControllWordAttrList();
  }

  // 修改词条
  updateControllWordAttr(controllWordAttr: ControllWordAttr) {
    return this.controllWorldServ
      .updateControllWordAttr(controllWordAttr)
      .success((success) => {
        this.addOnOff = false;
        this.messageServ.add({
          severity: 'success',
          summary: this.translateServ.instant('service.controlledWordManagement.config.term'),
          detail: this.translateServ.instant('service.common.operaSuccess')
        });
        this.getControllWordAttrList();
      })
      .error((error) => {
        this.messageServ.add({
          severity: 'error',
          summary: this.translateServ.instant('service.controlledWordManagement.config.term'),
          detail: this.translateServ.instant('service.common.operaFailed')
        });
      });
  }
}
