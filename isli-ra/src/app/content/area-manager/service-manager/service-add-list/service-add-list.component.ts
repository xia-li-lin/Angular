import { Component, OnInit } from '@angular/core';
import { clickWaitHttp, CommonFuncService, clickOnce, AppState } from 'src/app/core';
import { BlockService, BlockServiceSearch } from 'src/app/service/model/area-manager.model';
import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { AreaManagerService } from 'src/app/service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-service-add-list',
  templateUrl: './service-add-list.component.html',
  styleUrls: [ './service-add-list.component.scss' ]
})
export class ServiceAddListComponent implements OnInit {
  public blockServiceList: any;
  public oldSearch: BlockServiceSearch;
  public pageInfo = new PagingBoxObj(1, 0, 10, 0);
  public search = new BlockServiceSearch();

  private hasAddService = false;

  constructor(
    private areaServ: AreaManagerService,
    private activeRoute: ActivatedRoute,
    private messageServ: MessageService,
    private router: Router,
    private stateServ: AppState,
    private translateServ: TranslateService
  ) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      if (params.blockId) {
        this.search.blockId = params.blockId;
        this.loadData();
      }
    });
  }

  @clickWaitHttp('handleEnableClick')
  handleAddService(blockService: BlockService) {
    const addService = new BlockService();
    addService.blockId = this.search.blockId;
    addService.serviceCode = blockService.serviceCode;
    addService.serviceName = blockService.serviceName;
    addService.langCode = blockService.langCode || this.stateServ.get('language');
    return this.areaServ
      .addBlockService(addService)
      .success(() => {
        this.messageServ.clear();
        this.messageServ.add({
          severity: 'success',
          summary: this.translateServ.instant('content.nav.areaManager'),
          detail: this.translateServ.instant('common.operaSuccess')
        });
        if (this.blockServiceList.length <= 1 && this.pageInfo.page > 1) {
          this.pageInfo.page -= 1;
        } else if (this.blockServiceList.length <= 1) {
          this.blockServiceList = [];
          return;
        }
        this.loadData();
        this.hasAddService = true;
      })
      .failed(() => {
        this.messageServ.clear();
        this.messageServ.add({
          severity: 'error',
          summary: this.translateServ.instant('content.nav.areaManager'),
          detail: this.translateServ.instant('common.operaFailed')
        });
      });
  }

  @clickOnce()
  handleBackClick() {
    if (this.hasAddService) {
      this.router.navigate([ '/content/area/list/service' ], {
        queryParams: { blockId: this.search.blockId, reload: true }
      });
    } else {
      this.router.navigate([ '/content/area/list/service' ], {
        queryParams: { blockId: this.search.blockId }
      });
    }
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
      .getBlockServiceUnAddList(this.search, { pageNo: this.pageInfo.page, pageSize: this.pageInfo.rows })
      .success((res) => {
        this.blockServiceList = res.data.list;
        this.pageInfo.totalRecords = res.data.totalCount;
      });
  }
}
