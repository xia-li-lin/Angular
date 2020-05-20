export class EmailTemplate {
  constructor(
    /**
     * 邮件模版ID
     */
    public emailTemplateId?: number,
    /**
     * 语言编码目前，只支持“EN_GB'/ZH_CH
     */
    public langCode?: string,
    /**
     * email的主题
     */
    public emailTitle?: string,
    /**
     * 邮件类型
     */
    public emailType?: string,
    /**
     * 邮件类型名称
     */
    public mailTypeName?: string,
    /**
     * 操作状态
     */
    public operatingStatus?: number,
    /**
     * 操作状态名称
     */
    public operatingStatusName?: string,
    /**
     * email模版正文
     */
    public emailTemplate?: string,
    /**
     * 使用场景备注
     */
    public marks?: string,
    /**
     * uuid
     */
    public uuid?: string,
    /**
     * 更新时间
     */
    public updateDateTime?: string,
    /**
     * 创建时间时间
     */
    public createDateTime?: string,
    public creatorName?: string,

  ) { }
}

export class EmailTemplateType {
  constructor(
    /**
     * 邮件类型ID
     */
    public mailTypeId?: number,
    /**
     * 邮件类型名称
     */
    public mailTypeName?: string,
    /**
     * 操作类型ID
     */
    public operatingStatusId?: number,
    /**
     * 操作类型名称
     */
    public operatingStatusName?: string,
    /**
     * 邮件类型语种
     */
    public mailLangCode?: string,
    /**
     * 操作类型语种
     */
    public operatingLangCode?: string
  ) { }
}

export class EmailTemplateOperatStatus {
  constructor(
    public operatingStatusId?: number,
    public operatingStatusName?: string,
    public operatingLangCode?: string
  ) { }
}
