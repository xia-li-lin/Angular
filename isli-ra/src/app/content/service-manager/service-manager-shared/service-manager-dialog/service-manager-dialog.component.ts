import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GlobalValidService } from 'mpr-form-valid';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { STATUS } from 'src/app/service';
import { AppState } from 'src/app/core';
import calculateNodeHeight from 'src/app/shared/directive/calculateNodeHeight';

@Component({
  selector: 'app-service-manager-dialog',
  templateUrl: './service-manager-dialog.component.html',
  styleUrls: [ './service-manager-dialog.component.scss' ]
})
export class ServiceManagerDialogComponent implements OnInit, AfterViewInit {
  @Output() cancelClick: EventEmitter<any> = new EventEmitter();
  @Output() submitClick: EventEmitter<any> = new EventEmitter();

  @Input() status: STATUS;
  @Input() serviceRegisterInfo: any;

  @ViewChild(NgForm, { static: true })
  form: NgForm;
  @ViewChild('dialog', null)
  dialog: ElementRef;

  public approvalOpinion: string;
  public approvalOperation = 'Y';
  public language: string;
  public statusObj = STATUS;

  public errorMsg = {
    reason: {
      required: 'service.register.dialog.submitReasonRequired'
    }
  };

  constructor(
    private globalValidServ: GlobalValidService,
    private messageServ: MessageService,
    private stateServ: AppState,
    private translateServ: TranslateService
  ) {
    this.language = this.stateServ.get('language');
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    const dialogHeight = calculateNodeHeight(this.dialog.nativeElement);

    if (dialogHeight % 2 !== 0) {
      this.dialog.nativeElement.style.height = dialogHeight + 1 + 'px';
    }
  }

  handleSubmitClick() {
    if (this.globalValidServ.validAll()) {
      this.submitClick.emit({
        approvalOperation: this.approvalOperation,
        approvalOpinion: this.approvalOpinion,
        status: this.status
      });
    }
  }

  // 复制成功---回调函数
  handleCopySuccessClick() {
    this.messageServ.add({
      severity: 'success',
      summary: this.translateServ.instant('service.common.tips'),
      detail: this.translateServ.instant('service.common.copySuccess')
    });
  }
}
