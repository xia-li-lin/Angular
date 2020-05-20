import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AssociationType, DropDownOption } from 'src/app/service/model';

const ERROR_MSG = {
  associationTypeName: {
    required: 'Please enter the name of the association type,limited to 300 words',
    unique: 'Link type name already exists'
  },
  sourceTypeEn: {
    required: 'Please select the source type'
  },
  targetTypeEn: {
    required: 'Please select the target type'
  },
  description: {
    required: 'Please enter a description,limited to 2000 words'
  }
};

@Component({
  selector: 'app-association-type-form-en',
  templateUrl: './association-type-form-en.component.html',
  styleUrls: [ './association-type-form-en.component.scss' ]
})
export class AssociationTypeFormEnComponent implements OnInit {
  @Output() sourceType = new EventEmitter();
  @Output() targetType = new EventEmitter();

  @Input() associationTypeEn: AssociationType;
  @Input() oldAssociationTypeEn: AssociationType;
  @Input() sourceTypeList: Array<DropDownOption>;
  @Input() targetTypeList: Array<DropDownOption>;

  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;

  public errorMsg = ERROR_MSG;

  constructor() {}

  ngOnInit() {}
}
