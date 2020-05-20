import { DropDownOption } from './common.model';

export enum SOURCE_TYPE {
  ENTITY = 1,
  TARGET
}

// 源列表搜索请求参数
export class SourceListSearch {
  constructor(
    public entityType = SOURCE_TYPE.ENTITY,
    public keywords?: string // 关键字
  ) {}
}

// 目标列表搜索请求参数
export class TargetListSearch {
  constructor(
    public entityType = SOURCE_TYPE.TARGET,
    public keywords?: string // 关键字
  ) {}
}

// 源列表
export class SourceList {
  constructor(
    public entityId?: string, // 源ID
    public entityName?: string, // 源名称
    public createTime?: string // 创建时间
  ) {}
}

export class EntityType {
  constructor(
    public entityId?: number, // 实体ID
    public entityName?: string, // 实体名称
    public entityNameZh?: string,
    public entityNameEn?: string,
    public entityDesc?: string, // 实体描述
    public entityDescZh?: string,
    public entityDescEn?: string,
    public entityEnable?: number, // 是否启用，默认启用状态1，2表示禁用
    public createTime?: string, // 创建时间
    public entityType?: SOURCE_TYPE
  ) {}
}

export class EntityField {
  constructor(
    /**
     * 属性ID
     */
    public paramId?: number,
    /**
     * 属性字段名
     */
    public paramCode?: string,
    /**
     * 实体ID
     */
    public entityId?: number,
    /**
     * 字段数据类型ID  1.单行文本， 2.整数, 3.日期 4.时间 5.多行文本....
     */
    public dataId?: number,
    /**
     * 编目类型（1必填、2普通、3只读、4不可见、5受控词选项值）
     */
    public paramType?: number,
    /**
     * 是否多值   0 是  1否
     */
    public multiValue?: number,
    /**
     * 受控词类型
     */
    public controlledId?: number,
    /**
     * 表达式 正则匹配
     */
    public regexMatchExpr?: string,
    /**
     * 默认值
     */
    public paramDefaultValue?: string,
    /**
     * 文本框最大长度限制
     */
    public paramMaxLength?: number,
    /**
     * s权限类型   1 开放  2 受控
     */
    public permission?: number,
    /**
     * 排序
     */
    public displayOrder?: number,
    /**
     * 属性显示名称   lang    zh_TW
     */
    public paramNameZh?: string,
    /**
     * 属性显示名称   lang    en_US
     */
    public paramNameEn?: string,
    public entityType?: SOURCE_TYPE
  ) {}
}

// 数据开放权限
export enum PERMISSION {
  OPEN,
  CONTROLLED
}

/**
 * 属性类型
 * 1.单行文本， 2.整数, 3.日期 4.时间 5.多行文本 6.受控词....
 */
export enum ATTR_TYPE {
  SINGLE_LINE_TEXT = 1,
  INTERGER,
  DATE,
  TIME,
  MULTILINE_TEXT,
  CONTROLLED
}

/**
 * 编目类型（1必填、2普通、3只读、4不可见、5受控词选项值）
 */
export enum PARAM_TYPE {
  MUST_READ = 1,
  COMMON,
  READ_ONLY,
  INVISIBLE,
  CONTROLLED_WORD_OPTION_VALUE
}

// 编目唯一性查询参数
export class ParamCodeQueryParams {
  constructor(public entityId?: number, public paramCode?: string, public paramId?: number) {}
}

export class DataType {
  constructor(public dateId?: number, public dataName?: string, public dateNameEn?: string) {}
}

export const AttrTypeList = [
  new DropDownOption('service.sourceList.config.form.propTypeItems.singleLineText', ATTR_TYPE.SINGLE_LINE_TEXT),
  new DropDownOption('service.sourceList.config.form.propTypeItems.integer', ATTR_TYPE.INTERGER),
  new DropDownOption('service.sourceList.config.form.propTypeItems.date', ATTR_TYPE.DATE),
  new DropDownOption('service.sourceList.config.form.propTypeItems.time', ATTR_TYPE.TIME),
  new DropDownOption('service.sourceList.config.form.propTypeItems.multiLineText', ATTR_TYPE.MULTILINE_TEXT),
  new DropDownOption('service.sourceList.config.form.propTypeItems.controlledTerms', ATTR_TYPE.CONTROLLED)
];

export const ParamTypeList = [
  new DropDownOption('service.sourceList.config.form.catalogTypeItems.required', PARAM_TYPE.MUST_READ),
  new DropDownOption('service.sourceList.config.form.catalogTypeItems.common', PARAM_TYPE.COMMON),
  new DropDownOption('service.sourceList.config.form.catalogTypeItems.readOnly', PARAM_TYPE.READ_ONLY),
  new DropDownOption('service.sourceList.config.form.catalogTypeItems.invisible', PARAM_TYPE.INVISIBLE),
  new DropDownOption(
    'service.sourceList.config.form.catalogTypeItems.controlledWordOptionValue',
    PARAM_TYPE.CONTROLLED_WORD_OPTION_VALUE
  )
];

export const PermissionList = [
  new DropDownOption('service.sourceList.config.form.dataOpenPermissionItems.open', PERMISSION.OPEN),
  new DropDownOption('service.sourceList.config.form.dataOpenPermissionItems.underControl', PERMISSION.CONTROLLED)
];
