import { Injectable } from '@angular/core';
import { HttpJson, HttpResponse } from 'src/app/core';
import { PageSearch, PaginationResult, ThresholdSearch, Threshold } from '../model';

const HTTP_GET_THRESHOLD_LIST = '/isli/irms/manage-linkcode/base/thresholdManage/v1/thresholds';
const HTTP_POST_THRESHOLD_UPDATE = '/isli/irms/manage-linkcode/base/thresholdManage/v1/updateThreshold';

@Injectable({ providedIn: 'root' })
export class ThresholdService {
  constructor(private http: HttpJson) {}

  getThresholdList(search: ThresholdSearch, page: PageSearch): HttpResponse<PaginationResult<Threshold>> {
    return this.http.get(HTTP_GET_THRESHOLD_LIST, {}, Object.assign({}, search, page));
  }

  updateThreshold(threshold: Threshold) {
    return this.http.post(HTTP_POST_THRESHOLD_UPDATE, {}, {}, threshold);
  }
}
