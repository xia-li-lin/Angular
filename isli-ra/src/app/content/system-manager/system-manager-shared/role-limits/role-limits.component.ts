import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-role-limits',
  templateUrl: './role-limits.component.html',
  styleUrls: [ './role-limits.component.scss' ]
})
export class RoleLimitsComponent implements OnInit {
  @Output() OnCloseClick: EventEmitter<any> = new EventEmitter();
  @Output() OnSaveRolePermissionClick: EventEmitter<any> = new EventEmitter();

  @Input() treeData: Array<TreeNode>;
  @Input() selectionData = [];

  constructor() {}

  ngOnInit() {}
  handleCloseClick() {
    this.OnCloseClick.emit();
  }

  handleNodeSelect(event: any) {
    const node = event.node as TreeNode;
    const index = this.selectionData.findIndex((elem) => elem.key === node.key);
    if (index !== -1) {
      return;
    }
    node.data.checked = true;
    this.selectionData.push(node);
    let parent = node.parent as TreeNode;
    while (parent) {
      if (this.selectionData.findIndex((elem) => elem.key === parent.key) === -1) {
        parent.data.checked = true;
        this.selectionData.push(parent);
      }
      parent.partialSelected = false;
      parent = parent.parent;
    }
    this.addSelectedForNodeChildren(node.children);
    this.selectionData = [].concat(this.selectionData);
  }

  handleNodeUnSelect(event: any) {
    const node = event.node as TreeNode;
    const index = this.selectionData.findIndex((elem) => elem.key === node.key);
    if (index === -1) {
      return;
    }
    node.data.checked = false;
    this.selectionData = this.selectionData.filter((elem) => elem.key !== node.key);
    let parent = node.parent as TreeNode;
    while (parent) {
      if (parent.children.filter((elem) => elem.data.checked).length <= 0) {
        parent.data.checked = false;
        this.selectionData = this.selectionData.filter((elem) => elem.key !== parent.key);
      } else {
        parent.partialSelected = false;
      }
      parent = parent.parent;
    }
    this.removeSelectedForNodeChildren(node.children);
  }

  handleSaveRolePermissionClick() {
    console.log('handleSelectionChange', this.selectionData);
    console.log('treeData', this.treeData);
    const roleIdArr = [];
    if (this.selectionData.length) {
      this.selectionData.forEach((element) => {
        roleIdArr.push(element.key);
      });
    }
    this.OnSaveRolePermissionClick.emit(roleIdArr);
    console.log(roleIdArr);
  }

  private addSelectedForNodeChildren(children: Array<TreeNode>) {
    if (children && children.length) {
      children.forEach((elem) => {
        elem.data.checked = true;
        this.selectionData.push(elem);
        this.addSelectedForNodeChildren(elem.children);
      });
    }
  }

  private removeSelectedForNodeChildren(children: Array<TreeNode>) {
    if (children && children.length) {
      children.forEach((elem) => {
        elem.data.checked = false;
        this.selectionData = this.selectionData.filter((felem) => felem.key !== elem.key);
        this.removeSelectedForNodeChildren(elem.children);
      });
    }
  }
}
