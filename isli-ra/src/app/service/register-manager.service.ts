import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { HttpJson, HttpResponse, AppState } from '../core';
import { PageParams, PaginationResult, RegisterManagerData, RegisterManagerSearch, STATUS } from '../service/model';

const INTERFACE_PREFIX = '/isli/irms/manage-servicecode/base/scManager';
const HTTP_GET_SERVICE_REGISTER_MANAGER = INTERFACE_PREFIX + '/v1/scList'; // 获取服务登记管理列表
const HTTP_GET_SYSTEM_DATA = INTERFACE_PREFIX + '/queryUrlApi'; // 获取系统资料
const HTTP_POST_FORZEN = INTERFACE_PREFIX + '/updateScStatusV1'; // 冻结
const HTTP_POST_ENABLE = INTERFACE_PREFIX + '/updateScStatusV1'; // 启用
const HTTP_POST_STOP = INTERFACE_PREFIX + '/updateScStatusV1'; // 停用
const HTTP_POST_PEND_REVIEW = INTERFACE_PREFIX + '/v1/updateSecondAudit'; // 待复审
const HTTP_GET_EXPORT_EXCEL = INTERFACE_PREFIX + '/exportExcel'; // 导出excel
const HTTP_POST_FIRST_REVIEW = INTERFACE_PREFIX + '/v1/updateFirstAudit'; // 待初审
const HTTP_POST_SCINFO_UPDATE = INTERFACE_PREFIX + '/manageUpdateScInfo';
const HTTP_GET_SERVICE_NAME_EXIST = INTERFACE_PREFIX + '/checkServiceNameUnique';
const HTTP_GET_SP_SC_INFO = INTERFACE_PREFIX + '/getSpAndScInfoV1';
const HTTP_POST_BUILD_TO_PEND_TRIAL = INTERFACE_PREFIX + '/updateThreeAuditV1'; // 建设中--审核处理
const HTTP_POST_APPEAL_REVIEW = INTERFACE_PREFIX + '/appealReviewV1';

@Injectable({
  providedIn: 'root'
})
export class RegisterManagerService {
  private pageParams = new PageParams();

  constructor(private http: HttpJson, private stateServ: AppState) {}

  // 获取状态
  public getStatus() {
    return [
      { label: 'service.register.status.all', value: '' },
      { label: 'service.register.status.preTrial', value: STATUS.PRE_AUDIT },
      { label: 'service.register.status.normal', value: STATUS.NORMAL },
      { label: 'service.register.status.forzen', value: STATUS.FORZEN },
      { label: 'service.register.status.stop', value: STATUS.STOP },
      { label: 'service.register.status.pendTrial', value: STATUS.PEND_TRIAL },
      { label: 'service.register.status.pendReview', value: STATUS.PEND_REVIEW },
      { label: 'service.register.status.notPass', value: STATUS.NOT_PASS },
      { label: 'service.register.status.build', value: STATUS.BUILD }
    ];
  }
  // 获取服务登记管理列表
  public getServiceRegisterManager(
    pageIndex = this.pageParams.pageIndex,
    pageRows = this.pageParams.pageRows,
    queryParams: RegisterManagerSearch
  ): HttpResponse<PaginationResult<RegisterManagerData>> {
    return this.http.get(
      HTTP_GET_SERVICE_REGISTER_MANAGER,
      null,
      Object.assign({}, queryParams, { pageIndex, pageRows })
    );
  }

  // 服务登记申请资料--获取系统资料
  public getSystemData(id: string): HttpResponse<RegisterManagerData> {
    return this.http.get(HTTP_GET_SYSTEM_DATA, {}, { scId: id });
  }

  // 冻结
  public postForzen(id: string, reason: string) {
    return this.http.post(HTTP_POST_FORZEN, {}, null, { scId: id, scStatus: STATUS.FORZEN, auditOpinion: reason });
  }

  // 启用
  public postEnable(id: string, reason: string) {
    return this.http.post(HTTP_POST_ENABLE, {}, {}, { scId: id, scStatus: STATUS.NORMAL, auditOpinion: reason });
  }

  // 停用
  public postStop(id: string, reason: string) {
    return this.http.post(HTTP_POST_STOP, {}, {}, { scId: id, scStatus: STATUS.STOP, auditOpinion: reason });
  }

  // 申诉审核

  // 待初审
  public postPendTrial(id: string, reason: string, firstAuditResult: string) {
    return this.http.post(HTTP_POST_FIRST_REVIEW, {}, null, {
      scId: id,
      firstAuditResult,
      firstAuditOpinion: reason
    });
  }

  // 待复审
  public postPendReview(id: string, reason: string, secondAuditResult: string) {
    return this.http.post(HTTP_POST_PEND_REVIEW, {}, null, { scId: id, secondAuditResult, secondAuditOpinion: reason });
  }

  // 建设中--审核处理
  public buildToPendTrial(scId: string, reason: string, threeAuditResult: string) {
    return this.http.post(HTTP_POST_BUILD_TO_PEND_TRIAL, {}, {}, { scId, pretrialOpinion: reason, threeAuditResult });
  }

  public getSpAndScInfo(scId: string) {
    return this.http.get(HTTP_GET_SP_SC_INFO, {}, { scId });
  }

  public updateScInfo(scInfo: RegisterManagerData) {
    return this.http.post(HTTP_POST_SCINFO_UPDATE, {}, {}, scInfo);
  }

  // 导出excel
  public getExportExcel(search?: RegisterManagerSearch) {
    const langCode = this.stateServ.get('language') || 'ZH_TW';
    saveAs(
      HTTP_GET_EXPORT_EXCEL +
        '?' +
        this.http.formatParams(Object.assign({}, search || {}, { langCode, selectedLanguage: langCode }))
    );
  }

  public checkServiceNameExist(serviceCode: string, serviceName: string) {
    return this.http.get(HTTP_GET_SERVICE_NAME_EXIST, {}, { serviceCode, serviceName });
  }

  public appealReview(scId: number, scStatus: number, auditOpinion: string) {
    return this.http.post(HTTP_POST_APPEAL_REVIEW, {}, {}, { scId, scStatus, auditOpinion });
  }
}
