import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { clickOnce, clickWaitHttp, CommonFuncService } from 'src/app/core';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import {
  FeedBackSearch,
  PageSearch,
  FeedBack,
  FeedBackService,
  DropDownOption,
  FEED_BACK_STATUS
} from 'src/app/service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: [ './feedback-list.component.scss' ]
})
export class FeedbackListComponent implements OnInit {
  public dialogOnOff = false;
  public feedBackListData: Array<FeedBack>;
  public feedBackSearch = new FeedBackSearch();
  public feedbackTypeist: Array<DropDownOption>;
  public feedbackStatusList = FEED_BACK_STATUS;
  public id: number;
  public oldSearch = CommonFuncService.clone(this.feedBackSearch);
  public pageInfo = new PagingBoxObj(1, 0, 10, 0);
  public searchDate = null;

  constructor(private feedBackService: FeedBackService, private router: Router) {}

  ngOnInit() {
    this.getFeedBackList();
    this.getFeedBackTypeList();
  }

  // 查看
  @clickOnce()
  public handleCheck(id) {
    this.router.navigate([ '/content/site/interact/feedbacks/feedback-detail' ], { queryParams: { id } });
  }

  @clickOnce()
  public handleDateChange(date: { beginDate: string; endDate: string }) {
    this.feedBackSearch.startTime = date.beginDate;
    this.feedBackSearch.endTime = date.endDate;
  }

  // 处理
  @clickOnce()
  public handleDealWith(id) {
    this.id = id;
    this.dialogOnOff = true;
  }

  // 导出excel
  @clickOnce()
  public handleExportExcel() {
    this.feedBackService.exportExcellForFeedBack();
  }

  // 关闭弹窗
  @clickOnce()
  public handleOnCloseEnable() {
    this.dialogOnOff = false;
  }

  // 提交处理结果
  @clickWaitHttp('handleOnEnableSure')
  public handleOnEnableSure(event) {
    return this.feedBackService
      .dealFeedBack(this.id, event.submitReason, event.emailCheck ? 'Y' : 'N')
      .success((res) => {
        console.log('deal with success');
        this.dialogOnOff = false;
        this.getFeedBackList();
      })
      .error((res) => {
        console.log('deal with fail');
        this.dialogOnOff = false;
      });
  }

  // 分页
  @clickWaitHttp('handlePageChange')
  handlePageChange(pageInfo: PagingBoxObj) {
    if (this.pageInfo.page === pageInfo.page) {
      return;
    }
    this.pageInfo.page = pageInfo.page;
    this.getFeedBackList();
  }

  // 搜索
  @clickWaitHttp('handleSearch')
  handleSearch() {
    if (CommonFuncService.objectEq(this.feedBackSearch, this.oldSearch)) {
      return;
    }
    this.pageInfo = new PagingBoxObj(1, 0, 10, 0);
    this.getFeedBackList();
  }

  // 列表
  private getFeedBackList() {
    return this.feedBackService
      .getFeedBackList(this.feedBackSearch, new PageSearch(this.pageInfo.page, this.pageInfo.rows))
      .success((res) => {
        this.feedBackListData = res.data.list;
        this.pageInfo.totalRecords = res.data.totalCount;
      })
      .error(() => {
        this.feedBackListData = [];
        this.pageInfo.totalRecords = 0;
      });
  }

  private getFeedBackTypeList() {
    this.feedBackService
      .getFeedBackTypeList()
      .success((res) => {
        this.feedbackTypeist = res.data.map((elem) => {
          return { label: elem.feedbackTypeName, value: elem.feedbackTypeId };
        });
        this.feedbackTypeist.unshift({ label: '全部', value: '' });
      })
      .error((res) => {
        console.log(res);
      });
  }
}
