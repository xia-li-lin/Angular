import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalValidService } from 'mpr-form-valid';

const ERROR_MSG = {
  servicePushGroup: {
    districtRows: { required: 'service.serviceList.push.placehold.districtRowList' }
  }
};

@Component({
  selector: 'app-service-push',
  templateUrl: './service-push.component.html',
  styleUrls: [ './service-push.component.scss' ]
})
export class ServicePushComponent implements OnInit {
  @Output() cancelClick = new EventEmitter();
  @Output() sureClick = new EventEmitter();

  @Input() districtRowList: Array<any>;

  public districtRows = [];
  public servicePushGroup: FormGroup;
  public formErrorMsg = ERROR_MSG;

  constructor(private fb: FormBuilder, private globalValidService: GlobalValidService) {
    this.servicePushGroup = this.fb.group({
      districtRows: [ '', [ Validators.required ] ]
    });
  }

  ngOnInit() {}

  // 确定
  handleSureClick() {
    if (this.globalValidService.validAll(true)) {
      this.sureClick.emit(this.districtRows);
    }
  }
}
