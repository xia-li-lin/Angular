export class AppExample {
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
    public exampleContent?: string,
    /**
     * 状态1：显示 2：隐藏
     */
    public applicationExampleStatus?: number,
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
     * 附件路径fxFlex.xs=""
     * fxFlexOrder.xs=""
     * fxFlexOffset.xs=""
     * fxFlexAlign.xs="start"
     * |fxFlexFill.${7|,xs,gt-xs,lt-sm,sm,gt-sm,lt-md,md,gt-md,lt-lg,lg,gt-lg,lt-xl,xl|}多个附件用逗号隔开，用\|\|来分隔
     * 径和名字
     */
    public filePaths?: string
  ) {}
}

export class AppExampleSearch {
  constructor(
    public startTime?: string,
    public endTime?: string,
    public title?: string,
    public langCode?: string,
    public applicationExampleStatus?: number
  ) {}
}
