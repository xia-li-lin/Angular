import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalValidService } from 'mpr-form-valid';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { clickOnce, clickWaitHttp } from 'src/app/core';
import { SourceListService } from 'src/app/service';
import { EntityType, languageEnable } from 'src/app/service/model';

@Component({
  selector: 'app-source-add',
  templateUrl: './source-add.component.html',
  styleUrls: [ './source-add.component.scss' ]
})
export class SourceAddComponent implements OnInit {
  public entityType = new EntityType();

  constructor(
    private activatedRoute: ActivatedRoute,
    private globalValidServ: GlobalValidService,
    private messageServ: MessageService,
    private router: Router,
    private sourceListServ: SourceListService,
    private translateServ: TranslateService
  ) {}

  ngOnInit() {}

  // 添加源数据
  addSourceEntity() {
    return this.sourceListServ
      .addSourceEntity(this.entityType)
      .success((success) => {
        console.log(success);
        this.messageServ.add({
          severity: 'success',
          summary: this.translateServ.instant('service.sourceList.source'),
          detail: this.translateServ.instant('service.common.operaSuccess')
        });
        this.router.navigate([ '/content/service/source-list' ], {
          relativeTo: this.activatedRoute.parent,
          queryParams: { reload: true }
        });
      })
      .error((error) => {
        this.messageServ.add({
          severity: 'error',
          summary: this.translateServ.instant('service.sourceList.source'),
          detail: this.translateServ.instant('service.common.operaFailed')
        });
      });
  }

  // 取消
  @clickOnce()
  handleCancelClick() {
    this.router.navigate([ 'list' ], {
      relativeTo: this.activatedRoute.parent
    });
  }

  // 保存
  @clickWaitHttp('addSourceEntity')
  handleSaveClick() {
    if (this.globalValidServ.validAll()) {
      return this.addSourceEntity();
    }
  }

  languageEnable(langCode: string) {
    return languageEnable(langCode);
  }
}
