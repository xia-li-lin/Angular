import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EntityType } from 'src/app/service/model';

const ERROR_MSG = {
  entityNameEn: {
    required: 'Please enter the Source name',
    unique: 'Source name already exists'
  },
  entityDescEn: {
    required: 'Please enter the description of Source'
  }
};

@Component({
  selector: 'app-source-form-en',
  templateUrl: './source-form-en.component.html',
  styleUrls: [ './source-form-en.component.scss' ]
})
export class SourceFormEnComponent implements OnInit {
  @Input() entityType = new EntityType();

  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;

  public errorMsg = ERROR_MSG;

  constructor() {}

  ngOnInit() {}
}
