import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalValidService } from 'mpr-form-valid';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { clickOnce, clickWaitHttp } from 'src/app/core';
import { SourceListService } from 'src/app/service';
import { EntityType, languageEnable } from 'src/app/service/model';

@Component({
  selector: 'app-target-add',
  templateUrl: './target-add.component.html',
  styleUrls: [ './target-add.component.scss' ]
})
export class TargetAddComponent implements OnInit {
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

  // 添加目标数据
  addSourceEntity() {
    console.log(1);

    return this.sourceListServ
      .addSourceEntity(this.entityType)
      .success((success) => {
        console.log(success);
        this.messageServ.add({
          severity: 'success',
          summary: this.translateServ.instant('service.targetList.target'),
          detail: this.translateServ.instant('service.common.operaSuccess')
        });
        this.router.navigate([ 'list' ], { relativeTo: this.activatedRoute.parent, queryParams: { reload: true } });
      })
      .error((error) => {
        this.messageServ.add({
          severity: 'error',
          summary: this.translateServ.instant('service.targetList.target'),
          detail: this.translateServ.instant('service.common.operaFailed')
        });
      });
  }

  // 保存
  @clickWaitHttp('handleSaveClick')
  handleSaveClick() {
    console.log(this.entityType);
    if (this.globalValidServ.validAll()) {
      return this.addSourceEntity();
    }
  }

  // 取消
  @clickOnce()
  handleCancelClick() {
    this.router.navigate([ 'list' ], { relativeTo: this.activatedRoute.parent });
  }

  languageEnable(langCode: string) {
    return languageEnable(langCode);
  }
}
