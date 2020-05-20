import { SessionInvalid } from './core/session_invalid.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
// import { UeditorUploadService } from './service';
import { MessageService } from 'primeng/api';
import { SubjectService, SUBJECT, AppState } from './core';
import { UserService, LoginService } from './service';
import { TranslateService } from '@ngx-translate/core';
import { UeditorUploadService } from './service/ueditor-upload.service';
import { PageFlagAppendService } from './core/page-flag-append.service';
import { LanguageAppendService } from './core/language-append.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  providers: [ SessionInvalid ]
})
export class AppComponent implements OnInit {
  showLoading = false;
  constructor(
    // private editorUploadServ: UeditorUploadService,
    private loginServ: LoginService,
    private sessionInvaildServ: SessionInvalid,
    private subServ: SubjectService,
    private userServ: UserService,
    private appState: AppState,
    private titleServ: Title,
    private translateServ: TranslateService,
    // tslint:disable-next-line:variable-name
    private _ueditorServ: UeditorUploadService,
    // tslint:disable-next-line:variable-name
    private _pageFlagAppendServ: PageFlagAppendService,
    // tslint:disable-next-line:variable-name
    private _languageAppendServ: LanguageAppendService
  ) {
    const href = location.href;
    const langCodeParams = (href.split('?')[1] || '').split('&').filter((elem) => elem.startsWith('langCode'));
    let langCode = 'ZH_TW';
    if (langCodeParams.length) {
      langCode = langCodeParams[0].split('=').pop();
    }
    appState.set('language', langCode);
    translateServ.addLangs([ 'en', 'zh-cn' ]);
    translateServ.setDefaultLang('zh-cn');
    if (langCode.toLowerCase().indexOf('zh') !== -1) {
      translateServ.use('zh-cn');
      this.titleServ.setTitle('ISLI後臺管理系統');
    } else {
      translateServ.use('en');
      this.titleServ.setTitle('ISLI RA Management System');
    }
  }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.subServ.subscript(SUBJECT.GLOBAL_LOADING).subscribe((show: boolean) => {
      this.showLoading = show;
    });
    if (this.loginServ.checkLogin()) {
      this.appState.setPromise(
        'permission',
        new Promise((resolve) => {
          this.userServ.getPermission().success((res) => {
            resolve(res.data);
          });
        })
      );
    }
  }

  get language() {
    return this.appState.get('language') || 'ZH_TW';
  }
}
