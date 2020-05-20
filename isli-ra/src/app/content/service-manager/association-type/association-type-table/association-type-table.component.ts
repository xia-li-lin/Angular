import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AppState } from 'src/app/core';
import { RelevanceTypeInfo } from 'src/app/service/model';
import { ServiceAssociationService } from 'src/app/service/service.association.service';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';

@Component({
  selector: 'app-association-type-table',
  templateUrl: './association-type-table.component.html',
  styleUrls: [ './association-type-table.component.scss' ]
})
export class AssociationTypeTableComponent implements OnInit {
  @Output() OnPage: EventEmitter<any> = new EventEmitter();
  @Output() OnUpdateAssociationList: EventEmitter<any> = new EventEmitter();

  @Input() pagingBoxObj: PagingBoxObj;
  @Input() associationTypeList: Array<RelevanceTypeInfo>;

  public currentRelevanceTypeName: string;
  public dialogStopOnOff = false;
  public dialogEnableOnOff = false;
  public relevanceTypeId: string;
  public validFuncEnable: () => boolean | Promise<boolean>;
  public validFuncStop: () => boolean | Promise<boolean>;

  constructor(
    private router: Router,
    private serviceAssociationServ: ServiceAssociationService,
    private stateServ: AppState,
    private translateServ: TranslateService
  ) {
    this.validFuncStop = () => {
      return new Promise<boolean>((resolve, reject) => {
        this.serviceAssociationServ
          .disableAssocition(this.relevanceTypeId)
          .success((success) => {
            this.OnUpdateAssociationList.emit();
            this.dialogStopOnOff = false;
            resolve(true);
          })
          .error((error) => {
            resolve(false);
          });
      });
    };

    this.validFuncEnable = () => {
      return new Promise<boolean>((resolve, reject) => {
        this.serviceAssociationServ
          .enableAssocition(this.relevanceTypeId)
          .success((success) => {
            this.OnUpdateAssociationList.emit();
            this.dialogEnableOnOff = false;
            resolve(true);
          })
          .error((error) => {
            resolve(false);
          });
      });
    };
  }

  ngOnInit() {}

  // 查看
  handleCheckClick(rowData) {
    this.relevanceTypeId = rowData.relevanceTypeId;
    this.router.navigate([ `/content/service/association-type/list/detail` ], {
      queryParams: { sId: this.relevanceTypeId }
    });
  }

  // 关闭启用弹框
  handleEnableCancelDialogClick() {
    this.dialogEnableOnOff = false;
  }

  // 点击启用
  handleEnableClick(rowData) {
    this.relevanceTypeId = rowData.relevanceTypeId;
    this.currentRelevanceTypeName = rowData.relevanceTypeName;
    this.dialogEnableOnOff = true;
  }

  // 修改
  handleModifyClick(rowData) {
    this.relevanceTypeId = rowData.relevanceTypeId;
    this.router.navigate([ '/content/service/association-type/list/modify' ], {
      queryParams: { relevanceTypeId: this.relevanceTypeId }
    });
  }

  // 关闭停用弹框
  handleStopCancelDialogClick() {
    this.dialogStopOnOff = false;
  }

  // 点击停用
  handleStopClick(rowData) {
    this.relevanceTypeId = rowData.relevanceTypeId;
    this.currentRelevanceTypeName = rowData.relevanceTypeName;
    this.dialogStopOnOff = true;
  }
}
