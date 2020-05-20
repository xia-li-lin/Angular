import { Injectable } from '@angular/core';
import { HttpJson, HttpResponse, AppState } from 'src/app/core';
import { NavigationNode, NodeI18n, TreeNode } from '../model';

const HTTP_GET_NAV_TREE = '/isli/irms/manage-website/base/navigation/navTreeNodes';
const HTTP_POST_NAV_NODE_SHOW_HIDE = '/isli/irms/manage-website/base/navigation/v1/changeVisible';
const HTTP_POST_NAV_NODE_DELETE = '/isli/irms/manage-website/base/navigation/deleteNavigation';
const HTTP_POST_NAV_SORT = '/isli/irms/manage-website/base/navigation/navSorts';
const HTTP_POST_NAV_NODE_ADD = '/isli/irms/manage-website/base/navigation/addNavigation';
const HTTP_PUT_NAV_NODE_UPDATE = '/isli/irms/manage-website/base/navigation/navigations/{id}';
const HTTP_GET_NAV_DODE_DETAIL = '/isli/irms/manage-website/base/navigation/navigations/detail/{id}';
const HTTP_GET_NAV_NODE_NAME_EXIST = '/isli/irms/manage-website/base/navigation/navNameUniqueV1';
const HTTP_POST_NAVS_ADD = '/isli/irms/manage-website/base/navigation/addNewLangNavI18ns';
const HTTP_UPDATE_NODE_NAME = '/isli/irms/manage-website/base/navigation/navigationRename';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor(private http: HttpJson, private stateServ: AppState) {}

  getTree(langCode?: string): HttpResponse<Array<TreeNode>> {
    return this.http.get(HTTP_GET_NAV_TREE, {}, { langCode: langCode || this.stateServ.get('language') });
  }

  showTreeNode(ids: Array<string>) {
    return this.http.post(HTTP_POST_NAV_NODE_SHOW_HIDE, {}, {}, { childIds: ids, hide: 0 });
  }

  hideTreeNode(ids: Array<string>) {
    return this.http.post(HTTP_POST_NAV_NODE_SHOW_HIDE, {}, {}, { childIds: ids, hide: 1 });
  }

  addTreeNode(node: NavigationNode) {
    return this.http.post(HTTP_POST_NAV_NODE_ADD, {}, {}, node);
  }

  deleteTreeNode(id: string) {
    return this.http.post(HTTP_POST_NAV_NODE_DELETE, {}, { id }, {});
  }

  getNodeDetail(id: string): HttpResponse<NavigationNode> {
    return this.http.get(HTTP_GET_NAV_DODE_DETAIL, { id });
  }

  updateNodeName(id: string, nodeName: string) {
    return this.http.post(HTTP_UPDATE_NODE_NAME, {}, { id, navigationName: nodeName }, {});
  }

  checkNameExist(i18nid: string, navName: string, langCode: string) {
    return this.http.get(HTTP_GET_NAV_NODE_NAME_EXIST, {}, { i18nid, navName, lanCode: langCode });
  }

  // 获取导航类型
  getNavTypes() {
    return [
      {
        label: 'FQA',
        value: 'Q'
      },
      {
        label: 'Homepage',
        value: 'W'
      },
      {
        label: 'Apply',
        value: 'A'
      },
      {
        label: 'List',
        value: 'L'
      },
      {
        label: 'Content',
        value: 'C'
      }
    ];
  }

  getNavTypesZH() {
    return [
      {
        label: '自主问答',
        value: 'Q'
      },
      {
        label: '首页',
        value: 'W'
      },
      {
        label: '应用示例',
        value: 'A'
      },
      {
        label: '清單',
        value: 'L'
      },
      {
        label: '內容',
        value: 'C'
      }
    ];
  }

  /**
   * 导航排序
   *
   * @param preNodeId 前面节点Id
   * @param curNodeId 当前节点Id
   * @param nxtNodeId 下一个节点的Id
   * @param prtNodeId prtNodeId
   *
   */
  updateTreeNodeSort(preNodeId: string, curNodeId: string, nxtNodeId: string, prtNodeId: string) {
    return this.http.post(HTTP_POST_NAV_SORT, {}, { preNodeId, curNodeId, nxtNodeId, prtNodeId }, {});
  }

  updateTreeNode(navNode: NavigationNode) {
    // if (navNode.navigationI18n) {
    //   navNode.navigationI18ns = navNode.navigationI18ns || [];
    //   const index = navNode.navigationI18ns.findIndex((elem) => elem.langCode == navNode.navigationI18n.langCode);
    //   if (index === -1) {
    //     navNode.navigationI18ns.push(navNode.navigationI18n);
    //   } else {
    //     navNode.navigationI18ns[index] = Object.assign({}, navNode.navigationI18ns[index], navNode.navigationI18n);
    //   }
    // }
    return this.http.put(HTTP_PUT_NAV_NODE_UPDATE, { id: navNode.navigationId }, {}, navNode);
  }

  addOrUpdateTreeI18N(nodei18ns: Array<NodeI18n>) {
    return this.http.post(HTTP_POST_NAVS_ADD, {}, {}, { navigationI18ns: nodei18ns });
  }
}
