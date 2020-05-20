import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { GlobalValidService } from 'mpr-form-valid';

import { DropDownOption } from 'src/app/service';
import { MessageManager } from 'src/app/service/model/message-manager.model';
import { clickOnce } from 'src/app/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: [ './message.component.scss' ]
})
export class MessageComponent implements OnInit {
  @Output() OnCancelClick: EventEmitter<any> = new EventEmitter();
  @Output() OnSureClick: EventEmitter<any> = new EventEmitter();

  @Input() selectedAccount: any = [];
  @Input() spAccountData: Array<DropDownOption>;

  public infoTw = new MessageManager();
  public infoEn = new MessageManager();

  constructor(private globalValidService: GlobalValidService) {}

  ngOnInit() {}

  handleCancelClick() {
    this.OnCancelClick.emit();
  }

  @clickOnce()
  handleSendClick() {
    console.log('infoTw-----', this.infoTw);
    console.log('infoEn-----', this.infoEn);

    if (this.globalValidService.validAll()) {
      let sendObject;
      if (this.selectedAccount) {
        sendObject = this.selectedAccount.join(',');
      } else {
        sendObject = this.spAccountData
          .map((item) => {
            return item.value;
          })
          .join(',');
      }
      this.infoTw = Object.assign({}, this.infoTw, {
        langCode: 'ZH_TW',
        sendObject
      });
      this.infoEn = Object.assign({}, this.infoEn, {
        langCode: 'EN_US',
        sendObject
      });
      const data = [].concat(this.infoTw, this.infoEn);
      this.OnSureClick.emit(data);
    }
  }
}
