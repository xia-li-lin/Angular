import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LoginService } from '../../service/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from '../../core';
import { DropDownOption, LanguageService } from 'src/app/service';
import { TranslateService } from '@ngx-translate/core';

const languages = [
  // new DropDownOption('content.language.zhCN', 'zh-cn'),
  new DropDownOption('content.language.zhTW', 'ZH_TW'),
  new DropDownOption('content.language.EN', 'EN_US')
];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {
  public languageOptions = languages;
  constructor(
    private router: Router,
    private appState: AppState,
    private loginService: LoginService,
    private translateServ: TranslateService,
    private langaugeServ: LanguageService,
    private activeRouter: ActivatedRoute,
    private titleServ: Title
  ) {}

  ngOnInit() {
    // this.langaugeServ.getLanguages().success((res) => {
    //   this.languageOptions = res.data.map((elem) => {
    //     return { label: elem.langName, value: elem.langCode };
    //   });
    // });
  }

  ativeLanguage(lang: string) {
    const currentLang = (this.appState.get('language') || 'ZH_TW').toUpperCase();
    return currentLang.startsWith(lang);
  }

  /**
   * 返回首页
   */
  handleHomeClick() {
    this.router.navigate([ '/content/index' ]);
  }

  /**
   * 退出
   */
  handleQuitClick() {
    this.router.navigate([ '/login' ]);
    this.loginService.clearLogin();
  }

  handleChangeLanguage(lanaguage: string) {
    // this.selectLanage = lanaguage;
    // this.translateServ.use(lanaguage);
    this.appState.set('language', lanaguage);
    // const href = location.href;
    // let hasLangCode = false;
    // const queryParams = (href.split('?')[1] || '').split('&').map((elem) => {
    //   if (elem && elem.startsWith('langCode')) {
    //     hasLangCode = true;
    //     return `langCode=${lanaguage}`;
    //   }
    //   return elem;
    // });
    // if (!hasLangCode) {
    //   queryParams.push(`langCode=${lanaguage}`);
    // }
    // location.href = href.split('?')[0] + '?' + queryParams.join('&');
    // location.reload();
    if (lanaguage.toLowerCase().indexOf('zh') !== -1) {
      this.translateServ.use('zh-cn');
      this.titleServ.setTitle('ISLI後臺管理系統');
    } else {
      this.translateServ.use('en');
      this.titleServ.setTitle('ISLI RA Management System');
    }
    this.router.navigate([], {
      relativeTo: this.activeRouter,
      queryParams: { langCode: lanaguage, forceReload: true },
      queryParamsHandling: 'merge'
    });
  }

  get hasLogin() {
    return this.loginService.checkLogin();
  }

  get publisherName() {
    return this.appState.get('nickname') || this.appState.get('username');
  }
}
