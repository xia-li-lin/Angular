import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { TelephonePreArray } from 'src/app/service';
import { FormValueAccess, make_form_value_provide } from 'src/app/core';

const ERROR_MSG = {
  telephoneGroup: {
    telType: {},
    telArea: { required: 'systemShared.areaRequired', pattern: 'systemShared.areaFormat' },
    telNumber: { required: 'systemShared.telRequired', pattern: 'systemShared.telFormat' },
    telExt: { pattern: 'systemShared.extFormat' }
  }
};

@Component({
  selector: 'app-tele-phone',
  templateUrl: './tele-phone.component.html',
  styleUrls: [ './tele-phone.component.scss' ],
  providers: [ make_form_value_provide(TelePhoneComponent) ]
})
export class TelePhoneComponent extends FormValueAccess implements OnInit {
  public TelephonePreArray = TelephonePreArray;
  public telephoneGroup: FormGroup;
  public formErrorMsg = ERROR_MSG;

  constructor(private fb: FormBuilder) {
    super();
    this.telephoneGroup = fb.group({
      telType: [ TelephonePreArray[0].value, [] ],
      telArea: [ '', [ Validators.required, Validators.pattern(/^\d{3,4}$/) ] ],
      telNumber: [ '', [ Validators.required, Validators.pattern(/^\d{7,8}$/) ] ],
      telExt: [ '', [ Validators.pattern(/^\d*$/) ] ]
    });
    this.telephoneGroup.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      console.log(value);
      this.changeFunc(value);
      if (this.telephoneGroup.valid) {
        this.touchFunc(value);
      }
    });
  }

  ngOnInit() {}

  writeValue(data: any) {
    console.log('telephone value', data);
    if (data) {
      this.telephoneGroup.reset({
        telType: data.telType,
        telArea: data.telArea,
        telNumber: data.telNumber,
        telExt: data.telExt
      });
    }
  }
}
