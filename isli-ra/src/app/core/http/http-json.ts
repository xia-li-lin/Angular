import { Injectable } from '@angular/core';

import { RequestModel, ResponseModel, ParamType, HTTP_HOOKS } from './http.type';
import { HttpResponse } from './http-response';
import { HttpHookService } from './http-hook.service';
import { HttpResponseCovert, IHttpResponseConvert } from './http-respone-convert.service';
import { HttpHeaderService, IHttpHeaderService } from './http-header.service';
import { HttpResponse as HttpClientResponse, HttpClient, HttpParams, HttpUrlEncodingCodec } from '@angular/common/http';

class CustomHttpParameterCodec extends HttpUrlEncodingCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }
}

@Injectable()
export class HttpJson {
  private context = '';
  protected headers: any = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-cache,no-store' };

  constructor(
    protected http: HttpClient,
    protected httpResponseConvertServ: IHttpResponseConvert,
    protected httpHeaderServ: IHttpHeaderService,
    protected httpHook: HttpHookService
  ) {}

  // delete 请求
  delete(url: string, urlParam: ParamType = {}, queryParams: ParamType = {}) {
    const request = new RequestModel(this.buildURL(url, urlParam), 'DELETE', urlParam, queryParams, {}, Date.now());
    return new HttpResponse<any>(this, request, this.httpHook);
  }

  // get请求
  get(url: string, urlParam: ParamType = {}, queryParams: ParamType = {}) {
    const request = new RequestModel(this.buildURL(url, urlParam), 'GET', urlParam, queryParams, {}, Date.now());
    return new HttpResponse<any>(this, request, this.httpHook);
  }

  // patch 请求
  patch(url: string, urlParam: ParamType = {}, queryParams: ParamType = {}, body: ParamType) {
    const request = new RequestModel(this.buildURL(url, urlParam), 'PATCH', urlParam, queryParams, body, Date.now());
    return new HttpResponse<any>(this, request, this.httpHook);
  }

  // post请求
  post(url: string, urlParam: ParamType = {}, queryParams: ParamType = {}, body: ParamType, headers?) {
    const request = new RequestModel(
      this.buildURL(url, urlParam),
      'POST',
      urlParam,
      queryParams,
      body,
      Date.now(),
      headers
    );
    return new HttpResponse<any>(this, request, this.httpHook);
  }

  // put请求
  put(url: string, urlParam: ParamType = {}, queryParams: ParamType = {}, body: ParamType) {
    const request = new RequestModel(this.buildURL(url, urlParam), 'PUT', urlParam, queryParams, body, Date.now());
    return new HttpResponse<any>(this, request, this.httpHook);
  }

  // options请求
  options(url: string, urlParam: ParamType = {}, queryParams: ParamType = {}) {
    const request = new RequestModel(this.buildURL(url, urlParam), 'OPTION', urlParam, queryParams, {}, Date.now());
    return new HttpResponse<any>(this, request, this.httpHook);
  }

  // 替换url中的参数, 要求参数以:开始
  public buildURL(url: string, urlParam: ParamType) {
    if (!url) {
      throw Error('url empty');
    }
    let newUrl = url.replace(/\/:([a-zA-Z\-_]+)/g, (match, p1) => {
      if (p1 in urlParam) {
        return '/' + encodeURIComponent(urlParam[p1]) || '';
      }
      throw Error(p1 + '  not match');
    });

    newUrl = newUrl.replace(/\/{([a-zA-Z\-_]+)}/g, (match, p1) => {
      if (p1 in urlParam) {
        return '/' + encodeURIComponent(urlParam[p1]) || '';
      }
      throw Error(p1 + '  not match');
    });
    return this.context + newUrl;
  }

  protected getHeader(requstModel: RequestModel): Promise<any> {
    const headers = this.httpHeaderServ.getHeader();
    if (headers instanceof Promise) {
      return headers.then((headerData) => {
        return Object.assign({}, this.headers, requstModel.headers || {}, headerData || {});
      });
    } else {
      return Promise.resolve(Object.assign({}, this.headers, requstModel.headers || {}, headers || {}));
    }
  }

  public formatParams(params): HttpParams {
    if (!params) {
      return new HttpParams({ encoder: new CustomHttpParameterCodec() });
    }
    let searchParms = new HttpParams({ encoder: new CustomHttpParameterCodec() });
    for (const name in params) {
      if (params[name] === undefined || params[name] === null || params[name] === '') {
        continue;
      }
      searchParms = searchParms.append(name, params[name]);
    }
    // searchParms = searchParms.append('__version', '' + new Date().getTime());
    return searchParms;
  }

  protected formatBody(body: any) {
    return body;
  }

  public makeHttpRequest(requstModel: RequestModel, httpResponse: HttpResponse<any>) {
    if (this.httpHook) {
      this.httpHook.runHttpHook(HTTP_HOOKS.HTTP_BEGIN, requstModel);
    }
    if (httpResponse.handleHttpBegin()) {
      httpResponse.handleHttpEnd();
      if (this.httpHook) {
        this.httpHook.runHttpHook(HTTP_HOOKS.HTTP_END, requstModel);
      }
      return false;
    }
    this.getHeader(requstModel).then((headers) => {
      this.http
        .request(requstModel.method, requstModel.url, {
          headers,
          responseType: 'json',
          body: this.formatBody(requstModel.body),
          params: this.formatParams(requstModel.queryParams),
          observe: 'response'
        })
        .subscribe(
          (response: HttpClientResponse<any>) => {
            try {
              if (response.url.indexOf('base/login') !== -1 && requstModel.url.split('/').pop() !== 'login') {
                if (this.httpHook) {
                  this.httpHook.runHttpHook(HTTP_HOOKS.HTTP_ERROR, requstModel, 401 as any);
                }
                httpResponse.handleError({ status: 401 });
                httpResponse.handleHttpEnd();
                return;
              }
              this.httpHeaderServ.setHeader(response.headers);
              const resp: ResponseModel<any> = this.httpResponseConvertServ.convertHttpResponse(response.body);
              resp.endTime = Date.now();
              resp.castTime = resp.endTime - requstModel.beginTime;
              resp.success = this.httpResponseConvertServ.checkHttpResponseSuccess(resp);
              if (resp.success) {
                if (this.httpHook) {
                  this.httpHook.runHttpHook(HTTP_HOOKS.HTTP_SUCCESS, requstModel, resp);
                }
                httpResponse.handlesuccess(resp);
              } else {
                if (this.httpHook) {
                  this.httpHook.runHttpHook(HTTP_HOOKS.HTTP_FALIES, requstModel, resp);
                }
                httpResponse.handleFailed(resp);
              }
              httpResponse.handleHttpEnd();
              if (this.httpHook) {
                this.httpHook.runHttpHook(HTTP_HOOKS.HTTP_END, requstModel, resp);
              }
            } catch (e) {
              console.error('some error func excute', e);
              httpResponse.handleError(e);
              httpResponse.handleHttpEnd();
            }
          },
          (error) => {
            if (this.httpHook) {
              this.httpHook.runHttpHook(HTTP_HOOKS.HTTP_ERROR, requstModel, error.status);
            }
            httpResponse.handleError(error);
            httpResponse.handleHttpEnd();
          }
        );
    });
    return true;
  }
}
