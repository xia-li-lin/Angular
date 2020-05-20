// 服务 - 请求参数
export class ServiceSearch {
  constructor(
    public dateStart?: string, // 创建时间
    public dateEnd?: string,
    public serviceCodeZh?: string, // 服务编码
    public serviceNameZh?: string, // 服务
    public relevanceTypeNameZh?: string // 关联类型
  ) {}
}

export class ServiceInfo {
  constructor(
    /**
     * ID
     */
    public serviceInfoId?: string,
    /**
     * 服务名称
     */
    public serviceNameZh?: string,
    /**
     * 服务编码
     */
    public serviceCodeZh?: string,
    /**
     * LOGO
     */
    public serviceLogoZh?: string,
    public serviceLogoFileName?: string,
    public serviceLogoFilePath?: string,
    /**
     * 关联类型
     */
    public relevanceTypeZh?: string,
    /**
     * 关联类型名称
     */
    public relevanceTypeNameZh?: string,
    /**
     * 关联字段长度
     */
    public relevanceLengthZh?: number,
    /**
     * 关联字段分段数字
     */
    public relevanceNumZh?: number,
    /**
     * 关联字段分段
     */
    public relevanceSubsectionZh?: string,
    /**
     * 服务说明
     */
    public serviceWordUrlZh?: string,
    /**
     * doc转pdf
     */
    public serviceWordSwf?: string,
    public serviceWordUrlFileName?: string,
    /**
     * 服务描述
     */
    public descriptionZh?: string,
    /**
     * 服务名称(英文)
     */
    public serviceNameEn?: string,
    /**
     * 服务编码(英文)
     */
    public serviceCodeEn?: string,
    /**
     * LOGO(英文)
     */
    public serviceLogoEn?: string,
    /**
     * 关联类型(英文)
     */
    public relevanceTypeEn?: string,
    /**
     * 关联类型名称(英文)
     */
    public relevanceTypeNameEn?: string,
    /**
     * 关联字段长度(英文)
     */
    public relevanceLengthEn?: number,
    /**
     * 关联字段分段数字(英文)
     */
    public relevanceNumEn?: number,
    /**
     * 关联字段分段(英文)
     */
    public relevanceSubsectionEn?: string,
    /**
     * 服务说明(英文)
     */
    public serviceWordUrlEn?: string,
    /**
     * doc转pdf
     */
    public serviceWordSwfEn?: string,
    public serviceWordUrlFileNameEn?: string,
    /**
     * 服务描述(英文)
     */
    public descriptionEn?: string,
    /**
     * 是否有效，Y有效，N无效
     */
    public enabledFlag?: string,
    /**
     * 更新时间
     */
    public createDateTime?: string,
    /**
     * 更新时间
     */
    public updateDateTime?: string,
    /**
     * 每次发放ISLI编码数量
     */
    public islicodeCount?: number,
    // 每次发放ISLI编码数量(英文)
    public islicodeCountEn?: number,
    public sourceName?: string,
    public sourceNameEn?: string,
    public targetName?: string,
    public targetNameEn?: string,
    public relevanceSourceIds?: string,
    public relevanceTargetIds?: string,
    public syncTime?: string,
    public uploadFileUuid?: string,
    public uploadFileUuidEn?: string,
    public spId?: string,
    public scId?: string,
    public spTotal?: number,
    public serviceInfoIds?: string,
    public langCode?: string,
    /**
     * 服务关联目标
     */
    public targetEntityType?: string | number,
    public targetEntityTypeNameEn?: string,
    public targetEntityTypeNameZh?: string
  ) {}
}

export class ServiceListFormZh {
  constructor(
    public serviceInfoId?: string, // ID
    public serviceNameZh?: string, // 服务名称
    public serviceCodeZh?: string, // 服务编码
    public relevanceTypeZh?: string, // 关联类型
    public targetEntityType?: string | number, // 关联目标
    public relevanceLengthZh?: number, // 关联字段长度
    public relevanceNumZh?: number, // 关联字段分段数字
    public relevanceSubsectionZh?: string | any, // 关联字段分段
    public serviceWordUrlZh?: string, // 服务说明文件
    public serviceWordUrlFileName?: string, // 服务说明文件名称
    public descriptionZh?: string // 服务描述
  ) {}
}

export class ServiceListFormEn {
  constructor(
    public serviceInfoId?: string, // ID
    public serviceNameEn?: string, // 服务名称
    public serviceCodeEn?: string, // 服务编码
    public relevanceTypeEn?: string, // 关联类型
    public targetEntityType?: string | number, // 关联目标
    public relevanceLengthEn?: number, // 关联字段长度
    public relevanceNumEn?: number, // 关联字段分段数字
    public relevanceSubsectionEn?: string | any, // 关联字段分段
    public serviceWordUrlEn?: string, // 服务说明文件地址
    public serviceWordUrlFileNameEn?: string, // 服务说明文件名称
    public descriptionEn?: string // 服务描述
  ) {}
}
