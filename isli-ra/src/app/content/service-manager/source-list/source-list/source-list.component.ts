import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState, clickOnce, clickWaitHttp, CommonFuncService } from 'src/app/core';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { PageParams, SourceList, SourceListSearch } from 'src/app/service/model';
import { SourceListService } from 'src/app/service';

@Component({
  selector: 'app-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: [ './source-list.component.scss' ]
})
export class SourceListComponent implements OnInit {
  public currentId: string;
  public dialogOnOff = false;
  public language: string;
  public oldSearch: SourceListSearch;
  public pagingBoxObj = new PagingBoxObj(1, 0, 10, 0);
  public sourceList: Array<SourceList>;
  public sourceListSearch = new SourceListSearch();
  public validFunc: () => boolean | Promise<boolean>;

  constructor(private router: Router, private stateServ: AppState, private sourceListServ: SourceListService) {
    this.language = this.stateServ.get('language');
    this.getSourceList();

    this.validFunc = () => {
      return new Promise<boolean>((resolve, reject) => {
        this.sourceListServ
          .deleteSourceEntity(this.currentId)
          .success(() => {
            this.getSourceList();
            this.dialogOnOff = false;
            resolve(true);
          })
          .error(() => {
            resolve(false);
          });
      });
    };
  }

  ngOnInit() {}

  // 获取源列表
  getSourceList() {
    const pageSearch = new PageParams(this.pagingBoxObj.page, this.pagingBoxObj.rows);
    return this.sourceListServ
      .getSourceList(this.sourceListSearch, pageSearch)
      .translate(CommonFuncService.formatObjForLangCode(this.stateServ.get('language')))
      .success((success) => {
        const data = success && success.data;
        this.sourceList = data && data.pageDataList;
        this.pagingBoxObj.totalRecords = data && data.pageDataSize;
      })
      .error((error) => {
        this.sourceList = [];
        this.pagingBoxObj.totalRecords = 0;
        console.error(error);
      });
  }

  // 新增源
  @clickOnce()
  handleAddSourceClick() {
    this.router.navigate([ '/content/service/source-list/list/add' ]);
  }

  // 配置
  @clickOnce()
  handleConfigClick(sourceList: SourceList) {
    this.currentId = sourceList.entityId;
    this.router.navigate([ '/content/service/source-list/list/config' ], {
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
    if (this.oldSearch && CommonFuncService.objectEq(this.oldSearch, this.sourceListSearch)) {
      return;
    }
    this.pagingBoxObj.page = 1;
    return this.getSourceList();
  }
}
