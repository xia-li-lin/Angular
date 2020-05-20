// 服务登记管理-搜索请求参数
export class RegisterManagerSearch {
  constructor(
    public applyDateFrom?: string, // 登记开始日期
    public applyDateTo?: string, // 等级结束日期
    public status?: STATUS, // 状态
    public serviceName?: string, // 服务
    public serviceCode?: string, // 服务编码
    public spId?: string // 服务提供商
  ) {}
}

/**
 * 状态：                      操作
 * 预审：1
 * 未通過:2;-----------------> 查看详情;
 * 正常:3;-------------------> 查看详情;查看系统资料;冻结
 * 凍結:4;-------------------> 查看详情;查看系统资料;启用;停用;申诉审核
 * 停用:5;-------------------> 查看详情;查看系统资料;启用
 * 建設中:6; -----------------> 查看详情;审核
 * 待初審:7;-----------------> 查看详情;待初审
 * 待復審:8;-----------------> 查看详情;待复审
 */
export enum STATUS {
  PRE_AUDIT = 1,
  NOT_PASS = 2,
  NORMAL = 3,
  FORZEN = 4,
  STOP = 5,
  PEND_TRIAL = 7,
  PEND_REVIEW = 8,
  BUILD = 6
}

// 服务登记管理列表
export class RegisterManagerData {
  constructor(
    public scId?: string, // id
    public spId?: string,
    public serviceName?: string, // 服务
    public serviceNameEn?: string,
    public scType?: string,
    public serviceCode?: string, // 服务编码
    public orgName?: string, // 服务提供商 机构名称
    public applyDatetime?: string, // 登记日期
    public applicationStatus?: STATUS, //  状态SC未通过的时候包含的状态：已申请[1]、未通过[2]；通过状态：正常[3]，冻结[4]，停\用[5];结合is_permitted使用(1表示通过则对应的状态为3,4,5)
    public resolutionServiceUrl?: string, // 解析服务URL
    public associationTypeIds?: string, // 关联类型的id
    public sourceTypeIds?: string, // 源列表类型id，因为要求可以多选，所以多个用逗号隔开
    public targetTypeIds?: string, // 目标类型id，因为要求可以多选，所以多个用逗号隔开
    public originalServiceSummary?: string, // 申请的关联服务说明(上传文件的UUID,)
    public swfServiceSummary?: string, // 申请的关联服务说明（SWF格式，用于WEB页面显示）
    public originalServiceSummaryEn?: string, // 申请的关联服务说明(上传文件的UUID,)
    public swfServiceSummaryEn?: string, // 申请的关联服务说明（SWF格式，用于WEB页面显示）
    public originalServicePlan?: string, // 申请关联服务实施计划
    public swfServicePlan?: string, // 申请关联服务实施计划（SWF格式，用于WEB页面显示）
    public isPermitted?: number, // 是否通过SC编码的申请，1是/0否; 1的时候，[service_code有值]
    public frozenAppeal?: string, // 冻结申述（一但状态切换，置空此字段）
    public createDatetime?: string, // 创建时间
    public updateDatetime?: string, // 更新时间
    public auditOpinion?: string, // 审核提交理由
    public frozenDatetime?: string, // 冻结日期
    public appealDatetime?: string, // 申诉日期
    public distributionDatetime?: string, // 分配日期
    public cancelDatetime?: string, // 注销日期
    public planFileName?: string, // 拟申请关联服务实施计划
    public summaryFileName?: string, // 拟申请关联服务说明
    public spEmail?: string, // 用户名
    public contact?: string, // 联系人
    public phone?: string, // 联系人电话（固话）
    public mobile?: string, // 联系人电话（手机）
    public position?: string, // 职位
    public email?: string, // 电子邮箱
    public address?: string, // 通讯地址
    public zip?: string, // 邮编
    public spLoginUrl?: string,
    public firstAuditTime?: string, // 初审日期
    public firstAuditOpinion?: string, // 初审意见
    public secondAuditTime?: string, // 复审日期
    public secondAuditOpinion?: string, // 复审意见
    public cancelOpinion?: string,
    public relevanceTypeUuidText?: string, // 关联类型
    public sourceTypeUuidsText?: string, // 源类型
    public targetTypeUuidsText?: string, // 目标类型
    public lcLength?: string, // 关联字段
    public lcSection?: string, // 关联字段分段
    public mobileType?: any,
    public phoneArea?: string,
    public phoneType?: string,
    public phoneExt?: string
  ) {}
}

// 查看系统资料
export class SystemData {
  constructor(
    public isliRegisterApi?: string, // ISLI編碼註冊API
    public isliResolutionApi?: string, // ISLI編碼解析API
    public sysIdentity?: string, // 系统标识
    public sysSymmetricKey?: string // 系統密鑰
  ) {}
}
