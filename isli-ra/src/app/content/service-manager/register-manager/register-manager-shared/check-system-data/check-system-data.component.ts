import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { SystemData } from 'src/app/service';

@Component({
  selector: 'app-check-system-data',
  templateUrl: './check-system-data.component.html',
  styleUrls: [ './check-system-data.component.scss' ]
})
export class CheckSystemDataComponent implements OnInit {
  @Output() closeSystemDataClick: EventEmitter<any> = new EventEmitter();

  @Input() systemData: SystemData;

  constructor(private messageServ: MessageService, private translateServ: TranslateService) {}

  ngOnInit() {}

  // 复制成功---回调函数
  handleCopySuccessClick() {
    this.messageServ.clear();
    this.messageServ.add({
      severity: 'success',
      summary: this.translateServ.instant('service.common.tips'),
      detail: this.translateServ.instant('service.common.copySuccess')
    });
  }
}
