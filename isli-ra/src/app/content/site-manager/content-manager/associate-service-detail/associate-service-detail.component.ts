import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Associate, AssociateService, DropDownOption, LanguageService, formatDateTime } from 'src/app/service';
import { GlobalValidService } from 'mpr-form-valid';
import { clickWaitHttp, clickOnce, AppState } from 'src/app/core';

const ERROR_MSG = {
  language: {
    required: 'siteManager.associates.valid.language'
  },
  title: {
    required: 'siteManager.associates.valid.title'
  },
  correlationCodingStructure: {
    required: 'siteManager.associates.valid.correlationCodingStructure'
  },
  serviceCode: {
    required: 'siteManager.associates.valid.serviceCode',
    pattern: 'siteManager.associates.valid.serviceCodePattern'
  },
  createTime: {
    required: 'siteManager.associates.valid.createTime'
  },
  sort: {
    required: 'siteManager.associates.valid.sort'
  },
  thumbnailUrl: {
    required: 'siteManager.common.vaild.thumbnailUrl',
    imageContentError: 'siteManager.common.vaild.imageContentError',
    imageFileTypeError: 'siteManager.common.vaild.imageFileTypeError',
    imageFileSizeError: 'siteManager.common.vaild.imageFileSizeError',
    imageWidthHeightError: 'siteManager.common.vaild.imageWidthHeightError'
  },
  content: {
    required: 'siteManager.associates.valid.content'
  }
};

@Component({
  selector: 'app-associate-service-detail',
  templateUrl: './associate-service-detail.component.html',
  styleUrls: [ './associate-service-detail.component.scss' ]
})
export class AssociateServiceDetailComponent implements OnInit {
  public config = {
    initialFrameWidth: 570,
    initialFrameHeight: 320,
    wordCount: true,
    maximumWords: 10000
  };
  public errorMsg = ERROR_MSG;
  public info = new Associate();
  public langList: Array<DropDownOption>;
  public modify: boolean;

  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;

  constructor(
    private activeRoute: ActivatedRoute,
    private appState: AppState,
    private associateService: AssociateService,
    private globalValidService: GlobalValidService,
    private router: Router
  ) {
    this.info.createTime = new Date().toString();
    this.info.sort = 9;
    this.activeRoute.queryParams.subscribe((params) => {
      if (params.id) {
        this.getAssociateDetails(params.id);
      }
      this.modify = !!params.modify;
    });
  }

  ngOnInit() {
    this.info.asStatus = 0;
    this.getAllLanguages();
  }

  // 取消
  @clickOnce()
  public handleCancle() {
    this.router.navigate([ '/content/site/content/associates' ]);
  }

  // 提交
  @clickWaitHttp('handleCommit')
  handleCommit() {
    if (this.globalValidService.validAll()) {
      if (this.modify) {
        return this.associateService.updateAssociate(this.info).success((res) => {
          this.router.navigate([ '/content/site/content/associates' ], {
            relativeTo: this.activeRoute.parent,
            queryParams: { reload: true }
          });
        });
      } else {
        this.info.createTime = formatDateTime(this.info.createTime);
        return this.associateService
          .addAssociate(this.info)
          .success((res) => {
            this.router.navigate([ '/content/site/content/associates' ], {
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

  private getAssociateDetails(id: number) {
    this.associateService.getAssociateDetail(id).success((res) => {
      this.info = res.data;
      this.info.createTime = formatDateTime(this.info.createTime);
    });
  }
}
