export class Consulting {
  constructor(
    /**
     * 常见问题编号
     */
    public id?: number,
    /**
     * 语种
     */
    public langCode?: string,
    public langDesc?: string,
    /**
     * 导航ID
     */
    public navigationId?: number,
    /**
     * 标题
     */
    public title?: string,
    /**
     * 排序
     */
    public sort?: number,
    /**
     * 创建时间
     */
    public createTime?: string,
    /**
     * 修改时间
     */
    public updateTime?: string,
    /**
     * 应用内容
     */
    public consultingContent?: string,
    /**
     * 状态0：显示 1：隐藏
     */
    public consultingStatus?: number,
    /**
     * 编辑者
     */
    public editor?: string,
    /**
     * 缩略图
     */
    public thumbnailUrl?: string,
    /**
     * 图片UUID
     */
    public imgUuid?: string,
    /**
     * 摘要
     */
    public summary?: string,
    /**
     * 来源
     */
    public source?: string,
    /**
     * 附件路径:多个附件用逗号隔开，用\|\|来分隔路径和名字
     */
    public filePaths?: string,
    /**
     * 发布时间
     */
    public releaseDate?: string
  ) {}
}

export class ConsultingSearch {
  constructor(
    public startTime?: string,
    public endTime?: string,
    public order?: string,
    public orderSort?: string,
    public langCode?: string,
    public title?: string,
    public consultingStatus?: number
  ) {}
}

export class ConsultNav {
  constructor(
    public i18nId?: number,
    public navigationId?: number,
    public langCode?: string,
    public navigationName?: string,
    public navigationDesc?: string
  ) {}
}
