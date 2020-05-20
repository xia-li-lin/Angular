export class Alloct {
  constructor(
    /**
     * 主键
     */
    public logId?: number,
    /**
     * 服务编码
     */
    public serviceCode?: string,
    /**
     * 关联编码起始
     */
    public linkCodeFrom?: string,
    /**
     * 关联编码终止
     */
    public linkCodeTo?: string,
    /**
     * 总共个数
     */
    public linkCodeCardinality?: string,
    /**
     * 分配日期
     */
    public allocateDatetime?: string,
    /**
     * 服务名称
     */
    public serviceName?: string,
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

export class AlloctSearch {
  constructor(
    public dateBegin?: string,
    public dateEnd?: string,
    public serviceCode?: string,
    public serviceName?: string
  ) {}
}
