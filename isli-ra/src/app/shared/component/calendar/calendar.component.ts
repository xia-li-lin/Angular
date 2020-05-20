/**
 * Created by zhangle on 2017/3/22.
 */
import { Component, Input, Output, EventEmitter, forwardRef, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Calendar } from 'primeng/calendar';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from 'src/app/core';

export class CalendarObj {
  constructor(
    public defaultDate: Date = new Date(),
    public dateFormat: string = 'yy-mm-dd',
    public dataType = 'string',
    public placeholder = '',
    public readonly = true,
    public monthNavigator = true,
    public yearNavigator = true,
    public showButtonBar = true,
    public showOtherMonths = true,
    public view = 'date',
    public disabled?: boolean,
    public minDate?: Date,
    public maxDate?: Date,
    public showTime?: boolean,
    public showSeconds?: boolean,
    public style?: any
  ) {}
}

const CALENDAR = {
  firstDayOfWeek: 0,
  dayNames: [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ],
  dayNamesShort: [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ],
  dayNamesMin: [ '日', '一', '二', '三', '四', '五', '六' ],
  monthNames: [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ],
  monthNamesShort: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12' ],
  today: '今日',
  clear: '清除'
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: [ './calendar.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true
    }
  ]
})
export class CalendarComponent implements ControlValueAccessor, OnChanges {
  @Output() calendarObjChange: EventEmitter<any> = new EventEmitter();

  @Input() calendarObj: CalendarObj = new CalendarObj();
  @Input() readOnly = false;

  @ViewChild(Calendar, { static: true })
  calendar: Calendar;

  public calendarData = CALENDAR;
  public currentYear: string;
  public language: string;
  public value: Date;

  onChange = (v: any) => {};
  onTouched = (v: any) => {};

  constructor(private translateServ: TranslateService, private stateServ: AppState) {
    this.currentYear = '' + (new Date().getFullYear() + 5);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('readOnly' in changes && this.calendarObj) {
      this.calendarObj.disabled = this.readOnly;
    }
    this.calendarObj.placeholder = this.translateServ.instant('shared.component.calendar.placehold');
  }

  changValue(event) {
    this.value = event;
    this.calendarObjChange.emit(event);
    this.onChange(event);
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  onInputBlur(event) {
    this.onTouched(event);
    // this.updateUI();
  }

  writeValue(value: any) {
    this.value = value;
    if (value && value instanceof Date) {
      this.calendar.currentMonth = value.getMonth();
      this.calendar.currentYear = value.getFullYear();
    } else if (typeof value === 'string') {
      this.value = new Date(value);
    }
  }
}
