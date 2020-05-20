import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValueAccess } from 'src/app/core';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: [ './address.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressComponent),
      multi: true
    }
  ]
})
export class AddressComponent extends FormValueAccess implements OnInit {
  // tslint:disable-next-line:variable-name
  private _countryId: string;
  // tslint:disable-next-line:variable-name
  private _provinceId: string;
  public countries = [];
  public provinces = [];
  constructor(private commonServ: CommonService) {
    super();
  }

  ngOnInit() {
    this.commonServ.getCountry().success((res) => {
      this.countries = res.data;
    });
  }

  get countryId() {
    return this._countryId;
  }

  set countryId(countryId: string) {
    this._countryId = countryId;
    this._provinceId = null;
    this.commonServ.getProvince(countryId).success((res) => {
      this.provinces = res.data || [];
    });
  }

  get provinceId() {
    return this._provinceId;
  }

  set provinceId(provinceId: string) {
    this._provinceId = provinceId;
  }
}
