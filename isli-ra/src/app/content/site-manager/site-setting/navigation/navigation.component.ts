import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { TreeNode as NavTreeNode } from 'src/app/service';

import { NavigationService, NavigationNode } from 'src/app/service';
import { clickOnce } from 'src/app/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: [ './navigation.component.scss' ]
})
export class NavigationComponent implements OnInit {
  public dialogOnOff = false;
  public id: string;
  public navTree: TreeNode[];
  public selectedNodes: TreeNode[] = [];
  public validFunc;

  constructor(private router: Router, private navigationServ: NavigationService) {
    this.validFunc = () => {
      return new Promise<boolean>((resolve, reject) => {
        this.navigationServ
          .deleteTreeNode(this.id)
          .success(() => {
            this.loadTree();
            resolve(true);
          })
          .error(() => {
            resolve(false);
          });
      });
    };
  }

  ngOnInit() {
    this.loadTree();
  }

  // 新增
  @clickOnce()
  public handleAddClick(node: TreeNode, event: Event) {
    this.router.navigate([ '/content/site/setting/navs/detail' ], {
      queryParams: { pid: node.data.id, level: node.data.level }
    });
    event.stopPropagation();
  }

  // 关闭弹窗
  @clickOnce()
  public handleCancelDialogClick() {
    this.dialogOnOff = false;
  }

  @clickOnce()
  public handleDeleteClick(node: TreeNode, event: Event) {
    this.id = node.data.id;
    this.dialogOnOff = true;
    event.stopPropagation();
  }

  // 编辑
  @clickOnce()
  public handleEditorClick(node: TreeNode, event: Event) {
    this.router.navigate([ '/content/site/setting/navs/detail' ], {
      queryParams: { id: node.data.id, modify: true, level: node.data.level }
    });
    event.stopPropagation();
  }

  @clickOnce()
  public handleNodeSelect(nodeEvent: { originalEvent: Event; node: TreeNode }) {
    const nodeIds = [ nodeEvent.node.data.id ].concat(nodeEvent.node.children.map((elem) => elem.data.id));
    let parent = nodeEvent.node.parent;
    const parents = [];
    while (parent) {
      // 子节点被选中的时候，父节点也要被选中
      if (!parent.data.checked) {
        nodeIds.push(nodeEvent.node.parent.data.id);
        parents.push(parent);
      }
      parent.partialSelected = false;
      parent = parent.parent;
    }
    const children = this.formatChildrenToArray(nodeEvent.node.children);
    const addNodeIds = nodeIds.concat(children.filter((elem) => !elem.data.checked).map((elem) => elem.data.id));
    this.navigationServ
      .showTreeNode(addNodeIds)
      .success(() => {
        nodeEvent.node.data.checked = true;
        children.forEach((elem) => {
          elem.data.checked = true;
          this.selectedNodes.push(elem);
        });
        parents.forEach((elem) => {
          elem.data.checked = true;
          if (-1 === this.selectedNodes.findIndex((felem) => elem.data.id === felem.data.id)) {
            this.selectedNodes.push(elem);
          }
        });
        this.selectedNodes.push(nodeEvent.node);
      })
      .after(() => {
        // 发生异常清楚选中状态
        this.selectedNodes = [].concat(this.selectedNodes);
      });
  }

  @clickOnce()
  public handleNodeUnSelect(nodeEvent: { originalEvent: Event; node: TreeNode }) {
    const nodeIds = [ nodeEvent.node.data.id ].concat(nodeEvent.node.children.map((elem) => elem.data.id));
    const parents = [];
    let parent = nodeEvent.node.parent;
    while (parent) {
      // 最后一个子节点被取消选中的时候，父节点也要被取消选中
      const length = parent.children.filter((elem) => elem.data.checked).length;
      if (length === 1 && parent.data.checked) {
        nodeIds.push(nodeEvent.node.parent.data.id);
        parents.push(parent);
      } else {
        parent.partialSelected = false;
      }
      parent = parent.parent;
    }
    const children = this.formatChildrenToArray(nodeEvent.node.children);
    const addNodeIds = nodeIds.concat(children.filter((elem) => !elem.data.checked).map((elem) => elem.data.id));
    this.navigationServ
      .hideTreeNode(addNodeIds)
      .success(() => {
        nodeEvent.node.data.checked = false;
        children.forEach((elem) => (elem.data.checked = false));
        parents.forEach((elem) => (elem.data.checked = false));
        const filterNodes = [ nodeEvent.node ].concat(children, parents);
        this.selectedNodes = this.selectedNodes.filter(
          (elem) => -1 === filterNodes.findIndex((fElem) => fElem.key === elem.key)
        );
      })
      .after(() => {
        // 发生异常清楚选中状态
        this.selectedNodes = [].concat(this.selectedNodes);
      });
  }

  public showAddBtn(node: TreeNode) {
    if (node.selectable && node.data.level === 1 && node.children.length < 6) {
      return true;
    } else if (node.selectable && node.data.level === 2) {
      return true;
    }
    return false;
  }

  private buildTree(nodes: Array<NavTreeNode>): Array<TreeNode> {
    // 根节点
    const tree: Array<TreeNode> = nodes.filter((node) => !node.pId).map((node) => this.convertNavNodeToTreeNode(node));
    const treeMap: { [key: string]: TreeNode } = {};
    tree.forEach((node) => {
      node.data.level = 1; // 补全数据
      treeMap[node.data.id] = node;
    });

    // 二级节点
    const secondMap: { [key: string]: TreeNode } = {};
    nodes.filter((node) => node.pId in treeMap).forEach((node) => {
      node.level = 2;
      const secondNode = this.convertNavNodeToTreeNode(node);
      treeMap[node.pId].children.push(secondNode);
      secondMap[node.id] = secondNode;
    });

    // 三级节点
    nodes.filter((node) => node.pId in secondMap).forEach((node) => {
      node.level = 3;
      const threeNode = this.convertNavNodeToTreeNode(node);
      secondMap[node.pId].children.push(threeNode);
    });
    return tree;
  }

  private convertNavNodeToTreeNode(node: NavTreeNode): TreeNode {
    return {
      label: node.name,
      children: [],
      data: node,
      expanded: true,
      key: node.id,
      selectable: !node.chkDisabled,
      expandedIcon: 'fa-folder-open',
      collapsedIcon: 'fa-folder'
    };
  }

  private getSelectedNodes(node: TreeNode) {
    const data: NavTreeNode = node.data;
    let chSelectNodes = [];
    if (data.checked) {
      chSelectNodes.push(node);
    }
    node.children.forEach((chNode) => {
      chSelectNodes = chSelectNodes.concat(this.getSelectedNodes(chNode));
    });
    return chSelectNodes;
  }

  private loadTree() {
    this.navigationServ.getTree().success((res) => {
      this.navTree = this.buildTree(res.data || []);
      this.selectedNodes = [];
      this.navTree.forEach((node) => {
        this.selectedNodes = this.selectedNodes.concat(this.getSelectedNodes(node));
      });
    });
  }

  private formatChildrenToArray(children: Array<TreeNode>) {
    let childrenArr = [];
    if (children && children.length) {
      children.forEach((elem) => {
        childrenArr.push(elem);
        childrenArr = childrenArr.concat(this.formatChildrenToArray(elem.children));
      });
    }
    return childrenArr;
  }
}
