import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { FqManagerService, PageSearch, FqManagerReplay, FqManager } from 'src/app/service';
import { clickOnce, clickWaitHttp, HttpResponse } from 'src/app/core';

@Component({
  selector: 'app-fq-manager-detail',
  templateUrl: './fq-manager-detail.component.html',
  styleUrls: [ './fq-manager-detail.component.scss' ]
})
export class FqManagerDetailComponent implements OnInit {
  public id: number;
  public fqManager = new FqManager();
  public fqManagerReplayList: Array<FqManagerReplay>;
  public pageInfo = new PagingBoxObj();
  public questionReplay = false;
  public questionEdit = false;

  public get editContent() {
    if (this.questionEdit) {
      return this.fqManager.questionDesc;
    }
    return '';
  }

  constructor(private activeRoute: ActivatedRoute, private router: Router, private fqManagerService: FqManagerService) {
    this.activeRoute.queryParams.subscribe((params) => {
      if (params.id) {
        this.id = params.id;
        this.getFqManagerDetail();
      }
    });
  }

  ngOnInit() {}

  // 回复
  @clickOnce()
  public handleAddReplay() {
    this.questionReplay = true;
  }

  // 取消修改
  @clickOnce()
  public handleCancel() {
    this.questionEdit = false;
    this.questionReplay = false;
  }

  // fqManager删除
  @clickWaitHttp('handleDelete')
  public handleDelete() {
    return this.fqManagerService
      .deleteFqManager(this.id)
      .success(() => {
        this.router.navigate([ '/content/site/interact/fqmanagers' ], {
          relativeTo: this.activeRoute.parent,
          queryParams: { reload: true }
        });
      })
      .error((res) => {
        console.log(res);
      });
  }

  @clickOnce()
  public handleEditClick() {
    this.questionEdit = true;
  }

  // fqManager 显示隐藏
  @clickWaitHttp('handleHideShow')
  public handleHideShow() {
    const hideOrShow = this.fqManager.isShow ? 0 : 1;
    return this.fqManagerService
      .hideShowFqManager(this.id, hideOrShow)
      .success((res) => {
        this.getFqManagerDetail();
      })
      .error((res) => {
        console.log(res);
      });
  }

  // 分页
  @clickWaitHttp('handlePageChange')
  public handlePageChange(event) {
    this.pageInfo.page = event.page;
    this.getFqManagerDetail();
  }

  // replay 删除
  @clickWaitHttp('handleDeleteClickReplay')
  public handleReplayDelete(replay: FqManagerReplay) {
    return this.fqManagerService
      .deleteFqManagerReplay(replay.id)
      .success((res) => {
        this.getFqManagerDetail();
      })
      .error((res) => {
        console.log(res);
      });
  }

  // replay  编辑
  @clickWaitHttp('handleEidtReply')
  public handleReplayEdit(replay: FqManagerReplay) {
    return this.fqManagerService
      .updateFqManagerReplay(replay)
      .success((res) => {
        this.getFqManagerDetail();
      })
      .error((res) => {
        console.log(res);
      });
  }

  // replay 显示隐藏
  @clickWaitHttp('handleReplayHideShow')
  public handleReplayHideShow(replay: FqManagerReplay) {
    const hideOrShow = replay.isShow ? 0 : 1;
    return this.fqManagerService
      .showHideFqManagerReplay(replay.id, hideOrShow)
      .success((res) => {
        this.getFqManagerDetail();
      })
      .error((res) => {
        console.log(res);
      });
  }

  // 编辑保存
  @clickWaitHttp('handleReplaySave')
  public handleSave(content: string) {
    let req: HttpResponse<any>;
    if (this.questionEdit) {
      req = this.fqManagerService.updateFqManagerTitle(this.id, content).success((res) => {
        this.getFqManagerDetail();
        this.questionEdit = false;
      });
    } else {
      req = this.fqManagerService
        .addFqManagerReplay({ questionId: this.fqManager.questionId, replayContent: content })
        .success(() => {
          this.getFqManagerDetail();
          this.questionReplay = false;
        });
    }
    return req;
  }

  // 详情
  private getFqManagerDetail() {
    this.fqManagerService
      .getFqManagerDetail(this.id, new PageSearch(this.pageInfo.page, this.pageInfo.rows))
      .success((res) => {
        this.fqManager = res.data.faManager;
        this.fqManagerReplayList = res.data.replay.list;
        this.pageInfo.totalRecords = res.data.replay.totalCount;
      })
      .error((res) => {
        console.log(res);
      });
  }
}
