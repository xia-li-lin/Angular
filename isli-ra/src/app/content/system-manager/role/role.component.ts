import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { GlobalValidService } from 'mpr-form-valid';
import { MessageService } from 'primeng/api';

import { AccountRoleService, DropDownOption, AccountRole, AccountRoleAdd } from 'src/app/service';
import { clickWaitHttp, HttpResponse } from 'src/app/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: [ './role.component.scss' ]
})
export class RoleComponent implements OnInit {
  public createPageFlag: boolean;
  public areaArrayZh = [];
  public areaArrayEn = [];
  public infoTw = new AccountRole();
  public infoEn = new AccountRole();
  public createTxt: string;

  constructor(
    private accountRoleService: AccountRoleService,
    private globalValidService: GlobalValidService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private translateService: TranslateService
  ) {
    activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      if (params.roleId) {
        this.createPageFlag = false;
        this.createTxt = this.translateService.instant('systemRole.create.edit');
        this.getRoleDetails(params.roleId);
      } else {
        this.createPageFlag = true;
        this.createTxt = this.translateService.instant('systemRole.create.create');
      }
    });
  }

  ngOnInit() {
    this.getAreaList();
  }

  getRoleDetails(roleId: number) {
    this.accountRoleService.getRoleDetail(roleId).success((res) => {
      console.log(res);
      this.infoTw = res.data[0];
      this.infoEn = res.data[1];
    });
  }

  getAreaList() {
    this.accountRoleService.getAreaList().success((res) => {
      console.log(res);
      this.areaArrayZh = res.data.map((ele) => {
        return new DropDownOption(ele.areaDescTw, ele.areaId);
      });
      this.areaArrayEn = res.data.map((ele) => {
        return new DropDownOption(ele.areaDescEn, ele.areaId);
      });
    });
    console.log(this.areaArrayZh);
  }

  handleAreaTwChange(areaId: any) {
    this.infoEn.areaId = areaId;
  }

  handleAreaEnChange(areaId) {
    this.infoTw.areaId = areaId;
  }

  @clickWaitHttp('handleSaveClick')
  handleSaveClick() {
    if (this.globalValidService.validAll()) {
      console.log('createPageFlag', this.createPageFlag);
      console.log('infoTw', this.infoTw);
      console.log('infoEn', this.infoEn);
      let req: HttpResponse<any>;
      if (this.createPageFlag) {
        const data = [
          Object.assign({}, this.infoTw, { langCode: 'ZH_CN' }),
          Object.assign({}, this.infoEn, { langCode: 'EN_US' })
        ];
        req = this.accountRoleService.addRole(data);
      } else {
        const data = [ this.infoTw, this.infoEn ];
        req = this.accountRoleService.updateRole(data);
      }
      return req
        .success((res) => {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('common.operaSuccess')
          });
          this.router.navigate([ '/content/system/role-list' ]);
        })
        .failed(() => {
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('common.operaFailed')
          });
        });
    }
  }
}
