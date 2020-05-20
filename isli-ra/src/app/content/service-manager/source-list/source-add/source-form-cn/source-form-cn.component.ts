import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EntityType } from 'src/app/service/model';

const ERROR_MSG = {
  entityNameZh: {
    required: '請輸入源名稱',
    unique: '源名稱已存在'
  },
  entityDescZh: {
    required: '請輸入源描述'
  }
};

@Component({
  selector: 'app-source-form-cn',
  templateUrl: './source-form-cn.component.html',
  styleUrls: [ './source-form-cn.component.scss' ]
})
export class SourceFormCnComponent implements OnInit {
  @Input() entityType = new EntityType();

  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;

  public errorMsg = ERROR_MSG;

  constructor() {}

  ngOnInit() {}
}
