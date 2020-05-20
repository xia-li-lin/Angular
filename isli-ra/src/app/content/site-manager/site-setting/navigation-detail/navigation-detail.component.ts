import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
  NavigationService,
  NavigationNode,
  DropDownOption,
  NodeI18n,
  LanguageService,
  Language,
  languageEnable
} from 'src/app/service';
import { GlobalValidService } from 'mpr-form-valid';
import { clickOnce, clickWaitHttp, HttpResponse, AppState } from 'src/app/core';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

const ERROR_MSG = {
  menuType: {
    required: '请选择导航类型'
  },
  nameZH: {
    required: '请输入导航名称',
    existError: '导航名称重复'
  },
  nameEN: {
    required: '请输入导航名称',
    existError: '导航名称重复'
  }
};

@Component({
  selector: 'app-navigation-detail',
  templateUrl: './navigation-detail.component.html',
  styleUrls: [ './navigation-detail.component.scss' ],
  providers: [ GlobalValidService ]
})
export class NavigationDetailComponent implements OnInit {
  public errorMsg = ERROR_MSG;
  public languages: Array<Language> = [];
  public modify = false;
  public navigationNode = new NavigationNode();
  public navTypes: Array<DropDownOption>;
  public nodeI18nZh = new NodeI18n();
  public nodeI18nEn = new NodeI18n();

  constructor(
    private activeRoute: ActivatedRoute,
    private appState: AppState,
    private globalValidServ: GlobalValidService,
    private languageServ: LanguageService,
    private messageServ: MessageService,
    private navigationServ: NavigationService,
    private router: Router,
    private translateServ: TranslateService
  ) {
    this.nodeI18nEn.langCode = 'EN_US';
    this.nodeI18nZh.langCode = 'ZH_TW';
    this.activeRoute.queryParams.subscribe((params) => {
      if (params.id) {
        this.getNodeDetail(params.id);
      } else if (params.pid) {
        this.navigationNode.parentId = params.pid;
      }
      this.modify = !!params.modify;
    });
  }

  ngOnInit() {
    if (this.appState.get('language') === 'ZH_TW') {
      this.navTypes = this.navigationServ.getNavTypesZH();
    } else {
      this.navTypes = this.navigationServ.getNavTypes();
    }
    if (!this.modify) {
      this.navTypes = this.navTypes.filter((val) => {
        return [ 'L', 'C' ].indexOf(val.value) !== -1;
      });
      this.getNodeDetail('' + this.navigationNode.parentId);
    }
    this.languageServ.getLanguages().success((res) => {
      this.languages = res.data || [];
    });
  }

  // 取消
  @clickOnce()
  public handleCancleClick() {
    this.router.navigate([ '/content/site/setting/navs' ]);
  }

  // 提交
  @clickWaitHttp('handleCommitClick')
  public handleCommitClick() {
    if (!this.globalValidServ.validAll()) {
      return;
    }
    let req: HttpResponse<any>;
    if (this.modify) {
      req = this.navigationServ.updateTreeNode(this.navigationNode).success((res) => {
        this.router.navigate([ '/content/site/setting/navs' ], {
          relativeTo: this.activeRoute.parent,
          queryParams: { reload: true }
        });
      });
    } else {
      this.navigationNode.navigationI18ns = [];
      if (this.languageEnable('ZH_TW')) {
        this.navigationNode.navigationI18ns.push(this.nodeI18nZh);
      }
      if (this.languageEnable('EN_US')) {
        this.navigationNode.navigationI18ns.push(this.nodeI18nEn);
      }
      req = this.navigationServ.addTreeNode(this.navigationNode).success(() => {
        this.router.navigate([ '/content/site/setting/navs' ], {
          relativeTo: this.activeRoute.parent,
          queryParams: { reload: true }
        });
      });
    }
    req.failed(() => {
      this.messageServ.clear();
      this.messageServ.add({
        severity: 'error',
        summary: this.translateServ.instant('common.tips'),
        detail: this.translateServ.instant('common.operaFailed')
      });
    });
    return req;
  }

  public languageEnable(langCode: string) {
    return languageEnable(langCode);
  }

  private getNodeDetail(id: string) {
    this.navigationServ.getNodeDetail(id).success((res) => {
      if (this.modify) {
        this.navigationNode = res.data;
        res.data.navigationI18ns.forEach((elem) => {
          if (elem.langCode === 'ZH_TW') {
            this.nodeI18nZh = elem;
          } else if (elem.langCode === 'EN_US') {
            this.nodeI18nEn = elem;
          }
        });
      } else {
        this.navigationNode.menuType = res.data.menuType;
      }
    });
  }
}
