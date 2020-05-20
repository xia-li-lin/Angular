export class WelcomeImage {
  constructor(
    /**
     * 图片ID
     */
    public imgId?: number,
    /**
     * 图片UUID
     */
    public imgUuid?: string,
    /**
     * 广告名称
     */
    public advertisementName?: string,
    /**
     * 广告链接地址
     */
    public urlAddress?: string,
    /**
     * 语言编码
     */
    public langCode?: string,
    /**
     * 是否默认
     */
    public isDefault?: boolean,
    /**
     * 更新时间
     */
    public updateDateTime?: string,
    /**
     * 创建时间
     */
    public createDateTime?: string,
    public url?: string,
    public imageName?: string,
    public sortNum?: string
  ) {}
}

export class Picture {
  constructor(
    public languageCode?: string,
    public languageName?: string,
    public navigationName?: string,
    public isDefault?: number,
    public images?: Array<WelcomeImage>
  ) {}
}
