import { PaginationResult } from './../model/common.model';
import { Injectable } from '@angular/core';
import { HttpJson, HttpResponse } from 'src/app/core';
import { FeedBackSearch, PageSearch, FeedBack, FeedBackType } from '../model';
import { saveAs } from 'file-saver';

const HTTP_GET_FEEDBACK_LIST = '/isli/irms/manage-website/base/v1/feedback';
const HTTP_GET_FEEDBACK_TYPE_LIST = '/isli/irms/manage-website/base/feedback-type';
const HTTP_GET_FEEDBACK_EXPORT = '/isli/irms/manage-website/base/feedback/export';
const HTTP_GET_FEEDBACK_DETAIL = '/isli/irms/manage-website/base/feedback/look/{feedbackId}';
const HTTP_POST_FEEDBACK_RESPONSE = '/isli/irms/manage-website/base/feedback/v1/deal/{feedbackId}';
const HTTP_GET_FEEBACK_UNDEAL_COUNT = '/isli/irms/manage-website/base/getUntreatedData';

@Injectable({ providedIn: 'root' })
export class FeedBackService {
  constructor(private http: HttpJson) {}

  getFeedBackList(search: FeedBackSearch, page: PageSearch): HttpResponse<PaginationResult<FeedBack>> {
    return this.http.get(HTTP_GET_FEEDBACK_LIST, {}, Object.assign({}, search, page));
  }

  getFeedBackTypeList(): HttpResponse<Array<FeedBackType>> {
    return this.http.get(HTTP_GET_FEEDBACK_TYPE_LIST);
  }

  exportExcellForFeedBack() {
    saveAs(HTTP_GET_FEEDBACK_EXPORT);
  }

  getFeedBackDetail(feedbackId: number): HttpResponse<{ feedBackVo: FeedBack; rootPath: string }> {
    return this.http.get(HTTP_GET_FEEDBACK_DETAIL, { feedbackId }).translate((data) => {
      return { feedBackVo: data[0], rootPath: data[1] };
    });
  }

  dealFeedBack(feedbackId: number, dealOpinion: string, isEmail: 'Y' | 'N') {
    return this.http.post(HTTP_POST_FEEDBACK_RESPONSE, { feedbackId }, {}, { dealOpinion, isEmail });
  }

  getFeedBackUndealCount(): HttpResponse<number> {
    return this.http.get(HTTP_GET_FEEBACK_UNDEAL_COUNT);
  }
}
