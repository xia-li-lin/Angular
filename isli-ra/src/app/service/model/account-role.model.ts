export class AccountRole {
  constructor(
    public adminCount?: number, // 角色下账号数量
    public areaId?: number, // 区域ID
    public canOperation?: boolean, // 角色能否被删除修改等操作
    public creatorId?: number,
    public createDatetime?: string, // 创建时间
    public description?: string, // 描述
    public forbiddenDatetime?: string,
    public isDeleted?: number,
    public roleId?: number,
    public roleIdentity?: string,
    public roleName?: string,
    public roleStatus?: number,
    public updaterId?: number,
    public updateCount?: number,
    public updateDatetime?: string,
    public langCode?: string
  ) {}
}
export class AccountRoleAdd {
  constructor(
    public areaId?: number, // 区域ID
    public roleName?: string,
    public description?: string, // 描述
    public roleId?: number,
    public langCode?: string,
    public id?: string
  ) {}
}
export class RolePermission {
  constructor(
    public id?: string,
    public checked?: boolean, // true 具有权限，false 无权限
    public isParent?: boolean,
    public pId?: string,
    public name?: string
  ) {}
}

export class Area {
  constructor(
    public areaId?: number,
    public areaDesc?: string,
    public areaDescEn?: string,
    public areaDescTw?: string
  ) {}
}
