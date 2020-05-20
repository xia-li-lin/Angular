import { PaginationResult } from './../model/common.model';
import { Injectable } from '@angular/core';
import { HttpJson, HttpResponse } from 'src/app/core';
import { FqManagerSearch, PageSearch, FqManager, FqManagerReplay } from '../model';

const HTTP_GET_FQMANAGER_LIST = '/isli/irms/manage-website/base/fqamanager/v1/list';
const HTTP_GET_FQMANAGER_NEW_COUNT = '/isli/irms/manage-website/base/fqamanager/getStatisticsNewData';
const HTTP_GET_FQMANAGER_HIDE_SHOW = '/isli/irms/manage-website/base/fqamanager/setIsShow';
const HTTP_GET_FQMANAGER_TOP_SORT = '/isli/irms/manage-website/base/fqamanager/updateTopSort';
const HTTP_POST_FQMANAGER_UPDATE_TITLE = '/isli/irms/manage-website/base/fqamanager/updateQuestionTitle';
const HTTP_POST_FQMANAGER_DELETE = '/isli/irms/manage-website/base/fqamanager/delete';
const HTTP_POST_FQMAANGER_REPLAY_TOP_SORT = '/isli/irms/manage-website/base/fqamanager/updateReplayTopSort';
const HTTP_GET_FQMANAGER_DETAIL = '/isli/irms/manage-website/base/fqamanager/v1/detail';
const HTTP_POST_FQMANAGER_REPLAY_DELETE = '/isli/irms/manage-website/base/fqamanager/deleteReplay';
const HTTP_POST_FQMANAGER_REPLAY_HIDE_SHOW = '/isli/irms/manage-website/base/fqamanager/updateIsShowReplay';
const HTTP_POST_FQMANAGER_REPLAY_SORT_SWAP = '/isli/irms/manage-website/base/fqamanager/updateSort';
const HTTP_POST_FQMANAGER_REPLAY_ADD = '/isli/irms/manage-website/base/fqamanager/v1/addReplay';
const HTTP_POST_FQMANAGER_REPLAY_UPDATE = '/isli/irms/manage-website/base/fqamanager/v1/updateReplay';

@Injectable({ providedIn: 'root' })
export class FqManagerService {
  constructor(private http: HttpJson) {}

  getManagerList(search: FqManagerSearch, page: PageSearch): HttpResponse<PaginationResult<FqManager>> {
    return this.http.get(HTTP_GET_FQMANAGER_LIST, {}, Object.assign({}, search, page));
  }

  getManagerNewCount(): HttpResponse<number> {
    return this.http.get(HTTP_GET_FQMANAGER_NEW_COUNT);
  }

  hideShowFqManager(id: number, isShow: 0 | 1) {
    return this.http.get(HTTP_GET_FQMANAGER_HIDE_SHOW, {}, { id, isShow });
  }

  setFqmanagerTopSort(id: number) {
    return this.http.get(HTTP_GET_FQMANAGER_TOP_SORT, {}, { id });
  }

  updateFqManagerTitle(id: number, title: string) {
    return this.http.post(HTTP_POST_FQMANAGER_UPDATE_TITLE, {}, { questionId: id, title }, {});
  }

  deleteFqManager(id: number) {
    return this.http.post(HTTP_POST_FQMANAGER_DELETE, {}, { id }, {});
  }

  updateFqManagerReplayTopSort(id: number) {
    return this.http.post(HTTP_POST_FQMAANGER_REPLAY_TOP_SORT, {}, { id }, {});
  }

  getFqManagerDetail(
    id: number,
    page: PageSearch
  ): HttpResponse<{ faManager: FqManager; replay: PaginationResult<FqManagerReplay> }> {
    return this.http.get(HTTP_GET_FQMANAGER_DETAIL, {}, Object.assign({ id }, page));
  }

  deleteFqManagerReplay(id: number) {
    return this.http.post(HTTP_POST_FQMANAGER_REPLAY_DELETE, {}, { id }, {});
  }

  showHideFqManagerReplay(id: number, isShow: 0 | 1) {
    return this.http.get(HTTP_POST_FQMANAGER_REPLAY_HIDE_SHOW, {}, { id, isShow });
  }

  swapFqManagerReplaySort(replay1Id: number, replay2Id: number) {
    return this.http.post(HTTP_POST_FQMANAGER_REPLAY_SORT_SWAP, {}, { id1: replay1Id, id2: replay2Id }, {});
  }

  addFqManagerReplay(replay: FqManagerReplay) {
    return this.http.post(HTTP_POST_FQMANAGER_REPLAY_ADD, {}, {}, replay);
  }

  updateFqManagerReplay(replay: FqManagerReplay) {
    return this.http.post(HTTP_POST_FQMANAGER_REPLAY_UPDATE, {}, {}, replay);
  }
}
