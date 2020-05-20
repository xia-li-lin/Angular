import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { WebInfoService, Contact, languageEnable } from 'src/app/service';
import { clickWaitHttp, clickOnce } from '../../../../core';

@Component({
  selector: 'app-web-info',
  templateUrl: './web-info.component.html',
  styleUrls: [ './web-info.component.scss' ]
})
export class WebInfoComponent implements OnInit {
  public copyrights: Array<Contact>;
  public copyrightsClone: Array<Contact>;
  public copyrightsEn: Array<Contact>;
  public copyrightsEnClone: Array<Contact>;
  public links: Array<Contact>;
  public linksClone: Array<Contact>;
  public linksEn: Array<Contact>;
  public linksEnClone: Array<Contact>;
  public readonly = true;

  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;

  constructor(private webInfoService: WebInfoService) {}

  ngOnInit() {
    this.getWebInfo();
  }

  public languageEnable(langCode: string) {
    return languageEnable(langCode);
  }
  // 修改描述
  public handleContactKey(id, value, type) {
    if (type === 'links') {
      this.linksClone.map((item) => {
        if (item.contactId === id) {
          item.contactKey = value;
        }
      });
    } else if (type === 'linksEn') {
      this.linksEnClone.map((item) => {
        if (item.contactId === id) {
          item.contactKey = value;
        }
      });
    } else if (type === 'copyrights') {
      this.copyrightsClone.map((item) => {
        if (item.contactId === id) {
          item.contactKey = value;
        }
      });
    } else if (type === 'copyrightsEn') {
      this.copyrightsEnClone.map((item) => {
        if (item.contactId === id) {
          item.contactKey = value;
        }
      });
    }
  }

  // 修改链接地址
  public handleContactValue(id, value, type) {
    if (type === 'links') {
      this.linksClone.map((item) => {
        if (item.contactId === id) {
          item.contactValue = value;
        }
      });
    } else if (type === 'linksEn') {
      this.linksEnClone.map((item) => {
        if (item.contactId === id) {
          item.contactValue = value;
        }
      });
    } else if (type === 'copyrights') {
      this.copyrightsClone.map((item) => {
        if (item.contactId === id) {
          item.contactValue = value;
        }
      });
    } else if (type === 'copyrightsEn') {
      this.copyrightsEnClone.map((item) => {
        if (item.contactId === id) {
          item.contactValue = value;
        }
      });
    }
  }

  // 编辑
  @clickOnce()
  public handleEdit() {
    this.readonly = false;
  }

  // 保存
  @clickWaitHttp('handleSave')
  public handleSave() {
    return this.webInfoService
      .updateWebInfoList(
        this.linksClone.concat(this.linksEnClone).concat(this.copyrightsClone).concat(this.copyrightsEnClone)
      )
      .success((res) => {
        this.getWebInfo();
        this.readonly = true;
      })
      .error((res) => {
        console.log(res);
      });
  }

  private getWebInfo() {
    this.webInfoService
      .getWebInfo()
      .success((res) => {
        this.links = res.data.links.filter((item) => item.langCode === 'ZH_TW');
        this.linksEn = res.data.links.filter((item) => item.langCode === 'EN_US');
        this.copyrights = res.data.copyrights.filter((item) => item.langCode === 'ZH_TW');
        this.copyrightsEn = res.data.copyrights.filter((item) => item.langCode === 'EN_US');
        this.linksClone = Object.assign([], res.data.links);
        this.linksEnClone = Object.assign([], this.linksEn);
        this.copyrightsClone = Object.assign([], res.data.copyrights);
        this.copyrightsEnClone = Object.assign([], this.copyrightsEn);
      })
      .error((res) => {
        console.log(res);
      });
  }
}
