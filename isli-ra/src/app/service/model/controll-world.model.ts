// 受控词管理搜索参数
export class ControllWordSearch {
  constructor(
    public keywords?: string // 受控词名称
  ) {}
}

export class ControllWord {
  constructor(
    public controlledId?: number,
    public controlledCode?: string,
    public controlledName?: string,
    public controlledNameZh?: string,
    public controlledNameEn?: string,
    public createTime?: string,
    public displayOrder?: number
  ) {}
}

export class ControllWordAttr {
  constructor(
    /**
     * 选项ID
     */
    public itemId?: number,
    /**
     * 受控词ID
     */
    public controlledId?: number,
    /**
     * 选项编码，选填
     */
    public code?: string,
    /**
     * 父级ID
     */
    public pId?: number,
    /**
     * 父级联路径，  用!_!分开 如（12!_!20!_!21）
     */
    public cascadePath?: string,
    /**
     * 状态 ： 0 正常    1删除
     */
    public status?: number,
    /**
     * 语种
     */
    public lang?: string,
    /**
     * 选项值
     */
    public value?: string,
    /**
     * 选项值 中文 语种 zh_TW
     */
    public valueZh?: string,
    /**
     * 选项值 英文 语种 en_US
     */
    public valueEn?: string,
    /**
     * 排序
     */
    public displayOrder?: number
  ) {}
}
