import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterManagerData, STATUS } from 'src/app/service';
import { clickOnce, SUBJECT, SubjectService } from 'src/app/core';

@Component({
  selector: 'app-register-manager-opera',
  templateUrl: './register-manager-opera.component.html',
  styleUrls: [ './register-manager-opera.component.scss' ]
})
export class RegisterManagerOperaComponent implements OnInit {
  @Input() registerManager: RegisterManagerData;

  public status = STATUS;

  constructor(private router: Router, private subjectServ: SubjectService) {}

  ngOnInit() {}

  // 申诉审核
  @clickOnce()
  handleAppealReviewClick(frozenAppeal) {
    if (!frozenAppeal) {
      return;
    }
    this.subjectServ.pubscript(SUBJECT.APPEAL_REVIEW, this.registerManager);
  }

  // 待复审,建设中
  @clickOnce()
  handleAppealAuditClick() {
    this.subjectServ.pubscript(SUBJECT.TO_EXAMINE, this.registerManager);
  }

  // 启用
  @clickOnce()
  handleEnableClick() {
    this.subjectServ.pubscript(SUBJECT.ENABLE, this.registerManager);
  }

  // 冻结
  @clickOnce()
  handleForzenClick() {
    this.subjectServ.pubscript(SUBJECT.FORZEN, this.registerManager);
  }

  // 停用
  @clickOnce()
  handleStopClick() {
    this.subjectServ.pubscript(SUBJECT.STOP, this.registerManager);
  }

  // 查看详情
  @clickOnce()
  handleViewDetailClick() {
    this.router.navigate([ '/content/service/register/list/detail' ], {
      queryParams: {
        id: this.registerManager && this.registerManager.scId,
        status: this.registerManager && this.registerManager.applicationStatus
      }
    });
  }

  // 查看系统资料
  @clickOnce()
  handleViewSystemDataClick() {
    this.subjectServ.pubscript(SUBJECT.CHECK_SYSTEM_DATA, this.registerManager);
  }
}
