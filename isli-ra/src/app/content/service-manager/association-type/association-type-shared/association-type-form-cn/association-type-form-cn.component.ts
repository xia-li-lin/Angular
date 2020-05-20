import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AssociationType, DropDownOption } from 'src/app/service/model';

const ERROR_MSG = {
  associationTypeName: {
    required: '請輸入關聯類型名稱，內容限100字符',
    unique: '关联类型名称已存在'
  },
  sourceTypeZh: {
    required: '請選擇源類型'
  },
  targetTypeZh: {
    required: '請選擇目標類型'
  },
  description: {
    required: '請輸入描述，內容限2000字符'
  }
};

@Component({
  selector: 'app-association-type-form-cn',
  templateUrl: './association-type-form-cn.component.html',
  styleUrls: [ './association-type-form-cn.component.scss' ]
})
export class AssociationTypeFormCnComponent implements OnInit {
  @Output() sourceType = new EventEmitter();
  @Output() targetType = new EventEmitter();

  @Input() associationTypeCn: AssociationType;
  @Input() oldAssociationTypeCn: AssociationType;
  @Input() sourceTypeList: Array<DropDownOption>;
  @Input() targetTypeList: Array<DropDownOption>;

  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;

  public errorMsg = ERROR_MSG;

  constructor() {}

  ngOnInit() {}
}
