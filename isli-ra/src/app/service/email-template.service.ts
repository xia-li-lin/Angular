import { EmailTemplateType, EmailTemplateOperatStatus } from './model/email-template.model';
import { PaginationResult } from './model/common.model';
import { Injectable } from '@angular/core';
import { HttpJson, HttpResponse } from '../core';
import { PageSearch, EmailTemplate } from './model';

const HTTP_GET_EMIAL_TEMPLATE_LIST = '/isli/irms/manage-system/base/mailtemplatemanage/emailList';
const HTTP_GET_EMAIL_TEMPLATE_DETAIL = '/isli/irms/manage-system/base/mailtemplatemanage/getEmailList/{uuid}';
const HTTP_POST_EMIAL_TEMPLATE_ADD = '/isli/irms/manage-system/base/mailtemplatemanage/addEmailList';
const HTTP_POST_EMIAL_TEMPLATE_UPDATE = '/isli/irms/manage-system/base/mailtemplatemanage/updateEmailList';
const HTTP_GET_EMAIL_TEMPLATE_DELETE = '/isli/irms/manage-system/base/mailtemplatemanage/delEmailList/{uuid}';
const HTTP_GET_EMIAL_TEMPLATE_TYPE = '/isli/irms/manage-system/base/mailtemplatemanage/loadEmailType';
const HTTP_GET_EMAIL_TEMPLATE_OPERATESTATUS =
  '/isli/irms/manage-system/base/mailtemplatemanage/loadEmailStatus/{mailTypeId}';
const HTTP_GET_EMAIL_TEMPLATE_BY_STATUS =
  '/isli/irms/manage-system/base/mailtemplatemanage/findTemplateByStatus/{operatingStatusId}';

@Injectable({ providedIn: 'root' })
export class EmailTemplateService {
  constructor(private http: HttpJson) {}

  getEmailTemplateList(page: PageSearch): HttpResponse<PaginationResult<EmailTemplate>> {
    return this.http.get(HTTP_GET_EMIAL_TEMPLATE_LIST, {}, Object.assign({}, page));
  }

  getEmailTemplateDetail(uuid: string): HttpResponse<PaginationResult<EmailTemplate>> {
    return this.http.get(HTTP_GET_EMAIL_TEMPLATE_DETAIL, { uuid });
  }

  addEmailTempalte(templates: Array<EmailTemplate>) {
    return this.http.post(HTTP_POST_EMIAL_TEMPLATE_ADD, {}, {}, templates);
  }

  updateEmailTempalte(templates: Array<EmailTemplate>) {
    return this.http.post(HTTP_POST_EMIAL_TEMPLATE_UPDATE, {}, {}, templates);
  }

  deleteEmailTemplate(uuid: string) {
    return this.http.get(HTTP_GET_EMAIL_TEMPLATE_DELETE, { uuid });
  }

  getEmailTemplateTypeList(): HttpResponse<Array<EmailTemplateType>> {
    return this.http.get(HTTP_GET_EMIAL_TEMPLATE_TYPE);
  }

  getEmailTemplateOperatStatus(mailTypeId: string): HttpResponse<Array<EmailTemplateOperatStatus>> {
    return this.http.get(HTTP_GET_EMAIL_TEMPLATE_OPERATESTATUS, { mailTypeId });
  }

  /**
   * 依据状态查找模板
   */
  getEmailTemplateByStatus(status: number) {
    return this.http.get(HTTP_GET_EMAIL_TEMPLATE_BY_STATUS, { operatingStatusId: status });
  }
}
