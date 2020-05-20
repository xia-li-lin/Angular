import { DropDownOption } from './common.model';

// export class AccountListObj {
//     constructor(
//         public username?: string,          // 用戶名
//         public jobNumber?: string,         // 工號
//         public roleType?: string,          // 角色類型
//         public name?: string,              // 姓名
//         public phone?: string,             // 聯系電話
//         public email?: string,             // 聯系郵箱
//         public addTime?: string,           // 新增時間
//         public stopTime?: string,          // 停用時間
//         public status?: string,            // 狀態
//     ) { }
// }

export const TelephonePreArray = [
  new DropDownOption('common.china', '86'),
  new DropDownOption('common.hongkong', '852'),
  new DropDownOption('common.macao', '853'),
  new DropDownOption('common.taiwan', '886')
];

export class AccountUserDetailsObj {
  constructor(
    public adminId?: string,
    public confirmPassword?: string,
    public createTime?: string,
    public creatorId?: string,
    public credentialsSalt?: string,
    public email?: string,
    public forbiddenTime?: string,
    public isDeleted?: string,
    public jobNo?: string,
    public mobile?: string,
    public mobileType?: string,
    public name?: string,
    public password?: string,
    public passwordEffectiveTime?: string,
    public position?: string,
    public roleId?: string,
    public roleName?: string,
    public roleNames?: string,
    public salt?: string,
    public sex?: string,
    public status?: string,
    public tel?: string,
    public telArea?: string,
    public telExt?: string,
    public telNumber?: string,
    public telType?: string,
    public updateCount?: string,
    public updateTime?: string,
    public updaterId?: string,
    public username?: string,
    public telephone?: any
  ) {}
}

export class AccountListQueryObj {
  constructor(public pageNo: number = 1, public pageSize: number = 10, public orderBy: string = 'asc') {}
}
