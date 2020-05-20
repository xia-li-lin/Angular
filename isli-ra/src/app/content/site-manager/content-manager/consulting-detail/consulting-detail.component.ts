import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Consulting,
  ConsultingService,
  DropDownOption,
  formatDateTime,
  formatFilePaths,
  formatFilePathsReverse
} from 'src/app/service';
import { GlobalValidService } from 'mpr-form-valid';
import { clickOnce, clickWaitHttp, AppState } from 'src/app/core';

const ERROR_MSG = {
  language: {
    required: 'siteManager.consulting.valid.language'
  },
  title: {
    required: 'siteManager.consulting.valid.title'
  },
  createTime: {
    required: 'siteManager.consulting.valid.createTime'
  },
  source: {
    required: 'siteManager.consulting.valid.source'
  },
  sort: {
    required: 'siteManager.consulting.valid.sort'
  },
  thumbnailUrl: {
    required: 'siteManager.common.valid.thumbnailUrl',
    imageContentError: 'siteManager.common.valid.imageContentError',
    imageFileTypeError: 'siteManager.common.valid.imageFileTypeError',
    imageFileSizeError: 'siteManager.common.valid.imageFileSizeError',
    imageWidthHeightError: 'siteManager.common.valid.imageWidthHeightError'
  },
  summary: {
    required: 'siteManager.consulting.valid.summary'
  },
  consultingContent: {
    required: 'siteManager.consulting.valid.consultingContent'
  }
};

@Component({
  selector: 'app-consulting-detail',
  templateUrl: './consulting-detail.component.html',
  styleUrls: [ './consulting-detail.component.scss' ]
})
export class ConsultingDetailComponent implements OnInit {
  public config = {
    initialFrameWidth: 570,
    initialFrameHeight: 320,
    wordCount: true,
    maximumWords: 10000
  };
  public errorMsg = ERROR_MSG;
  public filePaths = [];
  public info = new Consulting();
  public langList: Array<DropDownOption>;
  public modify: boolean;

  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;

  constructor(
    private activeRoute: ActivatedRoute,
    private appState: AppState,
    private consultingService: ConsultingService,
    private globalValidService: GlobalValidService,
    private router: Router
  ) {
    this.info.sort = 9;
    this.info.createTime = new Date().toString();
    this.activeRoute.queryParams.subscribe((params) => {
      if (params.id) {
        this.getConsultDetails(params.id);
      }
      this.modify = !!params.modify;
    });
  }

  ngOnInit() {
    this.info.consultingStatus = 0;
    this.getAllLanguages();
  }

  // 取消
  @clickOnce()
  public handleCancle() {
    this.router.navigate([ '/content/site/content/consulting' ]);
  }

  // 提交
  @clickWaitHttp('handleCommit')
  public handleCommit() {
    if (this.globalValidService.validAll(true)) {
      this.info.filePaths = formatFilePaths(this.filePaths);
      if (this.modify) {
        return this.consultingService.updateConsult(this.info).success((res) => {
          this.router.navigate([ '/content/site/content/consulting' ], {
            relativeTo: this.activeRoute.parent,
            queryParams: { reload: true }
          });
        });
      } else {
        this.info.createTime = formatDateTime(this.info.createTime);
        return this.consultingService
          .addConsult(this.info)
          .success((res) => {
            this.router.navigate([ '/content/site/content/consulting' ], {
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

  private getConsultDetails(id: number) {
    this.consultingService.getconsultDetail(id).success((res) => {
      this.info = res.data.consulting;
      this.info.createTime = formatDateTime(this.info.createTime);
      if (!this.info.filePaths) {
        this.filePaths = [];
      } else {
        this.filePaths = formatFilePathsReverse(this.info.filePaths);
      }
    });
  }
}
