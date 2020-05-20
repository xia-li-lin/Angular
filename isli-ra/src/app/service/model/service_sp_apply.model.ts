export class ServiceSpApplySearch {
  constructor(
    public startTime?: string,
    public endTime?: string,
    public spId?: string, // 服务提供商
    public serviceNameId?: string // 服务
  ) {}
}

export class ServiceName {
  constructor(public serviceNameId?: string, public serviceName?: string, public serviceNameEn?: string) {}
}

export class SpService {
  constructor(public spId: string, public orgName: string, public email: string) {}
}

export class ServiceSpApply {
  constructor(
    public serviceName: string,
    public spName: string,
    public serviceNameSwf: string,
    public createDatetime: string,
    public spId: string,
    public title: string
  ) {}
}
