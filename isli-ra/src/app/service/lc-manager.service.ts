import { Injectable } from '@angular/core';
import { HttpJson } from '../core';

const HTTP_GET_ALLOCT_LIST = 'HTTP_GET_ALLOCT_LIST';
const HTTP_GET_THRESHOLD_LIST = 'HTTP_GET_THRESHOLD_LIST';

@Injectable()
export class LCManagerService {
  constructor(private http: HttpJson) {}

  getAlloctList() {
    return this.http.get(HTTP_GET_ALLOCT_LIST);
  }

  getThresholdList() {
    return this.http.get(HTTP_GET_THRESHOLD_LIST);
  }
}
