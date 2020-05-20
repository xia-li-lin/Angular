import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import {
  QuestionSearch,
  PageSearch,
  Question,
  QuestionService,
  DropDownOption,
  LanguageService,
  SHOW_HIDE_STATUS_LIST
} from 'src/app/service';
import { clickOnce, clickWaitHttp, CommonFuncService, AppState } from 'src/app/core';

@Component({
  selector: 'app-qustion-list',
  templateUrl: './qustion-list.component.html',
  styleUrls: [ './qustion-list.component.scss' ]
})
export class QustionListComponent implements OnInit {
  public dialogOnOff = false;
  public id: number;
  public lang = this.appState.get('language') === 'EN_US' ? '-en' : '-zh';
  public langList: Array<DropDownOption>;
  public pageInfo = new PagingBoxObj(1, 0, 10, 0);
  public questionListData: Array<Question>;
  public questionSearch = new QuestionSearch();
  public questionStatusList = SHOW_HIDE_STATUS_LIST;
  public oldSearch = CommonFuncService.clone(this.questionSearch);
  public searchDate = null;
  public sortOnOff = false;
  public validFunc;

  constructor(
    private appState: AppState,
    private languageService: LanguageService,
    private questionService: QuestionService,
    private router: Router
  ) {
    this.validFunc = () => {
      return new Promise<boolean>((resolve, reject) => {
        this.questionService
          .deleteQuestion(this.id)
          .success((res) => {
            this.getQuestionList();
            this.dialogOnOff = false;
            resolve(true);
          })
          .error((res) => {
            console.log(res);
            resolve(false);
          });
      });
    };
  }

  ngOnInit() {
    this.getQuestionList();
    this.getAllLanguages();
  }

  //  增加
  @clickOnce()
  public handleAddClick() {
    this.router.navigate([ '/content/site/content/questions/add' ]);
  }

  // 关闭弹窗
  @clickOnce()
  public handleCancelDialogClick() {
    this.dialogOnOff = false;
    this.sortOnOff = false;
  }

  @clickOnce()
  public handleDateChange(date: { beginDate: string; endDate: string }) {
    this.questionSearch.startTime = date.beginDate;
    this.questionSearch.endTime = date.endDate;
  }

  // 删除
  @clickOnce()
  public handleDeleteClick(id) {
    this.dialogOnOff = true;
    this.id = id;
  }

  // 显示隐藏
  @clickWaitHttp((id) => 'handlehideOrShowId' + id)
  public handlehideOrShow(id, isShow) {
    const hideOrShow = isShow === 1 ? 0 : 1;
    return this.questionService
      .hideOrShowQuestion(id, hideOrShow)
      .success((res) => {
        this.getQuestionList();
      })
      .error((res) => {
        console.log('hide fail');
      });
  }

  @clickOnce()
  public handlePageChange(pageInfo: PagingBoxObj) {
    if (this.pageInfo.page === pageInfo.page) {
      return;
    }
    this.pageInfo.page = pageInfo.page;
    this.getQuestionList();
  }

  // 修改
  @clickOnce()
  public handleModifyClick(question: Question) {
    this.router.navigate([ '/content/site/content/questions/question-detail' ], {
      queryParams: { id: question.id, modify: true }
    });
  }

  // 搜索
  @clickWaitHttp('handleSearch')
  handleSearch() {
    if (CommonFuncService.objectEq(this.questionSearch, this.oldSearch)) {
      return;
    }
    this.pageInfo = new PagingBoxObj(1, 0, 10, 0);
    this.getQuestionList();
  }

  // 排序
  @clickWaitHttp((id) => 'handleSortId' + id)
  public handleSort(id, priorityLevel, oldValue) {
    if (priorityLevel === '') {
      this.sortOnOff = true;
      this.getQuestionList();
    } else {
      if (oldValue !== priorityLevel) {
        return this.questionService
          .updateQustionSort(id, priorityLevel)
          .success((res) => {
            this.getQuestionList();
          })
          .error((res) => {
            console.log(res);
          });
      }
    }
  }

  private getAllLanguages() {
    this.languageService
      .getAllLanguages()
      .success((res) => {
        this.langList = res.data.list.map((elem) => {
          return { label: elem.langName, value: elem.langCode };
        });
        this.langList.unshift({ label: '全部', value: '' });
      })
      .error((res) => {
        console.log(res);
      });
  }

  private getQuestionList() {
    return this.questionService
      .getQuestionList(this.questionSearch, new PageSearch(this.pageInfo.page, this.pageInfo.rows))
      .success((res) => {
        this.questionListData = res.data.list;
        this.pageInfo.totalRecords = res.data.totalCount;
      })
      .error(() => {
        this.questionListData = [];
        this.pageInfo.totalRecords = 0;
      });
  }
}
