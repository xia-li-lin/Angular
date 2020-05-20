// import { Response, ResponseOptions } from '@angular/http';

// import { HttpJson } from './http-json';
import { RequestModel, ResponseModel, HTTP_HOOKS } from './http.type';
import { HttpHookService } from './http-hook.service';

export type HttpResFunc<T> = (res: ResponseModel<T>, req?: any, result?: any, error?: any) => boolean | any;
export type HttpReqFunc = (req: RequestModel) => boolean | any;
export type processFunc = (current: number, total: number) => any;
// 此类是为了方便http调用, 从而对Promise增加了一层封装
export class HttpResponse<T> {
  public response: ResponseModel<T>;

  private beforFunc: Array<HttpReqFunc> = [];
  private afterFunc: Array<HttpResFunc<T>> = [];
  private successFunc: Array<HttpResFunc<T>> = [];
  private errorHander: Array<HttpResFunc<T>> = [];
  private failHander: Array<HttpResFunc<T>> = [];
  private translateHandler: (res: any) => any;
  private processFunc: Array<processFunc> = [];

  private delayPromise: Promise<any>;
  private delayFunc;
  // private executePromiseResolve;
  // private executePromiseReject;
  private executePromise: Promise<RequestModel>;
  private noReq = false; // 不发送http请求标志
  private excuteResult: any = false;

  constructor(
    private http,
    private request: RequestModel,
    private httpHook: HttpHookService,
    cacheRes?: ResponseModel<T>
  ) {
    this.executePromise = new Promise((resolve) => {
      this.afterFunc.push(() => {
        resolve(this.excuteResult);
      });
    });
    this.response = cacheRes;
    Promise.resolve(null).then(() => {
      if (this.noReq) {
        return;
      }
      if (this.request && !this.response) {
        this.requestHttp();
      } else {
        this.makeCacheResponse();
      }
    });
    this.executePromise.then((result) => {
      console.log('http execute over: ', result, request);
      return result;
    });
  }

  private requestHttp() {
    if (this.delayPromise) {
      this.delayPromise.then((data) => {
        if (this.delayFunc) {
          this.delayFunc(data, this.request);
        }
        this.http.makeHttpRequest(this.request, this);
      });
    } else {
      this.http.makeHttpRequest(this.request, this);
    }
  }

  public makeCacheResponse(cacheRes?: ResponseModel<T>) {
    if (cacheRes) {
      this.response = cacheRes;
    }
    if (this.response && this.response.success) {
      let result;
      for (const succFunc of this.successFunc) {
        result = succFunc(this.response, this.request, result);
        if (result === false) {
          break;
        }
      }
      this.excuteResult = result === undefined ? true : result || true;
    } else {
      this.handleFailed(this.response);
    }
    this.handleHttpEnd();
  }

  setNoReq() {
    this.noReq = true;
  }

  before(func: HttpReqFunc) {
    if (typeof func !== 'function') {
      return;
    }
    if (
      this.beforFunc.findIndex((value) => {
        return value === func;
      }) !== -1
    ) {
      return;
    }
    this.beforFunc.push(func);
    return this;
  }

  after(func: HttpResFunc<T>) {
    if (typeof func !== 'function') {
      return;
    }
    if (
      this.afterFunc.findIndex((value) => {
        return value === func;
      }) !== -1
    ) {
      return;
    }
    this.afterFunc.push(func);
    return this;
  }

  error(func: HttpResFunc<T>) {
    if (typeof func !== 'function') {
      return;
    }
    if (
      this.errorHander.findIndex((value) => {
        return value === func;
      }) !== -1
    ) {
      return;
    }
    this.errorHander.push(func);
    return this;
  }

  process(func: processFunc) {
    if (typeof func !== 'function') {
      return;
    }
    if (
      this.processFunc.findIndex((value) => {
        return value === func;
      }) !== -1
    ) {
      return;
    }
    this.processFunc.push(func);
    return this;
  }

  public delayProcess(func: HttpResFunc<T>) {
    this.delayFunc = func;
    return this;
  }

  success(func: HttpResFunc<T>): HttpResponse<T> {
    if (typeof func !== 'function') {
      return;
    }
    if (
      this.successFunc.findIndex((value) => {
        return value === func;
      }) !== -1
    ) {
      return;
    }
    this.successFunc.push(func);
    return this;
  }

  failed(func: HttpResFunc<T>) {
    if (typeof func !== 'function') {
      return;
    }
    if (
      this.failHander.findIndex((value) => {
        return value === func;
      }) !== -1
    ) {
      return;
    }
    this.failHander.push(func);
    return this;
  }

  translate(func: (data: any) => any) {
    if (typeof func !== 'function') {
      return;
    }
    this.translateHandler = func;
    return this;
  }

  delay(delay: Promise<any>) {
    this.delayPromise = delay;
    return this;
  }

  handleHttpBegin() {
    for (const beforFunc of this.beforFunc) {
      if (beforFunc(this.request)) {
        return true;
      }
    }
    return false;
  }

  handlesuccess(resp: ResponseModel<T>) {
    this.response = resp;
    if (this.translateHandler) {
      this.response.data = this.translateHandler(resp.data);
    }
    let result;
    for (const succFunc of this.successFunc) {
      result = succFunc(this.response, this.request, result);
      if (result === false) {
        break;
      }
    }
    this.excuteResult = result === undefined ? true : result || true;
    return this;
  }

  handleFailed(resp: ResponseModel<T>) {
    this.response = resp;
    let result = null;
    if (this.failHander.length) {
      this.failHander.forEach((failFunc) => {
        result = failFunc(this.response, this.request, result);
        if (result === false) {
          return true;
        }
      });
      this.excuteResult = result === undefined ? false : result || false;
    } else {
      this.handleError('http result code failed');
    }

    return this;
  }

  handleError(error) {
    let result;
    if (this.errorHander.length) {
      this.errorHander.forEach((errorFunc) => {
        result = errorFunc(this.response, this.request, error, result);
      });
      this.excuteResult = result === undefined ? false : result || false;
    } else {
      // console.error('you should set errorhandler');
      // console.error(JSON.stringify(this.request));
      // console.error(error || null);
    }
    return this;
  }

  handleProcess(current: number, total: number) {
    for (const func of this.processFunc) {
      func(current, total);
    }
  }

  handleHttpEnd() {
    this.afterFunc.forEach((afterFunc) => {
      afterFunc(this.response, this.request);
    });
  }

  toPromise(): Promise<any> {
    return this.executePromise;
  }

  clone(newRes: HttpResponse<T>): HttpResponse<T> {
    this.beforFunc.forEach((func) => {
      newRes.before(func);
    });
    this.successFunc.forEach((func) => {
      newRes.success(func);
    });
    newRes.translate(this.translateHandler);
    this.failHander.forEach((func) => {
      newRes.failed(func);
    });
    this.errorHander.forEach((func) => {
      newRes.error(func);
    });
    this.afterFunc.forEach((func) => {
      newRes.after(func);
    });
    return newRes;
  }
}
