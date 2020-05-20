import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Question, QuestionService, DropDownOption, formatDateTime } from 'src/app/service';
import { GlobalValidService } from 'mpr-form-valid';
import { clickWaitHttp, clickOnce, AppState } from '../../../../core';

const ERROR_MSG = {
  language: {
    required: 'siteManager.question.valid.language'
  },
  title: {
    required: 'siteManager.question.valid.title'
  },
  sort: {
    required: 'siteManager.question.valid.sort'
  },
  replyContent: {
    required: 'siteManager.question.valid.replyContent'
  }
};

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: [ './question-detail.component.scss' ]
})
export class QuestionDetailComponent implements OnInit {
  public config = {
    initialFrameWidth: 570,
    initialFrameHeight: 320,
    wordCount: true,
    maximumWords: 10000
  };
  public errorMsg = ERROR_MSG;
  public filePaths = [];
  public info = new Question();
  public langList: Array<DropDownOption>;
  public modify: boolean;

  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;

  constructor(
    private activeRoute: ActivatedRoute,
    private appState: AppState,
    private globalValidService: GlobalValidService,
    private questionService: QuestionService,
    private router: Router
  ) {
    this.info.sort = 9;
    this.activeRoute.queryParams.subscribe((params) => {
      if (params.id) {
        this.getQuestionDetails(params.id);
      }
      this.modify = !!params.modify;
    });
  }

  ngOnInit() {
    this.info.questionStatus = 0;
    this.getAllLanguages();
  }

  // 取消
  @clickOnce()
  handleCancle() {
    this.router.navigate([ '/content/site/content/questions' ]);
  }

  // 提交
  @clickWaitHttp('handleCommit')
  handleCommit() {
    if (this.globalValidService.validAll()) {
      if (this.modify) {
        return this.questionService.updateQuestion(this.info).success((res) => {
          this.router.navigate([ '/content/site/content/questions' ], {
            relativeTo: this.activeRoute.parent,
            queryParams: { reload: true }
          });
        });
      } else {
        return this.questionService
          .addQuestion(this.info)
          .success((res) => {
            this.router.navigate([ '/content/site/content/questions' ], {
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

  private getAllLanguages() {
    const languages =
      typeof this.appState.get('languageType') === 'string'
        ? JSON.parse(this.appState.get('languageType'))
        : this.appState.get('languageType');
    this.langList = languages.map((elem) => {
      return { label: elem.langName, value: elem.langCode };
    });
  }

  private getQuestionDetails(id: number) {
    this.questionService.getQuestionDetail(id).success((res) => {
      this.info = res.data;
      this.info.createTime = formatDateTime(this.info.createTime);
    });
  }
}
