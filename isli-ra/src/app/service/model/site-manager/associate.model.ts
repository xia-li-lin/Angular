export class Associate {
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
     * 内容
     */
    public content?: string,
    /**
     * 状态1：显示 2：隐藏
     */
    public asStatus?: number,
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
     * 服务编码
     */
    public serviceCode?: string,
    /**
     * 发布时间
     */
    public release?: string,
    /**
     * 关联编码结构
     */
    public correlationCodingStructure?: string,
    /**
     * 附件路径:多个附件用逗号隔开，用\|\|来分隔路径和名字
     */
    public filePaths?: string
  ) {}
}

export class AssociateSearch {
  constructor(
    public startTime?: string,
    public endTime?: string,
    public title?: string,
    public langCode?: string,
    public asStatus?: number
  ) {}
}
