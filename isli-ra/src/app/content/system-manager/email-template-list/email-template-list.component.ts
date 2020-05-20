import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService, MessageService } from 'primeng/api';

import { PagingBoxObj } from 'src/app/shared/component/paging-box';
import { EmailTemplateService, EmailTemplate, PageSearch } from 'src/app/service';
import { clickWaitHttp, clickOnce, HttpResponse } from 'src/app/core';
import { TranslateService } from '@ngx-translate/core';

const TEMP_CN = `<p style="margin-top: 0.5em; margin-bottom: 0.5em; color: rgb(0, 0, 0); font-family: 宋体;
          font-size: 16px; white-space: normal; text-indent: 28px;">尊敬的先生/女士：</p><p style="margin-top: 0.5em;
          margin-bottom: 0.5em; color: rgb(0, 0, 0); font-family: 宋体; font-size: 16px; white-space: normal;
          text-indent: 28px;"
          >您好！您于2015-4-16提交注册的服务提供商的账号【邮箱】已通过审核。请点击下面链接或将地址复制到浏览器地址栏，根据指引完成密码设置并激活即可正常使用。</p
          ><p style="margin-top: 0.5em; margin-bottom: 0.5em; color: rgb(0, 0, 0);
          font-family: 宋体; font-size: 16px; white-space: normal; text-indent: 28px;"><a href="http://www.isli-international.org/"
          >http://www.isli-international.org/...</a></p><p style="margin-top: 0.5em; margin-bottom: 0.5em;
           color: rgb(0, 0, 0); font-family: 宋体; font-size: 16px; white-space: normal; text-indent: 28px;">
           如果有任何疑问，请与	ISLI	注册机构的工作人员取得联系并寻求相关帮助。感谢您的支持！</p><p style="margin-top: 0.5em;
            margin-bottom: 0.5em; color: rgb(0, 0, 0); font-family: 宋体; font-size: 16px; white-space: normal;">备注：
            </p><p style="margin-top: 0.5em; margin-bottom: 0.5em; color: rgb(0, 0, 0); font-family: 宋体;
             font-size: 16px; white-space: normal;"><strong>【回复的内容】</strong></p><p style="margin-top: 0.5em;
             argin-bottom: 0.5em; color: rgb(0, 0, 0); font-family: 宋体; font-size: 16px; white-space: normal;"><br/>
             </p><p style="margin-top: 0.5em; margin-bottom: 0.5em; color: rgb(0, 0, 0); font-family: 宋体; font-size: 16px;
             white-space: normal;">ISLI注册机构</p><p style="margin-top: 0.5em; margin-bottom: 0.5em; color: rgb(0, 0, 0);
             font-family: 宋体; font-size: 16px; white-space: normal;">官方网址：	<a href="http://www.isli-international.org/"
             >www.isli-international.org</a></p><p><br/></p>`;
const TEMP_EN = `<p style="margin - top: 0.5em; margin - bottom: 0.5em; color: rgb(0, 0, 0); font - family: 宋体; font - size: 16px;
          white - space: normal; ">Dear Sir or Madam:</p><p style="margin - top: 0.5em; margin - bottom: 0.5em; color: rgb(0, 0, 0);
          font - family: 宋体; font - size: 16px; white - space: normal; ">Your application (submitted on 2015-4-16)
          for an SP account 【邮箱】has been approved. Please follow this link to set your password and activate the account.
          If you are unable to click on the link, please copy the entire link and paste it into your browser&#39;s address bar.</p>
          <p style="margin - top: 0.5em; margin - bottom: 0.5em; color: rgb(0, 0, 0); font - family: 宋体; font - size: 16px;
          white - space: normal; "><a href="http://www.isli-international.org/">http://www.isli-international.org/...</a>
          </p><p style="margin-top: 0.5em; margin-bottom: 0.5em; color: rgb(0, 0, 0); font-family: 宋体; font-size: 16px;
          white-space: normal;">If you have any question or need help, please contact us.</p><p style="margin-top: 0.5em;
           margin-bottom: 0.5em; color: rgb(0, 0, 0); font-family: 宋体; font-size: 16px; white-space: normal;"><br/>
           </p><p style="margin-top: 0.5em; margin-bottom: 0.5em; color: rgb(0, 0, 0); font-family: 宋体; font-size: 16px;
            white-space: normal;">Thanks for your support!</p><p style="margin-top: 0.5em; margin-bottom: 0.5em;
            color: rgb(0, 0, 0); font-family: 宋体; font-size: 16px; white-space: normal;"><br/></p><p style="margin-top: 0.5em;
            margin-bottom: 0.5em; color: rgb(0, 0, 0); font-family: 宋体; font-size: 16px; white-space: normal;">ISLI RA</p>
            <p style="margin-top: 0.5em; margin-bottom: 0.5em; color: rgb(0, 0, 0); font-family: 宋体; font-size: 16px;
            white-space: normal;">Official Website:&nbsp;<a href="http://www.isli-international.org/">www.isli-international.org</a>
            </p><p><br/></p>`;

@Component({
  selector: 'app-email-template-list',
  templateUrl: './email-template-list.component.html',
  styleUrls: [ './email-template-list.component.scss' ],
  providers: [ ConfirmationService ]
})
export class EmailTemplateListComponent implements OnInit {
  public emailTemplateListData: Array<EmailTemplate>;
  public showTemplateFlag: boolean;
  public emailTemplateDetails: Array<EmailTemplate>;
  public showSaveBtnFlag: boolean;
  public pageInfo = new PagingBoxObj();

  constructor(
    private emailTemplateService: EmailTemplateService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.getEmailTemplateList();
  }

  getEmailTemplateList() {
    this.emailTemplateService
      .getEmailTemplateList({
        pageNo: this.pageInfo.page,
        pageSize: this.pageInfo.rows
      })
      .success((res) => {
        console.log('email list-----', res);
        this.emailTemplateListData = res.data.list;
        this.pageInfo.totalRecords = res.data.totalCount;
      })
      .error(() => {
        this.emailTemplateListData = [];
        this.pageInfo.totalRecords = 0;
      });
  }

  @clickOnce()
  handleCheckClick() {
    this.showTemplateFlag = true;
    this.showSaveBtnFlag = false;
    this.emailTemplateDetails = [
      {
        creatorName: '产品经理',
        emailTemplate: TEMP_CN,
        emailTitle: 'SP注册审核通知',
        emailType: '2',
        langCode: 'ZH',
        marks: 'SP审核通过时，系统自动发送本邮件。',
        operatingStatus: 102
      },
      {
        creatorName: 'Daniel',
        emailTemplate: TEMP_EN,
        emailTitle: 'SP registration audit notice',
        emailType: '9',
        langCode: 'EN',
        marks: 'SP approved, the system automatically sent this E-mail.',
        operatingStatus: 120
      }
    ];
  }

  @clickOnce()
  handleCreateClick() {
    this.showTemplateFlag = true;
    this.showSaveBtnFlag = true;
    this.emailTemplateDetails = [];
  }

  @clickWaitHttp('handleEditClick')
  handleEditClick(item: EmailTemplate) {
    this.showTemplateFlag = true;
    this.showSaveBtnFlag = true;
    this.emailTemplateService
      .getEmailTemplateDetail(item.uuid)
      .success((res) => {
        console.log('details----', res);
        this.emailTemplateDetails = res.data.list;
      })
      .error(() => {
        this.emailTemplateDetails = [];
      });
  }

  @clickOnce()
  handleDeleteClick(item: EmailTemplate) {
    console.log(item);
    this.confirmationService.confirm({
      message: this.translateService.instant('systemEmail.list.deleteMess'),
      accept: () => {
        this.emailTemplateService
          .deleteEmailTemplate(item.uuid)
          .success((res) => {
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('common.operaSuccess')
            });
            if (this.emailTemplateListData.length === 1 && this.pageInfo.page > 1) {
              this.pageInfo.page -= 1;
            }
            this.getEmailTemplateList();
          })
          .failed(() => {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant('common.operaFailed')
            });
          });
      }
    });
  }

  handleCancelClick() {
    this.showTemplateFlag = false;
  }

  handlePageChange(params) {
    this.pageInfo.page = params.page;
    this.getEmailTemplateList();
  }

  @clickWaitHttp('handleSureClick')
  handleSureClick(data: Array<EmailTemplate>) {
    let req: HttpResponse<any>;
    if (this.emailTemplateDetails === []) {
      req = this.emailTemplateService.addEmailTempalte(data);
    } else {
      req = this.emailTemplateService.updateEmailTempalte(data);
    }
    return req
      .success((res) => {
        this.getEmailTemplateList();
        this.showTemplateFlag = false;
        this.messageService.add({
          severity: 'success',
          summary: this.translateService.instant('common.operaSuccess')
        });
      })
      .failed(() => {
        this.messageService.add({
          severity: 'error',
          summary: this.translateService.instant('common.operaFailed')
        });
      });
  }
}
