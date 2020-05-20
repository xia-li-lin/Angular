import {} from 'src/app/service/model';
import { registerMock } from '../core/http-mock';
import { times, PageSearch, SourceListSearch, SourceList } from '../service/model';

const HTTP_GET_SOURCE_LIST = '/v1/source/list'; // 源列表
const HTTP_POST_SOURCE_LIST_DELETE = '/v1/source/list/delete'; // 删除源

// 获取源列表
function getSourceList(search: SourceListSearch, page: PageSearch) {
  // console.log(page);
  const list = [];
  const len = 100;
  const pageInfo = new PageSearch(1, 10);
  const pageIndex = pageInfo.pageNo;
  const pageRows = pageInfo.pageSize;
  for (let i = 0; i < len; i++) {
    list.push(
      new SourceList(`${i + 1}`, i % 2 === 0 ? '图书' : '期刊', times().year + '-' + times().month + '-' + times().day)
    );
  }
  return {
    resultCode: '00000000',
    resultMsg: 'ok',
    data: {
      list: list.splice((pageIndex - 1) * pageRows, pageIndex * pageRows),
      totalCount: len
    }
  };
}

// 删除源列表
function deleteSourceList(sourceId: string) {
  return {
    resultCode: '00000000',
    resultMsg: 'ok',
    data: null
  };
}

registerMock('get', HTTP_GET_SOURCE_LIST, getSourceList);
registerMock('post', HTTP_POST_SOURCE_LIST_DELETE, deleteSourceList);
