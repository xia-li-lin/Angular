export class MessageManager {
  constructor(
    public tidingsId?: number,
    public tidingsSeqId?: number, // 序列主键 - 使用uuid来使用充当唯一
    public sendObject?: string, // 发送对象：特指sp的申请用户，关联字段的是sp用户表：sp_info的sp_id,以逗号为分隔符，
    public tidingsTheme?: string, // 消息主题
    public content?: string, // 消息内容
    public textLinkName?: string, // 文字链接名称
    public linkUrl?: string, // 链接地址
    public navigationId?: number, // 导航ID,
    public langCode?: string, // 语言代码
    public isRead?: number, // 记录是否已读过（1是/0否）
    public updateCount?: number, // 更新次数（乐观锁）
    public updaterId?: number, // 更新者ID
    public updateDatetime?: string, // 更新时间
    public creatorId?: number, // 创建者ID
    public createDatetime?: string, // 创建时间,
    public spInfoList?: Array<string>, // SP用户对象集合,
    public spNames?: string, // SP用户名称集合
    public fileList?: any,
    public spreadFlag?: boolean
  ) {}
}

export class MessageSearch {
  constructor(
    public startTime?: string,
    public endTime?: string,
    public tidingsTheme?: string, // 主题
    public sendObject?: string // 发送对象：特指sp的申请用户，关联字段的是sp用户表：SPAccount的spEmail,以逗号为分隔符，
  ) {}
}

export class SPAccount {
  constructor(
    public spId?: string,
    public unificationId?: string,
    public spLinkman?: string, // 联系人
    public spEmail?: string, // 账户邮箱
    public linkmanEmail?: string, // 联系人邮箱
    public orgName?: string // 机构：机构名称／企业：企业名称/个人：姓名
  ) {}
}
