import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ContentDetail, ContentService, Content, formatFilePaths, formatFilePathsReverse } from 'src/app/service';
import { clickOnce, clickWaitHttp } from 'src/app/core';
import { GlobalValidService } from 'mpr-form-valid';

const ERROR_MSG = {
  contentDetail: {
    required: 'siteManager.news.valid.newsDetail'
  }
};

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: [ './content-detail.component.scss' ]
})
export class ContentDetailComponent implements OnInit {
  public config = {
    initialFrameWidth: 570,
    initialFrameHeight: 320,
    wordCount: true,
    maximumWords: 10000
  };
  public contentDetail = new ContentDetail();
  public content = new Content();
  public errorMsg = ERROR_MSG;
  public filePaths = [];
  public contentId: string;
  public langCode: string;
  public navigationId: number;

  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;

  constructor(
    private contentService: ContentService,
    private activeRoute: ActivatedRoute,
    private globalValidService: GlobalValidService,
    private router: Router
  ) {
    this.content.contentDetail = new ContentDetail();
    this.activeRoute.queryParams.subscribe((params) => {
      this.contentId = params.contentId;
      this.langCode = params.langCode;
      this.navigationId = params.navigationId;
      if (params.contentId) {
        this.getContentDetail(params.contentId, params.navigationId, params.navigationName);
      }
    });
  }

  ngOnInit() {}

  // 取消
  @clickOnce()
  public handleCancle() {
    this.router.navigate([ '/content/site/content/content' ]);
  }

  // 提交
  @clickWaitHttp('handleCommit')
  public handleCommit() {
    this.content.filePaths = formatFilePaths(this.filePaths);
    if (this.contentId && this.globalValidService.validAll()) {
      return this.contentService
        .updateContent(this.content)
        .success(() => {
          this.router.navigate([ '/content/site/content/content' ]);
        })
        .error((res) => {
          console.log(res);
        });
    } else if (!this.contentId && this.globalValidService.validAll()) {
      this.content.langCode = this.langCode;
      this.content.navigationId = this.navigationId;
      return this.contentService
        .addContent(this.content)
        .success(() => {
          this.router.navigate([ '/content/site/content/content' ]);
        })
        .error((res) => {
          console.log(res);
        });
    }
  }

  private getContentDetail(contentId, navigationId, navigationName) {
    this.contentService
      .getContentDetail(contentId, navigationId, navigationName)
      .success((res) => {
        this.content = res.data.content;
        if (!this.content.filePaths) {
          this.filePaths = [];
        } else {
          this.filePaths = formatFilePathsReverse(this.content.filePaths);
        }
      })
      .error((res) => {
        console.log(res);
      });
  }
}
