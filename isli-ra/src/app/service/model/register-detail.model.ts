import { STATUS } from './register-manager.model';

// 服务登记信息---基础字段
export class ServiceRegisterBaseInfoObj {
  constructor(
    public services?: string, // 服務
    public serviceCode?: string, // 服務編碼
    public serviceType?: string, // 關聯類型
    public sourceType?: string, // 源類型
    public targetType?: string, // 目標類型
    public correlationField?: string, // 關聯字段
    public correlationFieldSegments?: string, // 關聯字段分段
    public applyServicePlan?: ApplyServicePlanObj, // 擬申請關聯服務實施計劃
    public status?: STATUS // 狀態
  ) {}
}

// 服务登记信息---正常状态
export class NormalObj {
  constructor(
    public associateTargetResolutionAddress?: string, // 關聯目標解析地址
    public singleSignApi?: string, // 單點登錄API
    public registerData?: string, // 登記日期
    public allotmentDate?: string, // 分配日期
    public firstTrialDate?: string, // 初審日期
    public preliminary?: string, // 初審意見
    public reviewDate?: string, // 復審日期
    public reviewOpinion?: string // 復審意見
  ) {}
}
// 服务登记信息---凍結状态
export class ForzenObj {
  constructor(
    public registerData?: string, // 登記日期
    public allotmentDate?: string, // 分配日期
    public freezeDate?: string, // 凍結日期
    public freezeReason?: string // 凍結理由
  ) {}
}
// 服务登记信息---停用状态
export class StopObj {
  constructor(
    public registerData?: string, // 登記日期
    public allotmentDate?: string, // 分配日期
    public freezeDate?: string, // 凍結日期
    public freezeReason?: string, // 凍結理由
    public stopDate?: string, // 停用日期
    public stopReason?: string // 停用理由
  ) {}
}
// 服务登记信息---待初審状态
export class PendTrialObj {
  constructor() {}
}

// 服务登记信息---待初審状态---审核
export class ToExamine {
  constructor(
    public approvalOpera?: APPROVAL_OPERA, // 审批操作
    public approvalOpinion?: string // 审批意见
  ) {}
}

/**
 * 审批操作：通过:1; 未通过:0
 */
export enum APPROVAL_OPERA {
  NOT_PASS,
  PASS
}

// 服务登记信息---待復審状态
export class PendReviewObj {
  constructor(
    public firstTrialDate?: string, // 初審日期
    public preliminary?: string, // 初審意見
    public firstTrialReason?: string // 初審结果
  ) {}
}
// 服务登记信息---未通過状态
export class NotPassObj {
  constructor(
    public firstTrialDate?: string, // 初審日期
    public preliminary?: string, // 初審意見
    public reviewDate?: string, // 復審日期
    public reviewOpinion?: string // 復審意見
  ) {}
}
// 服务登记信息---建設中状态
export class BuildObj {
  constructor(
    public associateTargetResolutionAddress?: string, // 關聯目標解析地址
    public singleSignApi?: string, // 單點登錄API
    public firstTrialDate?: string, // 初審日期
    public preliminary?: string, // 初審意見
    public reviewDate?: string, // 復審日期
    public reviewOpinion?: string // 復審意見
  ) {}
}
// 服务登记信息
export class ServiceRegisterInfoData {
  constructor(
    public serviceRegisterBaseInfoObj?: ServiceRegisterBaseInfoObj, // 相同基本信息
    public serviceRegisterInfo?: any // NormalObj | ForzenObj | StopObj | PendTrialObj | PendReviewObj | NotPassObj | BuildObj
  ) {}
}

// 擬申請關聯服務實施計劃==拟申请关联服务实施计划
export class ApplyServicePlanObj {
  constructor(
    public text?: string, // 文本
    public preview?: string, // 预览
    public download?: string // 下载
  ) {}
}

// 服务提供商信息
export class ServiceProviderInfoData {
  constructor(
    public username?: string, // 用戶名
    public organizationName?: string, // 機構名稱
    public contactPerson?: string, // 聯系人
    public fixedTel?: string, // 固話
    public mobilePhone?: string, // 手機
    public capacity?: string, // 職位
    public email?: string, // 電子郵箱
    public address?: string, // 通訊地址
    public postcode?: string // 郵編
  ) {}
}

// 服务登记详情信息
export class ServiceRegisterDetailData {
  constructor(
    public serviceRegisterInfo: ServiceRegisterInfoData,
    public serviceProviderInfo: ServiceProviderInfoData
  ) {}
}
