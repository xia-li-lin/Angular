import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { languageEnable, RelevanceTypeInfo } from 'src/app/service/model';
import { ServiceAssociationService } from 'src/app/service/service.association.service';
import { clickOnce } from 'src/app/core';

@Component({
  selector: 'app-association-type-detail',
  templateUrl: './association-type-detail.component.html',
  styleUrls: [ './association-type-detail.component.scss' ]
})
export class AssociationTypeDetailComponent implements OnInit, OnDestroy {
  public relevanceTypeInfo: RelevanceTypeInfo;

  private subscriptions: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private serviceAssociationServ: ServiceAssociationService
  ) {
    this.subscriptions = this.activatedRoute.queryParams.subscribe((queryParams) => {
      const relevanceTypeId = queryParams && queryParams.sId;
      this.getAssocicationDetail(relevanceTypeId);
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // 获取关联类型详情
  getAssocicationDetail(relevanceTypeId: string) {
    this.serviceAssociationServ.getAssocicationDetail(relevanceTypeId).success((success) => {
      const data = success && success.data;
      this.relevanceTypeInfo = data;
    });
  }

  // 返回
  @clickOnce()
  handleBackClick() {
    this.router.navigate([ 'list' ], { relativeTo: this.activatedRoute.parent });
  }

  // 修改
  @clickOnce()
  handleModifyClick(relevanceTypeId: string) {
    this.router.navigate([ '/content/service/association-type/list/modify' ], { queryParams: { relevanceTypeId } });
  }

  languageEnable(langCode: string) {
    return languageEnable(langCode);
  }
}
