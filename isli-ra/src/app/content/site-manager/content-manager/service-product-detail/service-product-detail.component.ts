import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  ServiceProductService,
  ServiceProduct,
  DropDownOption,
  LanguageService,
  formatFilePaths,
  formatFilePathsReverse
} from 'src/app/service';
import { GlobalValidService } from 'mpr-form-valid';
import { clickWaitHttp, clickOnce, AppState } from '../../../../core';

const ERROR_MSG = {
  language: {
    required: 'siteManager.products.valid.language'
  },
  title: {
    required: 'siteManager.products.valid.title'
  },
  applicationServicePlan: {
    required: 'siteManager.products.valid.applicationServicePlan'
  },
  applicationField: {
    required: 'siteManager.products.valid.applicationField'
  },
  applicationServiceDescription: {
    required: 'siteManager.products.valid.applicationServiceDescription'
  },
  // createTime: {
  //   required: 'siteManager.products.valid.createTime'
  // },
  sort: {
    required: 'siteManager.products.valid.sort'
  },
  thumbnailUrl: {
    required: 'siteManager.common.valid.thumbnailUrl',
    imageContentError: 'siteManager.common.valid.imageContentError',
    imageFileTypeError: 'siteManager.common.valid.imageFileTypeError',
    imageFileSizeError: 'siteManager.common.valid.imageFileSizeError',
    imageWidthHeightError: 'siteManager.common.valid.imageWidthHeightError'
  },
  ueditor: {
    companyContent: {
      required: 'siteManager.products.valid.companyContent'
    },
    content: {
      required: 'siteManager.products.valid.content'
    },
    spplicationExampleContent: {
      required: 'siteManager.products.valid.spplicationExampleContent'
    }
  }
};

@Component({
  selector: 'app-service-product-detail',
  templateUrl: './service-product-detail.component.html',
  styleUrls: [ './service-product-detail.component.scss' ]
})
export class ServiceProductDetailComponent implements OnInit {
  public config = {
    initialFrameWidth: 570,
    initialFrameHeight: 320,
    wordCount: true,
    maximumWords: 10000
  };
  public errorMsg = ERROR_MSG;
  public filePaths = [];
  public info = new ServiceProduct();
  public langList: Array<DropDownOption>;
  public lang = this.appState.get('language') === 'EN_US' ? '-en' : '-zh';
  public modify: boolean;

  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;

  constructor(
    private activeRoute: ActivatedRoute,
    private appState: AppState,
    private globalValidService: GlobalValidService,
    private router: Router,
    private serviceProductService: ServiceProductService
  ) {
    this.info.sort = 9;
    this.activeRoute.queryParams.subscribe((params) => {
      if (params.id) {
        this.getServiceProductDetail(params.id);
      }
      this.modify = !!params.modify;
    });
  }

  ngOnInit() {
    this.info.sppStatus = 0;
    this.getAllLanguages();
  }

  // 取消
  @clickOnce()
  public handleCancle() {
    this.router.navigate([ '/content/site/content/products' ]);
  }

  // 提交
  @clickWaitHttp('handleCommit')
  public handleCommit() {
    if (this.globalValidService.validAll(true)) {
      this.info.filePaths = formatFilePaths(this.filePaths);
      if (this.modify) {
        return this.serviceProductService.updateServiceProduct(this.info).success((res) => {
          this.router.navigate([ '/content/site/content/products' ], {
            relativeTo: this.activeRoute.parent,
            queryParams: { reload: true }
          });
        });
      } else {
        return this.serviceProductService
          .addServiceProduct(this.info)
          .success((res) => {
            this.router.navigate([ '/content/site/content/products' ], {
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

  handleThumbnailChange(imageFile: any) {
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

  private getServiceProductDetail(id: number) {
    this.serviceProductService.getServiceProductDetail(id).success((res) => {
      this.info = res.data.serviceProduct;
      // this.info.createTime = formatDateTime(this.info.createTime);
      if (!this.info.filePaths) {
        this.filePaths = [];
      } else {
        this.filePaths = formatFilePathsReverse(this.info.filePaths);
      }
    });
  }
}
