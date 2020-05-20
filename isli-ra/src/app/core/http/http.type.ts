export class HttpRequestConfig {
  constructor(public json) {}
}

export interface ParamType {
  [key: string]: any;
}

export class RequestModel {
  constructor(
    public url,
    public method: string,
    public urlParams?: ParamType | null | undefined,
    public queryParams?: ParamType | null | undefined,
    public body?: ParamType | null | undefined,
    public beginTime?: number,
    public headers?: any
  ) {}
}

export class ResponseModel<T> {
  constructor(
    public code?: string,
    public msg?: string,
    public data?: T,
    public response?: any,
    public endTime?: number,
    public castTime?: number,
    public success = false,
    public isCached = false
  ) {}
}

// http hook types
export enum HTTP_HOOKS {
  ADD_HEADER,
  HTTP_BEGIN,
  HTTP_SUCCESS,
  HTTP_FALIES,
  HTTP_ERROR,
  HTTP_END
}

export type HttpHookFunc = (req?: RequestModel, res?: any) => void;

export interface HttpHooks {
  [key: string]: Array<HttpHookFunc>;
}
