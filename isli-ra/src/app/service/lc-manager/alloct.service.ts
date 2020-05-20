import { Injectable } from '@angular/core';
import { HttpJson, HttpResponse } from 'src/app/core';
import { AlloctSearch, PageSearch, PaginationResult, Alloct } from '../model';

const HTTP_GET_ALLOCT_LIST = '/isli/irms/manage-linkcode/base/thresholdAllotRecords/v1/allotRecords';

@Injectable({ providedIn: 'root' })
export class AlloctService {
  constructor(private http: HttpJson) {}

  getAlloctList(search: AlloctSearch, page: PageSearch): HttpResponse<PaginationResult<Alloct>> {
    return this.http.get(HTTP_GET_ALLOCT_LIST, {}, Object.assign({}, search, page));
  }
}
