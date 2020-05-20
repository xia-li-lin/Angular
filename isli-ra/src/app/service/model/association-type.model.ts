import { DropDownOption } from './common.model';

// 关联类型搜索查询参数
export class AssociationTypeSearch {
  constructor(
    public startTime?: string, // 开始时间
    public endTime?: string, // 结束时间
    public status?: ASSOCIATION_TYPE_STATUS, // 状态
    public type?: string, // 关联类型
    public sourceType?: string, // 源类型
    public targetType?: string // 目标类型
  ) {}
}

// 状态
export enum ASSOCIATION_TYPE_STATUS {
  ALL = '',
  NORMAL = 'Y',
  STOP = 'N'
}

// 关联类型列表/详情
export class AssociationType {
  constructor(
    public id?: string, // id
    public associationTypeName?: string, // 关联类型
    public sourceType?: string, // 源类型
    public sourceTypeZh?: string, // 源类型
    public sourceTypeEn?: string, // 源类型
    public targetType?: string, // 目标类型
    public targetTypeZh?: string, // 目标类型
    public targetTypeEn?: string, // 目标类型
    public createTime?: string, // 创建时间
    public description?: string // 描述
  ) {}
}

// 关联类型状态列表
export const AssociationTypeStatusList = [
  new DropDownOption('service.associationType.status.all', ASSOCIATION_TYPE_STATUS.ALL),
  new DropDownOption('service.associationType.status.normal', ASSOCIATION_TYPE_STATUS.NORMAL),
  new DropDownOption('service.associationType.status.disabled', ASSOCIATION_TYPE_STATUS.STOP)
];
