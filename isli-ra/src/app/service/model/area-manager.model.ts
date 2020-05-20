export class Industry {
  constructor(public industryCode: string, public industryName?: string) {}
}

export class Block {
  constructor(
    public applicationCase?: string,
    public blockDesc?: string,
    public blockIndustryInfos?: Array<Industry>,
    public blockName?: string,
    public competentOrg?: string,
    public contactsName?: string,
    public contactsEmail?: string,
    public langCode?: string,
    public productDesc?: string,
    public regionCode?: string,
    public regionTitle?: string,
    public blockId?: string,
    public logoUrl?: string,
    public siteUrl?: string
  ) {}
}

export class BlockSearch {
  constructor(
    public blockName?: string,
    public status?: number,
    public startTime?: string,
    public endTime?: string,
    public serviceCode?: string
  ) {}
}

export class BlockService {
  constructor(
    public serviceId?: string,
    public blockId?: string,
    public serviceCode?: string,
    public serviceName?: string,
    public serviceProvider?: string,
    public createTime?: string,
    public updateTime?: string,
    public status?: number,
    public langCode?: string
  ) {}
}

export class BlockServiceSearch {
  constructor(
    public blockId?: string,
    public serviceCode?: string,
    public serviceProvider?: string,
    public serviceName?: string,
    public status?: number
  ) {}
}

export enum BLOCK_STATUS {
  ENABLE = 1,
  DISABLE
}

export const blockStatus = [
  {
    label: 'areaManager.status.all',
    value: ''
  },
  {
    label: 'areaManager.status.normal',
    value: BLOCK_STATUS.ENABLE
  },
  {
    label: 'areaManager.status.disabled',
    value: BLOCK_STATUS.DISABLE
  }
];
