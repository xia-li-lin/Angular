export class SystemLog {
  constructor(
    /**
     * 主键
     */
    public id?: number,
    /**
     * 操作人员编号
     */
    public employeeAccount?: string,
    /**
     * 操作人员姓名
     */
    public employeeName?: string,
    /**
     * 访问者IP
     */
    public accessIp?: string,
    /**
     * 操作动作编码（事件）
     */
    public action?: string,
    /**
     * 操作动作描述
     */
    public actionDesc?: string,
    /**
     * 角色code
     */
    public roleCode?: string,
    /**
     * 角色名
     */
    public roleName?: string,
    /**
     * 处理结果
     */
    public result?: string,
    public createDate?: string
  ) {}
}

export class SystemLogSearch {
  constructor(
    public startTime?: string,
    public endTime?: string,
    public employeeAccount?: string,
    public roleCode?: string
  ) {}
}
