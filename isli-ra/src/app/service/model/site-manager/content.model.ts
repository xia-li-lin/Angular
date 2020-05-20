export class ContentDetail {
  constructor(
    /**
     * 内容ID,content.id 对应，做了一个表的垂直切分
     */
    public contentId?: number,
    /**
     * 内容信息（HTML格式），最大65,535字符
     */
    public contentDetail?: string,
    /**
     * 是否隐藏（1是/0否）
     */
    public isHided?: number,
    /**
     * 更新时间
     */
    public updateDatetime?: string,
    /**
     * 创建时间
     */
    public createDatetime?: string
  ) {}
}

export class Content {
  constructor(
    /**
     * PK
     */
    public contentId?: number,
    /**
     * 导航ID
     */
    public navigationId?: number,
    /**
     * 语言代码 ,ISO语言代码(ISO-639)与国家代码(ISO-3166)
     */
    public langCode?: string,
    /**
     * 是否隐藏（1是/0否）
     */
    public isHided?: number,
    /**
     * 更新时间
     */
    public updateDatetime?: string,
    /**
     * 创建时间
     */
    public createDatetime?: string,
    /**
     * 查询时间起始时间
     */
    public startDateTime?: string,
    /**
     * 查询结束时间
     */
    public endDateTime?: string,
    /**
     * 内容实体详情
     */
    public contentDetail?: ContentDetail,
    /**
     * 所属导航名称
     */
    public navigationName?: string,
    /**
     * 语种名称
     */
    public langName?: string,
    /**
     * 搜索关键字
     */
    public keyWord?: string,
    /**
     * 内容管理列表查询标识
     */
    public contentListFlag?: string,
    /*
     * 附件
     */
    public filePaths?: string
  ) {}
}

export class ContentSearch {
  constructor(public startTime?: string, public endTime?: string, public keyWord?: string, public langCode?: string) {}
}
