import { Injectable } from '@angular/core';

import { HttpResponse } from '@angular/common/http';
import { ResponseModel } from './http.type';

export abstract class IHttpResponseConvert {
  public abstract convertHttpResponse(response: any): ResponseModel<any>;
  public abstract checkHttpResponseSuccess(response: ResponseModel<any>): boolean;
}

@Injectable()
export class HttpResponseCovert extends IHttpResponseConvert {
  convertHttpResponse(response: any): ResponseModel<any> {
    if (response && response.returnObj) {
      response = response.returnObj;
    }
    if (response instanceof Array) {
      return new ResponseModel('00000000', '', response);
    } else if ('errorCode' in response || 'resultCode' in response) {
      return new ResponseModel(
        response.errorCode || response.resultCode,
        response.errorMessage || response.resultMsg,
        response.data === undefined ? {} : response.data
      );
    }
    return new ResponseModel('00000000', '', response);
  }

  checkHttpResponseSuccess(response: ResponseModel<any>) {
    return response.code === '00000000' || response.code === '000000';
  }
}
