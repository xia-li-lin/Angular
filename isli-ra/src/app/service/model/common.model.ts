// 分页-请求参数
export class PageParams {
  constructor(
    public pageIndex: number = 1, // 当前页码
    public pageRows: number = 10 // 每页多少条数据
  ) {}
}

// 下拉框
export class DropDownOption {
  constructor(public label?: string, public value?: any) {}
}

// 公用类型
export interface CommonType {
  key: number;
  value: string;
}

export class PageSearch {
  constructor(public pageNo: number, public pageSize = 10) {}
}

export interface PaginationResult<T> {
  list: Array<T>;
  totalCount: number;
  pageNo: number;
  pageSize: number;
}

export interface DataStructureOuterLayer<T> {
  pageDataList: Array<T>;
  pageDataSize: number;
  pageIndex: number;
  pageSize: number;
}
