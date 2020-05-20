import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ConfirmationService, MessageService } from 'primeng/api';

import { LanguageService, Language } from 'src/app/service';
import { clickOnce, AppState } from 'src/app/core';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: [ './language-list.component.scss' ],
  providers: [ ConfirmationService ]
})
export class LanguageListComponent implements OnInit {
  public languageListData: Array<Language>;

  constructor(
    private languageService: LanguageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private messageService: MessageService,
    private translateService: TranslateService,
    private stateServ: AppState
  ) {}

  ngOnInit() {
    this.getLanguageList();
  }

  getLanguageList() {
    this.languageService
      .getAllLanguages()
      .success((res) => {
        console.log('language list----', res);
        this.languageListData = res.data.list;
      })
      .error(() => {
        this.languageListData = [];
      });
  }

  @clickOnce()
  handleStopClick(item: Language) {
    this.confirmationService.confirm({
      message: this.translateService.instant('systemLanguage.list.stopMess', { langName: item.langName }),
      accept: () => {
        this.languageService
          .disableLanguage(item.langCode)
          .success((res) => {
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('common.operaSuccess')
            });
            this.getLanguageList();
            this.languageService.getLanguages().success((res2) => {
              this.stateServ.set('languageType', res2.data || []);
            });
          })
          .error(() => {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant('common.operaFailed')
            });
          });
      }
    });
  }

  @clickOnce()
  handleStartClick(item: Language) {
    this.confirmationService.confirm({
      message: this.translateService.instant('systemLanguage.list.startMess'),
      acceptLabel: this.translateService.instant('systemLanguage.list.config'),
      accept: () => {
        this.router.navigate([ '/content/system/language-list/language' ], {
          relativeTo: this.activateRoute,
          queryParams: { confLangCode: item.langCode }
        });
      }
    });
  }
}
