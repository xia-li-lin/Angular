import { PaginationResult } from './model/common.model';
import { Injectable } from '@angular/core';
import { HttpJson, AppState, HttpResponse, HttpFormUrlencodedService } from '../core';
import { PageSearch, AccountRole, RolePermission, Area } from './model';

import { TreeNode } from 'primeng/api';

const HTTP_GET_ROLE_LIST = '/isli/irms/manage-manager/base/roleManage/getRoleList';
const HTTP_POST_DISABLE_ROLE = '/isli/irms/manage-manager/base/roleManage/stopRole';
const HTTP_POST_ENABLE_ROLE = '/isli/irms/manage-manager/base/roleManage/startRole';
const HTTP_POST_DELETE_ROLE = '/isli/irms/manage-manager/base/roleManage/deleteRole';
const HTTP_POST_ADD_ROLE = '/isli/irms/manage-manager/base/roleManage/addRole';
const HTTP_GET_ROLE_DETAL = '/isli/irms/manage-manager/base/roleManage/getRoleInfos/{roleId}';
const HTTP_POST_UPDATE_ROLE = '/isli/irms/manage-manager/base/roleManage/v1/updateRole/{roleId}';
const HTTP_GET_ROLE_PERMISSION = '/isli/irms/manage-manager/base/roleManage/resourceTree/{roleId}';
const HTTP_POST_ROLE_PERMISSION = '/isli/irms/manage-manager/base/roleManage/distribute/{roleId}';
const HTTP_GET_CHECK_ROLE_NAME = '/isli/irms/manage-manager/base/roleManage/v1/checkRoleName';
const HTTP_GET_AREA_LIST = '/isli/irms/manage-manager/base/roleManage/areaList';

@Injectable({ providedIn: 'root' })
export class AccountRoleService {
  constructor(private http: HttpJson, private state: AppState, private httpUrlEncodeServ: HttpFormUrlencodedService) {}

  getRoleList(page: PageSearch): HttpResponse<{ orderBy: string; pagination: PaginationResult<AccountRole> }> {
    return this.httpUrlEncodeServ.get(
      HTTP_GET_ROLE_LIST,
      {},
      Object.assign({}, page, {
        adminId: this.state.get('userId'),
        orderBy: 'desc',
        langCode: this.state.get('language')
      })
    );
  }

  getRoleDetail(roleId: number): HttpResponse<Array<AccountRole>> {
    return this.http.get(HTTP_GET_ROLE_DETAL, { roleId });
  }

  updateRole(accountRoles: Array<AccountRole>) {
    const roleId = accountRoles[0].roleId;
    return this.http.post(HTTP_POST_UPDATE_ROLE, { roleId }, {}, accountRoles);
  }

  addRole(accountRoles: Array<AccountRole>) {
    return this.httpUrlEncodeServ.post(HTTP_POST_ADD_ROLE, {}, {}, { json: JSON.stringify(accountRoles) });
  }

  disableRole(roleId: number): HttpResponse<AccountRole> {
    return this.httpUrlEncodeServ.post(HTTP_POST_DISABLE_ROLE, {}, {}, { roleId });
  }

  enableRole(roleId: number): HttpResponse<AccountRole> {
    return this.httpUrlEncodeServ.post(HTTP_POST_ENABLE_ROLE, {}, {}, { roleId });
  }

  deleteRole(roleId: number): HttpResponse<any> {
    return this.httpUrlEncodeServ.post(HTTP_POST_DELETE_ROLE, {}, {}, { roleId });
  }

  checkRoleName(roleName: string, langCode: string, roleId?: number) {
    return this.http.get(HTTP_GET_CHECK_ROLE_NAME, {}, { roleName, langCode, roleId });
  }

  /**
   * 获取角色的权限
   * @ param roleId
   */
  getRolePermission(roleId: number): HttpResponse<any> {
    return this.http
      .get(HTTP_GET_ROLE_PERMISSION, { roleId }, { lanCode: this.state.get('language') })
      .translate((res) => {
        console.log('role limits', res);
        // const data = [];
        const newData = res.map((element) => {
          return {
            label: element.name,
            data: element,
            children: [],
            key: element.id,
            expanded: true
          };
        });

        const treeData = this.buildTree(newData);
        const selectionData = newData.filter((elem) => elem.data.checked);
        return { treeData, selectionData };
      });
  }

  private buildTree(nodes: Array<TreeNode>): Array<TreeNode> {
    // 根节点
    const tree: Array<TreeNode> = nodes.filter((node) => !node.data.pId);
    const treeMap: { [key: string]: TreeNode } = {};
    tree.forEach((node) => {
      treeMap[node.data.id] = node;
    });

    let tmpParentMap = treeMap;
    let tmpMap: { [key: string]: TreeNode } = {};

    while (Object.keys(tmpParentMap).length > 0) {
      nodes.filter((node) => node.data.pId in tmpParentMap).forEach((node) => {
        tmpParentMap[node.data.pId].children.push(node);
        tmpMap[node.data.id] = node;
      });
      tmpParentMap = tmpMap;
      tmpMap = {};
    }
    return tree;

    // 二级节点
    // const secondMap: { [key: string]: TreeNode } = {};
    // nodes.filter((node) => node.data.pId in treeMap).forEach((node) => {
    //   treeMap[node.data.pId].children.push(node);
    //   secondMap[node.data.id] = node;
    // });

    // // 三级节点
    // const threeMap: { [key: string]: TreeNode } = {};
    // nodes.filter((node) => node.data.pId in secondMap).forEach((node) => {
    //   secondMap[node.data.pId].children.push(node);
    //   threeMap[node.data.id] = node;
    // });

    // // 四级节点
    // nodes.filter((node) => node.data.pId in threeMap).forEach((node) => {
    //   threeMap[node.data.pId].children.push(node);
    // });

    // return tree;
  }

  toSelection(data) {
    return data.filter((item) => {
      return item.partialSelected;
    });
  }
  toTree(data) {
    // 删除 所有 children,以防止多次调用
    data.forEach((item) => {
      delete item.children;
    });
    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    const map = {};
    data.forEach((item) => {
      map[item.key] = item;
    });
    const val = [];
    data.forEach((item) => {
      // // 以当前遍历项，的pid,去map对象中找到索引的id
      const parent = map[item.parent];
      // // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
      if (parent && item !== parent) {
        (parent.children || (parent.children = [])).push(item);
      } else {
        // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
        val.push(item);
      }
    });
    return val;
  }

  updateRolePermission(rolePermissionId: Array<string>, roleId: number) {
    return this.httpUrlEncodeServ.post(
      HTTP_POST_ROLE_PERMISSION,
      { roleId },
      {},
      { resourceIds: rolePermissionId, lanCode: this.state.get('language') }
    );
  }

  getAreaList(): HttpResponse<Array<Area>> {
    return this.http.get(HTTP_GET_AREA_LIST);
  }
}
