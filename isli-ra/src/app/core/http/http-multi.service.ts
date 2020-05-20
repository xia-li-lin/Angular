import { Injectable } from '@angular/core';

import { RequestModel, ResponseModel, ParamType, HTTP_HOOKS } from './http.type';
import { HttpResponse } from './http-response';
import { HttpHookService } from './http-hook.service';
import { IHttpResponseConvert } from './http-respone-convert.service';
import { IHttpHeaderService } from './http-header.service';
import { HttpResponse as HttpClientResponse, HttpClient, HttpEventType } from '@angular/common/http';
import { HttpJson } from './http-json';

@Injectable()
export class HttpMultiService extends HttpJson {
  constructor(
    http: HttpClient,
    httpResponseConvertServ: IHttpResponseConvert,
    httpHeaderServ: IHttpHeaderService,
    httpHook: HttpHookService
  ) {
    super(http, httpResponseConvertServ, httpHeaderServ, httpHook);
    this.headers = {};
  }

  public makeHttpRequest(requstModel: RequestModel, httpResponse: HttpResponse<any>) {
    console.log(this.headers);
    this.httpHook.runHttpHook(HTTP_HOOKS.HTTP_BEGIN, requstModel);
    if (httpResponse.handleHttpBegin()) {
      httpResponse.handleHttpEnd();
      this.httpHook.runHttpHook(HTTP_HOOKS.HTTP_END, requstModel);
      return false;
    }
    this.getHeader(requstModel).then((headers) => {
      this.http
        .request(requstModel.method, requstModel.url, {
          headers,
          responseType: 'json',
          body: requstModel.body,
          params: requstModel.queryParams,
          observe: 'events',
          reportProgress: true
        })
        .subscribe(
          (response: any) => {
            if (response.type === HttpEventType.UploadProgress) {
              httpResponse.handleProcess(response.loaded, response.total);
            } else if (response instanceof HttpClientResponse) {
              this.httpHeaderServ.setHeader(response.headers);
              const resp: ResponseModel<any> = this.httpResponseConvertServ.convertHttpResponse(response.body);
              resp.endTime = Date.now();
              resp.castTime = resp.endTime - requstModel.beginTime;
              resp.success = this.httpResponseConvertServ.checkHttpResponseSuccess(resp);
              if (resp.success) {
                this.httpHook.runHttpHook(HTTP_HOOKS.HTTP_SUCCESS, requstModel, resp);
                httpResponse.handlesuccess(resp);
              } else {
                this.httpHook.runHttpHook(HTTP_HOOKS.HTTP_FALIES, requstModel, resp);
                httpResponse.handleFailed(resp);
              }
              httpResponse.handleHttpEnd();
              this.httpHook.runHttpHook(HTTP_HOOKS.HTTP_END, requstModel, resp);
            }
          },
          (error) => {
            httpResponse.handleError(error);
            httpResponse.handleHttpEnd();
            this.httpHook.runHttpHook(HTTP_HOOKS.HTTP_END, requstModel);
          }
        );
    });
    return true;
  }
}
