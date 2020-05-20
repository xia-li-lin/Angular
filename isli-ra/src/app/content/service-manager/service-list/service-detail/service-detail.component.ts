import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { Subscription } from 'rxjs';
import { languageEnable, RelevanceTypeInfo, ServiceInfo } from 'src/app/service/model';
import { ServiceListService } from 'src/app/service/service-list.service';
import { clickOnce, clickWaitHttp } from 'src/app/core';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: [ './service-detail.component.scss' ]
})
export class ServiceDetailComponent implements OnInit, OnDestroy {
  public id: string;
  public relevanceList: Array<RelevanceTypeInfo>;
  public serviceDetail: ServiceInfo;

  private subscriptions: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private serviceListServ: ServiceListService
  ) {
    this.subscriptions = this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.id = queryParams && queryParams.id;
      if (this.id) {
        this.getServiceDetail(this.id);
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    // this.subscriptions.unsubscribe();
  }

  // 获取服务详情信息
  getServiceDetail(serviceInfoId: string) {
    this.serviceListServ
      .getServiceDetail(serviceInfoId)
      .success((success) => {
        const data = success && success.data;
        this.serviceDetail = data && data.service;
        this.relevanceList = data && data.relevanceList;
      })
      .error((error) => {
        this.serviceDetail = {};
        this.relevanceList = [];
        console.error('error');
      });
  }

  // 跳转到列表页
  @clickOnce()
  handleBackClick() {
    this.router.navigate([ 'list' ], { relativeTo: this.activatedRoute.parent });
  }

  // 下载
  @clickWaitHttp('handleDownloadClick')
  handleDownloadClick(serviceWordUrl: string) {
    return saveAs(serviceWordUrl);
  }

  // 跳转到修改页面
  @clickOnce()
  handleModifyClick() {
    this.router.navigate([ '/content/service/services/list/modify' ], { queryParams: { id: this.id } });
  }

  languageEnable(langCode: string) {
    return languageEnable(langCode);
  }
}
