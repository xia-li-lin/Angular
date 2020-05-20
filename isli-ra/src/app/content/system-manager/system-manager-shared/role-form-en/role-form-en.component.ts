import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AccountRole, AccountRoleService } from 'src/app/service';

const ERROR_MSG = {
  areaId: {
    required: 'Please input Regin'
  },
  roleName: {
    required: 'Please input Role name',
    error: ''
  },
  description: {}
};

@Component({
  selector: 'app-role-form-en',
  templateUrl: './role-form-en.component.html',
  styleUrls: [ './role-form-en.component.scss' ]
})
export class RoleFormEnComponent implements OnInit {
  @Output() OnAreaEnChange: EventEmitter<any> = new EventEmitter();

  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;

  @Input() areaArray;
  @Input() info: AccountRole;

  public errorMsg = ERROR_MSG;

  constructor(private accountRoleService: AccountRoleService) {}

  ngOnInit() {}

  areaChange(areaId) {
    this.info.areaId = areaId;
    this.OnAreaEnChange.emit(areaId);
  }
}
