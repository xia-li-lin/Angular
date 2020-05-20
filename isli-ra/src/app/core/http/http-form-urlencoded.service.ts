import { Injectable } from '@angular/core';
import { HttpJson } from './http-json';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IHttpResponseConvert } from './http-respone-convert.service';
import { IHttpHeaderService } from './http-header.service';
import { HttpHookService } from './http-hook.service';

class FormHttpParams {
  private params: HttpParams;
  constructor() {
    this.params = new HttpParams();
  }

  append(param: string, value: string | Array<any>) {
    if (value instanceof Array) {
      value.forEach((elem) => {
        this.append(param + '[]', elem);
      });
    } else if (typeof value === 'string') {
      this.params = this.params.append(param, value);
    } else {
      this.append(param, '' + value);
    }
  }

  toString() {
    return this.params.toString();
  }
}

@Injectable({ providedIn: 'root' })
export class HttpFormUrlencodedService extends HttpJson {
  constructor(
    protected http: HttpClient,
    protected httpResponseConvertServ: IHttpResponseConvert,
    protected httpHeaderServ: IHttpHeaderService,
    protected httpHook: HttpHookService
  ) {
    super(http, httpResponseConvertServ, httpHeaderServ, httpHook);
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Cache-Control': 'no-cache,no-store'
    };
  }

  formatBody(body) {
    if (body === null || body === '' || body === undefined) {
      return '';
    }
    if (typeof body === 'object') {
      const params = new FormHttpParams();
      Object.keys(body)
        .filter((key) => {
          return body[key] !== undefined && body[key] !== null && body[key] !== '';
        })
        .forEach((key) => {
          params.append(key, body[key]);
        });
      return params.toString();
    } else {
      console.warn('the body may be not allow');
      return '' + body;
    }
  }
}
