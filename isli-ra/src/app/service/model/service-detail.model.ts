// 服务表单
export class ServiceDetailData {
    constructor(
        public cn?: ServiceForm,
        public en?: ServiceForm
    ) { }
}

// 服务表单
export class ServiceForm {
    constructor(
        public id?: string,                      // id
        public services?: string,                // 服务
        public serviceCode?: string,             // 服务编码
        public associationType?: Array<string>,  // 关联类型
        public associatedFieldLength?: number,   // 关联字段长度
        public associatedFieldSegments?: string, // 关联字段分段
        public serviceDescDoc?: string,          // 服务说明文件
        public serviceBrie?: string,             // 服务简介
        public sourceType?: string,              // 源类型
        public targetType?: string,              // 目标类型
        public serviceDescDocUrl?: string,       // 服务说明文件下载地址
        public fieldSegments?: any,              // 关联字段分段下的字段
        public serviceAssociationTarget?: string // 服务关联目标
    ) { }
}
