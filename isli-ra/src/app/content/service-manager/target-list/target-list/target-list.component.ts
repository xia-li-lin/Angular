import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState, clickOnce, clickWaitHttp, CommonFuncService } from 'src/app/core';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { PageParams, TargetListSearch, SourceList } from 'src/app/service/model';
import { SourceListService } from 'src/app/service';

@Component({
  selector: 'app-target-list',
  templateUrl: './target-list.component.html',
  styleUrls: [ './target-list.component.scss' ]
})
export class TargetListComponent implements OnInit {
  public currentId: string;
  public dialogOnOff = false;
  public language: string;
  public oldSearch: TargetListSearch;
  public pagingBoxObj = new PagingBoxObj(1, 0, 10, 0);
  public sourceList: Array<SourceList>;
  public targetListSearch = new TargetListSearch();
  public validFunc: () => boolean | Promise<boolean>;

  constructor(private stateServ: AppState, private router: Router, private sourceListServ: SourceListService) {
    this.language = this.stateServ.get('language');

    this.validFunc = () => {
      return new Promise<boolean>((resolve, reject) => {
        this.sourceListServ
          .deleteSourceEntity(this.currentId)
          .success((success) => {
            this.getSourceList();
            this.dialogOnOff = false;
            resolve(true);
          })
          .error((error) => {
            resolve(false);
          });
      });
    };
  }

  ngOnInit() {
    this.getSourceList();
  }

  // 获取目标列表
  getSourceList() {
    const pageSearch = new PageParams(this.pagingBoxObj.page, this.pagingBoxObj.rows);
    this.sourceListServ
      .getSourceList(this.targetListSearch, pageSearch)
      .translate(CommonFuncService.formatObjForLangCode(this.stateServ.get('language')))
      .success((success) => {
        const data = success && success.data;
        this.sourceList = data && data.pageDataList;
        this.pagingBoxObj.totalRecords = data && data.pageDataSize;
      })
      .error((error) => {
        this.sourceList = [];
        this.pagingBoxObj.totalRecords = 0;
      });
  }

  // 新增目标
  @clickOnce()
  handleAddTargetClick() {
    this.router.navigate([ '/content/service/target-list/list/add' ]);
  }

  // 配置
  @clickOnce()
  handleConfigClick(sourceList: SourceList) {
    this.currentId = sourceList.entityId;
    this.router.navigate([ '/content/service/target-list/list/config' ], {
      queryParams: {
        entityId: this.currentId,
        entityName: sourceList.entityName
      }
    });
  }

  // 删除
  @clickOnce()
  handleDeleteClick(sourceList: SourceList) {
    this.currentId = sourceList.entityId;
    this.dialogOnOff = true;
  }

  // 分页切换
  handlePageChange(pageInfo: PagingBoxObj) {
    this.pagingBoxObj.page = pageInfo.page;
    this.getSourceList();
  }

  // 搜索
  @clickWaitHttp('handleSearchClick')
  handleSearchClick() {
    if (this.oldSearch && CommonFuncService.objectEq(this.oldSearch, this.targetListSearch)) {
      return;
    }
    this.pagingBoxObj.page = 1;
    return this.getSourceList();
  }
}
