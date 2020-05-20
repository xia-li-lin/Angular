import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DropDownOption } from 'src/app/service';

@Component({
  selector: 'app-account-role-limits',
  templateUrl: './account-role-limits.component.html',
  styleUrls: [ './account-role-limits.component.scss' ]
})
export class AccountRoleLimitsComponent implements OnInit {
  @Output() OnSaveClick: EventEmitter<any> = new EventEmitter();
  @Output() OnCloseClick: EventEmitter<any> = new EventEmitter();

  @Input() roleLimitsData: Array<DropDownOption>;
  @Input() roleLimitSelected: Array<string>;

  constructor() {}

  ngOnInit() {}

  handleCloseClick() {
    this.OnCloseClick.emit();
  }

  handleSaveRolePermissionClick() {
    this.OnSaveClick.emit(this.roleLimitSelected);
  }
}
