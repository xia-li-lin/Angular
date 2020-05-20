export enum USER_STATUS {
  NORMAIL = 1,
  FREEZE,
  DISABLE
}

export const userStatus = [
  { label: 'user.status.all', value: '' },
  {
    label: 'user.status.normal',
    value: USER_STATUS.NORMAIL
  },
  {
    label: 'user.status.forzen',
    value: USER_STATUS.FREEZE
  },
  {
    label: 'user.status.disable',
    value: USER_STATUS.DISABLE
  }
];

export enum USER_GROUP {
  ORGANIZATION = 1,
  PERSON
}

export const userGroups = [
  { label: 'user.groups.all', value: '' },
  {
    label: 'user.groups.organization',
    value: USER_GROUP.ORGANIZATION
  },
  {
    label: 'user.groups.personal',
    value: USER_GROUP.PERSON
  }
];

export class SPAccountSearch {
  constructor(
    public startTime?: string,
    public endTime?: string,
    public status?: number,
    public email?: string,
    public organizationTypeId?: string
  ) {}
}

export class LcAccountSearch {
  constructor(
    public name?: string,
    public regionCode?: string,
    public startTime?: string,
    public status?: number,
    public endTime?: string
  ) {}
}

export enum USER_OPERATOR {
  ENABLE,
  FREEZE,
  STOP
}
