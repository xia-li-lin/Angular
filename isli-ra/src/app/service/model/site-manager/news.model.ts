class Language {
  constructor(public langCode?: string) {}
}

export class NewsDetail {
  constructor(
    /**
     * 列表信息
     */
    public newsId?: number,
    /**
     * 新闻概要
     */
    public newsSummary?: string,
    /**
     * 新闻详细信息（HTML格式）
     */
    public newsDetail?: string,
    /**
     * 是否隐藏（1是/0否）
     */
    public isHided?: number,
    /**
     * 记录是否已删除（1是/0否） ，不显示已删除数据
     */
    public isDeleted?: number,
    /**
     * 更新次数
     */
    public updateCount?: number,
    /**
     * 更新者ID
     */
    public updaterId?: number,
    /**
     * 更新时间
     */
    public updateDatetime?: string,
    /**
     * 创建者ID
     */
    public creatorId?: number,
    /**
     * 创建时间
     */
    public createDatetime?: string
  ) {}
}

export class NavigationI18n {
  constructor(
    /**
     * 主键
     */
    public i18nId?: number,
    /**
     * 外键（pl_navigation.id）
     */
    public navigationId?: number,
    /**
     * 语言支持（pl_language.lang_code）
     */
    public langCode?: string,
    /**
     * 菜单名称，页面中需要显示的文字
     */
    public navigationName?: string,
    /**
     * 此菜单的语言，功能描述
     */
    public navigationDesc?: string,
    /**
     * 是否隐藏（1是/0否）
     */
    public isHided?: number,
    /**
     * 记录是否已删除（1是/0否） ，不显示已删除数据
     */
    public isDeleted?: number,
    /**
     * 更新次数
     */
    public updateCount?: number,
    /**
     * 更新者ID
     */
    public updaterId?: number,
    /**
     * 更新时间
     */
    public updateDatetime?: string,
    /**
     * 创建者ID
     */
    public creatorId?: number,
    /**
     * 创建时间
     */
    public createDatetime?: string
  ) {}
}

export class News {
  constructor(
    /**
     * 主键
     */
    public newsId?: number,
    /**
     * 导航ID
     */
    public navigationId?: number,
    /**
     * 语言编码
     */
    public language?: Language,
    /**
     * 标题
     */
    public title?: string,
    /**
     * 作者
     */
    public authorName?: string,
    /**
     * 新闻显示优先级别，数字越大越优先显示
     */
    public priorityLevel?: number,
    /**
     * 是否隐藏(1是/0否)
     */
    public isHided?: number,
    /**
     * 是否删除(1是/0否)
     */
    public isDeleted?: number,
    /**
     * 更新次数
     */
    public updateCount?: number,
    /**
     * 更新者的ID
     */
    public updaterId?: number,
    /**
     * 更新时间
     */
    public updateDateTime?: string,
    /**
     * 创建者ID
     */
    public creatorId?: number,
    /**
     * 创建时间
     */
    public createDateTime?: string,
    /**
     * 附件
     */
    public filePaths?: string,
    /**
     * 新闻详情
     */
    public newsDetail?: NewsDetail,
    public navI18n?: NavigationI18n
  ) {}
}

export class NewsNavigation {
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
     * 是否能删除(1是/0否)
     */
    public canDelete?: number,
    /**
     * 是否隐藏（1是/0否）
     */
    public isHided?: number
  ) {}
}

export class NewsSearch {
  constructor(
    public startTime?: string,
    public endTime?: string,
    public newsTitle?: string,
    public isHeaded?: number,
    public navigationId?: number,
    public langCode?: string
  ) {}
}

export class WebFile {
  constructor(
    public tid?: number,
    public menuId?: number, // 分类菜单ID_(t_web_menu)
    public itemId?: string, // 所属类ITEM id
    public createTime?: string, // 创建时间
    public fileName?: string,
    public fileUrl?: string, // 附件下载地址
    public langCode?: string
  ) {}
}
