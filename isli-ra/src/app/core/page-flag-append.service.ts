import { Injectable } from '@angular/core';
import { HttpHookService, HTTP_HOOKS, RequestModel } from './http';

@Injectable({ providedIn: 'root' })
export class PageFlagAppendService {
  constructor(private httpHook: HttpHookService) {
    httpHook.registerHttpHook(HTTP_HOOKS.HTTP_BEGIN, (req: RequestModel) => {
      req.queryParams = req.queryParams || {};
      if (req.queryParams.pageNo || req.queryParams.pageIndex) {
        req.queryParams._PAGINATION_FLAG_ = '_PAGINATION_REQUIRED_';
      }
      // if (req.queryParams.pageIndex) {
      //   req.queryParams.pageNo = req.queryParams.pageIndex;
      // }
      // if (req.queryParams.pageRows) {
      //   req.queryParams.pageSize = req.queryParams.pageRows;
      // }
    });
  }
}
