export class Threshold {
  constructor(
    /**
     * 主键
     */
    public summaryId?: number,
    /**
     * 服务编码
     */
    public serviceCode?: string,
    /**
     * 服务名称
     */
    public serviceName?: string,
    /**
     * 预警值
     */
    public prewarningValue?: string,
    /**
     * 阈值
     */
    public thresholdValue?: number,
    /**
     * 关联编码已分配数量
     */
    public lcCount?: number,
    /**
     * 更改时间
     */
    public updateDatetime?: string,
    /**
     * 创建时间
     */
    public createDatetime?: string,
    public status?: number,
    public orgName?: string,
    public email?: string,
    public linkman?: string,
    public phone?: string,
    public mobile?: string,
    public linkmanPosition?: string,
    public linkmanEmail?: string,
    public contact?: string,
    public zip?: string,
    public spId?: string,
    public serviceProviderId?: string
  ) {}
}

export class ThresholdSearch {
  constructor(
    public startTime?: string,
    public endTime?: string,
    public serviceCode?: string,
    public serviceName?: string,
    public prewarningValueMin?: number,
    public prewarningValueMax?: number
  ) {}
}
