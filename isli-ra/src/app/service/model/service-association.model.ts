export class EntityTypeInfo {
  constructor(
    /**
     * ID
     */
    public entityTypeId?: string,
    /**
     * 实体类型名称
     */
    public entityTypeNameZh?: string,
    /**
     * 行业分类
     */
    public industryTypeZh?: string,
    public industryTypeNameZh?: string,
    /**
     * 描述
     */
    public descriptionZh?: string,
    /**
     * 实体类型名称(英文)
     */
    public entityTypeNameEn?: string,
    /**
     * 行业分类(英文)
     */
    public industryTypeEn?: string,
    public industryTypeNameEn?: string,
    /**
     * 描述(英文)
     */
    public descriptionEn?: string,
    /**
     *  Y正常和N禁用
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
    public zhNames?: string,
    public enNames?: string,
    public ids?: string,
    // 编码
    public langCode?: string
  ) {}
}

export class RelevanceTypeInfo {
  constructor(
    /**
     * ID
     */
    public relevanceTypeId?: string,
    /**
     * 关联类型名称
     */
    public relevanceTypeNameZh?: string,
    /**
     * 源类型
     */
    public sourceTypeZh?: string,
    public sourceTypeNameZh?: string,
    public sourceTypeNameEn?: string,
    /**
     * 目标类型
     */
    public targetTypeZh?: string,
    public targetTypeNameZh?: string,
    public targetTypeNameEn?: string,
    /**
     * 描述
     */
    public descriptionZh?: string,
    /**
     * 关联类型名称(英文)
     */
    public relevanceTypeNameEn?: string,
    /**
     * 源类型(英文)
     */
    public sourceTypeEn?: string,
    /**
     * 目标类型(英文)
     */
    public targetTypeEn?: string,
    /**
     * 描述(英文)
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
    public updateDateTime?: string,
    public zhNames?: string,
    public enNames?: string,
    public ids?: string,
    public sourceIds?: string,
    public targetIds?: string,
    public sourceName?: string,
    public targetName?: string,
    // 编码
    public langCode?: string
  ) {}
}

export class AssicuationSearch {
  constructor(
    public dateStart?: string,
    public dateEnd?: string,
    /**
     * 是否有效，Y有效，N无效
     */
    public enabledFlag?: string,
    public sourceTypeEn?: string, // 源类型
    public targetTypeEn?: string, // 目标类型
    public relevanceTypeNameZh?: string // 关联类型
  ) {}
}
