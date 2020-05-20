import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountRoleService, AccountRole } from 'src/app/service';
const ERROR_MSG = {
  areaId: {
    required: '请选择所属区域'
  },
  roleName: {
    required: '请输入角色名称',
    error: '角色名称已存在'
  },
  description: {}
};

@Component({
  selector: 'app-role-form-tw',
  templateUrl: './role-form-tw.component.html',
  styleUrls: [ './role-form-tw.component.scss' ]
})
export class RoleFormTwComponent implements OnInit {
  @Output() OnAreaTwChange: EventEmitter<any> = new EventEmitter();

  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;

  @Input() areaArray;
  @Input() info: AccountRole;

  public errorMsg = ERROR_MSG;

  constructor(private accountRoleService: AccountRoleService) {}

  ngOnInit() {}

  areaChange(areaId) {
    console.log(areaId);
    this.info.areaId = areaId;
    this.OnAreaTwChange.emit(areaId);
  }
}
