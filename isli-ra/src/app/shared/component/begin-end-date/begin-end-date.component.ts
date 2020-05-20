import { Component, OnInit, Input, SimpleChanges, OnChanges, forwardRef } from '@angular/core';
import { CalendarObj } from '../calendar/calendar.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormValueAccess } from 'src/app/core';

@Component({
  selector: 'app-begin-end-date',
  templateUrl: './begin-end-date.component.html',
  styleUrls: [ './begin-end-date.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BeginEndDateComponent),
      multi: true
    }
  ]
})
export class BeginEndDateComponent extends FormValueAccess implements OnInit, OnChanges {
  @Input() calendarObj: CalendarObj;

  public beginCalendarObj = new CalendarObj();
  public endCalendarObj = new CalendarObj();
  // tslint:disable-next-line:variable-name
  private _beginDate: Date;
  // tslint:disable-next-line:variable-name
  private _endDate: Date;

  constructor() {
    super();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if ('calendarObj' in changes && this.calendarObj) {
      this.beginCalendarObj = Object.assign({}, this.beginCalendarObj, this.calendarObj);
      this.endCalendarObj = Object.assign({}, this.endCalendarObj, this.calendarObj);
    }
  }

  get beginDate() {
    return this._beginDate;
  }

  set beginDate(value) {
    this._beginDate = value;
    this.endCalendarObj.minDate = value ? new Date(value) : null;
    this.changeFunc(this.value);
  }

  get endDate() {
    return this._endDate;
  }

  set endDate(value) {
    this._endDate = value;
    if (!value) {
      this.beginCalendarObj.maxDate = null;
    } else {
      this.beginCalendarObj.maxDate = new Date(value);
    }

    this.changeFunc(this.value);
  }

  get value() {
    // if (!this.beginDate || !this.endDate) {
    //   return {};
    // }
    return {
      beginDate: this._beginDate ? this._beginDate + ' 00:00:00' : null,
      endDate: this._endDate ? this._endDate + ' 23:59:59' : null
    };
  }
}
