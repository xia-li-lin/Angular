import { blockStatus } from './../../../../service/model/area-manager.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AreaManagerService } from 'src/app/service';
import { BlockServiceSearch, BlockService } from 'src/app/service/model/area-manager.model';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { clickOnce, clickWaitHttp, CommonFuncService } from 'src/app/core';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: [ './service-list.component.scss' ]
})
export class ServiceListComponent implements OnInit {
  public blockStatus = blockStatus;
  public blockServiceList: any;
  public oldSearch: BlockServiceSearch;
  public pageInfo = new PagingBoxObj(1, 0, 10, 0);
  public search = new BlockServiceSearch();

  constructor(
    private areaServ: AreaManagerService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private messageServ: MessageService,
    private translateServ: TranslateService
  ) {}

  ngOnInit() {
    this.activeRouter.queryParams.subscribe((params) => {
      if (params.blockId) {
        this.search.blockId = params.blockId;
        this.loadData();
      }
    });
  }

  @clickOnce()
  handleConfigClick() {
    this.router.navigate([ '/content/area/list/service-add' ], { queryParams: { blockId: this.search.blockId } });
  }

  @clickWaitHttp('handleDisableClick')
  handleDisableClick(blockService: BlockService, rowIndex: number) {
    return this.areaServ
      .disableBlockService(blockService.blockId)
      .success(() => {
        this.blockServiceList[rowIndex] = Object.assign({}, this.blockServiceList[rowIndex], { status: 2 });
        this.messageServ.add({
          severity: 'success',
          summary: this.translateServ.instant('content.nav.areaManager'),
          detail: this.translateServ.instant('areaManager.dialog.freezeSuccess')
        });
      })
      .failed(() => {
        this.messageServ.add({
          severity: 'error',
          summary: this.translateServ.instant('content.nav.areaManager'),
          detail: this.translateServ.instant('areaManager.dialog.freezeFailed')
        });
      });
  }

  @clickWaitHttp('handleEnableClick')
  handleEnableClick(blockService: BlockService, rowIndex: number) {
    return this.areaServ
      .enableBlockService(blockService.blockId)
      .success(() => {
        this.blockServiceList[rowIndex] = Object.assign({}, this.blockServiceList[rowIndex], { status: 1 });
        this.messageServ.add({
          severity: 'success',
          summary: this.translateServ.instant('content.nav.areaManager'),
          detail: this.translateServ.instant('areaManager.dialog.enableSuccess')
        });
      })
      .failed(() => {
        this.messageServ.add({
          severity: 'error',
          summary: this.translateServ.instant('content.nav.areaManager'),
          detail: this.translateServ.instant('areaManager.dialog.enableFailed')
        });
      });
  }

  @clickWaitHttp('handlePageChange')
  handlePageChange(pageInfo: PagingBoxObj) {
    this.pageInfo.page = pageInfo.page;
    return this.loadData();
  }

  @clickWaitHttp('handleSearchClick')
  handleSearchClick() {
    if (this.oldSearch && CommonFuncService.objectEq(this.oldSearch, this.search)) {
      return;
    }
    return this.loadData();
  }

  private loadData() {
    return this.areaServ
      .getBlockServiceList(this.search, { pageNo: this.pageInfo.page, pageSize: this.pageInfo.rows })
      .success((res) => {
        this.blockServiceList = res.data.list;
        this.pageInfo.totalRecords = res.data.totalCount;
      });
  }
}
