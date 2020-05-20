import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EntityType } from 'src/app/service/model';

const ERROR_MSG = {
  entityNameZh: {
    required: '請輸入目標名稱',
    unique: '目標名稱已存在'
  },
  entityDescZh: {
    required: '請輸入目標描述'
  }
};

@Component({
  selector: 'app-target-form-cn',
  templateUrl: './target-form-cn.component.html',
  styleUrls: [ './target-form-cn.component.scss' ]
})
export class TargetFormCnComponent implements OnInit {
  @Input() entityType = new EntityType();

  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;

  public errorMsg = ERROR_MSG;

  constructor() {}

  ngOnInit() {}
}
