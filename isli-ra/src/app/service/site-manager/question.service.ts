import { Injectable } from '@angular/core';
import { HttpJson, HttpResponse } from 'src/app/core';
import { QuestionSearch, PageSearch, PaginationResult, Question } from '../model';

const HTTP_GET_QUESTION_LIST = '/isli/irms/manage-website/base/commonproblem/v1/list';
const HTTP_GET_QUESTION_HIDE_SHOW = '/isli/irms/manage-website/base/commonproblem/setIsShow';
const HTTP_GET_QUESTION_SORT = '/isli/irms/manage-website/base/commonproblem/updateSort';
const HTTP_POST_QUESTION_UDPATE = '/isli/irms/manage-website/base/commonproblem/updateCommonProblem';
const HTTP_POST_QUESTION_DELETE = '/isli/irms/manage-website/base/commonproblem/delete';
const HTTP_POST_QUESTION_ADD = '/isli/irms/manage-website/base/commonproblem/addCommonProblem';
const HTTP_GET_QUESTION_DETAIL = '/isli/irms/manage-website/base/commonproblem/detail';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  constructor(private http: HttpJson) {}

  getQuestionList(search: QuestionSearch, page: PageSearch): HttpResponse<PaginationResult<Question>> {
    return this.http.get(HTTP_GET_QUESTION_LIST, {}, Object.assign({}, search, page));
  }

  getQuestionDetail(id: number): HttpResponse<Question> {
    return this.http.get(HTTP_GET_QUESTION_DETAIL, {}, { id });
  }

  hideOrShowQuestion(id: number, isShow: 0 | 1) {
    return this.http.get(HTTP_GET_QUESTION_HIDE_SHOW, {}, { id, isShow });
  }

  updateQustionSort(id: number, sort: number) {
    return this.http.get(HTTP_GET_QUESTION_SORT, {}, { id, sort });
  }

  updateQuestion(question: Question) {
    return this.http.post(HTTP_POST_QUESTION_UDPATE, {}, {}, question);
  }

  deleteQuestion(id: number) {
    return this.http.post(HTTP_POST_QUESTION_DELETE, {}, { id }, {});
  }

  addQuestion(question: Question) {
    return this.http.post(HTTP_POST_QUESTION_ADD, {}, {}, question);
  }
}
