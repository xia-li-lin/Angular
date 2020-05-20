import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormValueAccess, make_form_value_provide } from 'src/app/core';
import { DropDownOption } from 'src/app/service';

@Component({
  selector: 'app-add-filed',
  templateUrl: './add-filed.component.html',
  styleUrls: [ './add-filed.component.scss' ],
  providers: [ make_form_value_provide(AddFiledComponent) ]
})
export class AddFiledComponent extends FormValueAccess implements OnInit, OnChanges {
  @Output() updataFildes = new EventEmitter();

  @Input() relevanceNum: number;

  public filedsData: Array<DropDownOption>;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    const relevanceNum = changes && changes.relevanceNum && changes.relevanceNum.currentValue;
    this.filedsData = [];
    for (let i = 0; i < relevanceNum; i++) {
      this.filedsData.push(new DropDownOption(`${i + 1}`, null));
    }
  }

  ngOnInit() {}

  // 更新关联字段分段数据
  updataFildesBlur() {
    let fileds = '';
    this.filedsData.forEach((elem) => {
      fileds += elem.value + ',';
    });
    // console.log(fileds);
    fileds = fileds.substring(0, fileds.length - 1);
    this.updataFildes.emit(fileds);
  }

  writeValue(data: any) {
    if (!data) {
      return;
    }
    const arr = data.split(',');
    const len = arr && arr.length;
    this.filedsData = [];
    for (let i = 0; i < len; i++) {
      this.filedsData.push(new DropDownOption(`${i + 1}`, arr[i]));
    }
  }
}
