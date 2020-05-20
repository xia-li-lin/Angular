import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { AppState, CommonFuncService, clickWaitHttp, clickOnce } from 'src/app/core';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { ControllWord, ControllWordSearch, PageParams } from 'src/app/service/model';
import { ControllWorldService } from 'src/app/service/control-world.service';

@Component({
  selector: 'app-controlled-word-manager',
  templateUrl: './controlled-word-manager.component.html',
  styleUrls: [ './controlled-word-manager.component.scss' ]
})
export class ControlledWordManagerComponent implements OnInit {
  public addOnOff = false; // 新增开关
  public controllWord: Array<ControllWord>;
  public controllWordList: Array<ControllWord>;
  public controllWordSearch = new ControllWordSearch();
  public currentControlledId: string;
  public dialogOnOff = false;
  public language: string;
  public pagingBoxObj = new PagingBoxObj(1, 0, 10, 0);
  public title = 'service.controlledWordManagement.config.form.addControlled';
  public validFunc: () => boolean | Promise<boolean>;

  constructor(
    private controllWorldServ: ControllWorldService,
    private messageServ: MessageService,
    private router: Router,
    private stateServ: AppState,
    private translateServ: TranslateService
  ) {
    this.language = this.stateServ.get('language');

    this.validFunc = () => {
      return new Promise<boolean>((resolve, reject) => {
        this.controllWorldServ
          .deleteControllWord(this.currentControlledId)
          .success((res) => {
            this.dialogOnOff = false;
            this.getControllWordList();
            resolve(true);
          })
          .error((res) => {
            resolve(false);
          });
      });
    };
  }

  ngOnInit() {
    this.getControllWordList();
  }

  // 获取受控词管理列表
  getControllWordList() {
    const pageSearch = new PageParams(this.pagingBoxObj.page, this.pagingBoxObj.rows);
    return this.controllWorldServ
      .getControllWordList(this.controllWordSearch, pageSearch)
      .translate(CommonFuncService.formatObjForLangCode(this.stateServ.get('language')))
      .success((success) => {
        const data = success && success.data;
        this.controllWordList = data && data.pageDataList;
        this.pagingBoxObj.totalRecords = data && data.pageDataSize;
        // console.log(data);
      })
      .error((error) => {
        this.controllWordList = [];
        this.pagingBoxObj.totalRecords = 0;
        // console.log(error);
      });
  }

  // 新增受控词管理
  @clickOnce()
  handleAddClick() {
    this.addOnOff = true;
  }

  // 关闭新增弹框
  @clickOnce()
  handleCancelClick() {
    this.addOnOff = false;
  }

  // 关闭删除对话框
  @clickOnce()
  handleCancelDialogClick() {
    this.dialogOnOff = false;
  }

  // 配置
  @clickOnce()
  handleConfigClick(rowData) {
    this.currentControlledId = rowData.controlledId;
    const controlledName = rowData.controlledName;
    this.router.navigate([ `/content/service/controlled-word-manager/list/config` ], {
      queryParams: { controlledId: this.currentControlledId, controlledName }
    });
    console.log(rowData);
  }

  // 删除
  @clickOnce()
  handleDeleteClick(rowData) {
    this.currentControlledId = rowData.controlledId;
    console.log(rowData);
    this.dialogOnOff = true;
  }

  // 搜索
  @clickWaitHttp('handleSearchClick')
  handleSearchClick() {
    return this.getControllWordList();
  }

  // 切换分页
  handlePageChange(pageInfo: PagingBoxObj) {
    this.pagingBoxObj.page = pageInfo.page;
    this.pagingBoxObj.rows = pageInfo.rows;
    this.getControllWordList();
  }

  // 保存
  @clickWaitHttp('handleSaveClick')
  handleSaveClick(controllWord: ControllWord) {
    return this.controllWorldServ
      .addControllWord(controllWord)
      .success((success) => {
        // console.log(success);
        this.addOnOff = false;
        this.messageServ.add({
          severity: 'success',
          summary: this.translateServ.instant('service.controlledWordManagement.controlled'),
          detail: this.translateServ.instant('service.common.operaSuccess')
        });
        this.getControllWordList();
      })
      .error((error) => {
        this.messageServ.add({
          severity: 'error',
          summary: this.translateServ.instant('service.controlledWordManagement.controlled'),
          detail: this.translateServ.instant('service.common.operaFailed')
        });
      });
  }
}
