export class NodeI18n {
  constructor(
    public i18nId?: number,
    public navigationId?: number,
    public langCode?: string,
    public navigationName?: string,
    public navigationDesc?: string
  ) {}
}
export class TreeNode {
  constructor(
    /**
     * 树形结构ID
     */
    public id?: string,
    /**
     * 树形结构父ID
     */
    public pId?: string,
    /**
     * 树形结构名称
     */
    public name?: string,
    /**
     * 树形结构Title
     */
    public title?: string,
    /**
     * 当前节点是否是父节点
     */
    public isParent?: string,
    /**
     * 当前节点的类型
     */
    public tab?: string,
    public canDelete?: number,
    /**
     * 当前节点对应的URL资源地址
     */
    public file?: string,
    /**
     * 当前节点是否被选中，默认未被选中
     */
    public checked?: boolean,
    public chkDisabled?: boolean,
    public nocheck?: boolean,
    public level?: number,
    public navigationI18ns?: Array<NodeI18n>
  ) {}
}

export class NavigationNode {
  constructor(
    /**
     * 导航ID
     */
    public navigationId?: number,
    /**
     * 本导航ID的父亲ID
     */
    public parentId?: number,
    /**
     * 菜单类型（内容信息C/列表信息L）
     */
    public menuType?: string,
    /**
     * 排列序列号;
     */
    public menuSeq?: number,
    /**
     * 表示此节点有子节点,[menu_type含义无效]。（1是/0否[默认]）
     */
    public isLinker?: number,
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
     * 导航菜单的i18n属性
     */
    public navigationI18n?: NodeI18n,
    public navigationI18ns?: Array<NodeI18n>
  ) {}
}
