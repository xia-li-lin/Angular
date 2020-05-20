export class Question {
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
     * 回答内容
     */
    public replyContent?: string,
    /**
     * 状态0：显示 1：隐藏
     */
    public questionStatus?: number,
    /**
     * 编辑者
     */
    public editor?: string
  ) {}
}

export class QuestionSearch {
  constructor(
    public startTime?: string,
    public endTime?: string,
    public title?: string,
    public questionStatus?: number,
    public langCode?: string
  ) {}
}
