import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EntityType } from 'src/app/service/model';

const ERROR_MSG = {
  entityNameEn: {
    required: 'Please enter the Target name',
    unique: 'Target name already exists'
  },
  entityDescEn: {
    required: 'Please enter the description of Target'
  }
};

@Component({
  selector: 'app-target-form-en',
  templateUrl: './target-form-en.component.html',
  styleUrls: [ './target-form-en.component.scss' ]
})
export class TargetFormEnComponent implements OnInit {
  @Input() entityType = new EntityType();

  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;

  public errorMsg = ERROR_MSG;

  constructor() {}

  ngOnInit() {}
}
