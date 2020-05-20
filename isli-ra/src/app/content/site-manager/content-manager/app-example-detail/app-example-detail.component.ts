import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  AppExample,
  AppExampleService,
  DropDownOption,
  formatDateTime,
  formatFilePaths,
  formatFilePathsReverse
} from 'src/app/service';
import { GlobalValidService } from 'mpr-form-valid';
import { clickWaitHttp, clickOnce, AppState } from 'src/app/core';

const ERROR_MSG = {
  language: {
    required: 'siteManager.examples.valid.language'
  },
  title: {
    required: 'siteManager.examples.valid.title'
  },
  sort: {
    required: 'siteManager.examples.valid.sort'
  },
  thumbnailUrl: {
    required: 'siteManager.common.valid.thumbnailUrl',
    imageContentError: 'siteManager.common.valid.imageContentError',
    imageFileTypeError: 'siteManager.common.valid.imageFileTypeError',
    imageFileSizeError: 'siteManager.common.valid.imageFileSizeError',
    imageWidthHeightError: 'siteManager.common.valid.imageWidthHeightError'
  },
  summary: {
    required: 'siteManager.examples.valid.summary'
  },
  exampleContent: {
    required: 'siteManager.examples.valid.exampleContent'
  }
};

@Component({
  selector: 'app-app-example-detail',
  templateUrl: './app-example-detail.component.html',
  styleUrls: [ './app-example-detail.component.scss' ]
})
export class AppExampleDetailComponent implements OnInit {
  public config = {
    initialFrameWidth: 570,
    initialFrameHeight: 320,
    wordCount: true,
    maximumWords: 10000
  };
  public errorMsg = ERROR_MSG;
  public filePaths = [];
  public info = new AppExample();
  public langList: Array<DropDownOption>;
  public modify: boolean;

  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;

  constructor(
    private activeRoute: ActivatedRoute,
    private appState: AppState,
    private appExampleService: AppExampleService,
    private globalValidService: GlobalValidService,
    private router: Router
  ) {
    this.info.sort = 9;
    this.activeRoute.queryParams.subscribe((params) => {
      if (params.id) {
        this.getAppExampleDetails(params.id);
      }
      this.modify = !!params.modify;
    });
  }

  ngOnInit() {
    this.info.applicationExampleStatus = 0;
    this.getAllLanguages();
  }

  // 取消
  @clickOnce()
  public handleCancle() {
    this.router.navigate([ '/content/site/content/app-examples' ]);
  }

  // 提交
  @clickWaitHttp('handleCommit')
  public handleCommit() {
    if (this.globalValidService.validAll()) {
      this.info.filePaths = formatFilePaths(this.filePaths);
      if (this.modify) {
        delete this.info.updateTime;
        return this.appExampleService.updateAppExample(this.info).success((res) => {
          this.router.navigate([ '/content/site/content/app-examples' ], {
            relativeTo: this.activeRoute.parent,
            queryParams: { reload: true }
          });
        });
      } else {
        return this.appExampleService
          .addAppExample(this.info)
          .success((res) => {
            this.router.navigate([ '/content/site/content/app-examples' ], {
              relativeTo: this.activeRoute.parent,
              queryParams: { reload: true }
            });
          })
          .error((res) => {
            console.error(res);
          });
      }
    }
  }

  public handleThumbnailChange(imageFile: any) {
    this.info.thumbnailUrl = imageFile.filePath;
    this.info.imgUuid = imageFile.fileUuid;
  }

  private getAllLanguages() {
    const languages =
      typeof this.appState.get('languageType') === 'string'
        ? JSON.parse(this.appState.get('languageType'))
        : this.appState.get('languageType');
    this.langList = languages.map((elem) => {
      return { label: elem.langName, value: elem.langCode };
    });
  }

  private getAppExampleDetails(id: number) {
    this.appExampleService.getAppExampleDetail(id).success((res) => {
      this.info = res.data.appExample;
      this.info.createTime = formatDateTime(this.info.createTime);
      if (!this.info.filePaths) {
        this.filePaths = [];
      } else {
        this.filePaths = formatFilePathsReverse(this.info.filePaths);
      }
    });
  }
}
