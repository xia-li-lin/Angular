export class ServiceProduct {
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
     * 产品内容介绍
     */
    public content?: string,
    /**
     * 公司简介
     */
    public companyContent?: string,
    /**
     * 应用示例
     */
    public spplicationExampleContent?: string,
    /**
     * 状态1：显示 2：隐藏
     */
    public sppStatus?: number,
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
     * 应用领域
     */
    public applicationField?: string,
    /**
     * 应用服务方案
     */
    public applicationServicePlan?: string,
    /**
     * 应用服务说明
     */
    public applicationServiceDescription?: string,
    /**
     * 附件路径:多个附件用逗号隔开，用\|\|来分隔路径和名字
     */
    public filePaths?: string
  ) {}
}

export class ServiceProductSearch {
  constructor(
    public startTime?: string,
    public endTime?: string,
    public title?: string,
    public sppStatus?: number,
    public langCode?: string
  ) {}
}
