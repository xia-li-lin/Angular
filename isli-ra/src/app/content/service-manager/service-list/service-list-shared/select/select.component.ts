import { Component, OnInit, Input, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { FormValueAccess, make_form_value_provide } from 'src/app/core';
import { DropDownOption } from 'src/app/service/model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: [ './select.component.scss' ],
  providers: [ make_form_value_provide(SelectComponent) ]
})
export class SelectComponent extends FormValueAccess implements OnInit, AfterViewInit, OnDestroy {
  @Input() name: string;
  @Input() options: Array<DropDownOption>;
  @Input() placeholder: string;

  public associationType: string;
  public documentClickListener: any;
  public onOff = false;
  public value;

  constructor(private renderer: Renderer2) {
    super();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.bindDocumentClickListener();
  }

  ngOnDestroy() {
    this.unbindDocumentClickListener();
  }

  get selectedTypes() {
    return this.value;
  }

  set selectedTypes(value) {
    console.log(value);
    this.value = value;
    this.changeFunc(this.value);
  }

  // 点击空白区域
  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener = this.renderer.listen('body', 'click', () => {
        this.onOff = false;
      });
    }
  }

  // 点击显示面板
  handlePannelClick(event) {
    this.onOff = !this.onOff;
    this.stopPropagation(event);
  }

  // 阻止冒泡事件
  stopPropagation(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
  }

  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
    }
  }

  writeValue(value: any) {
    if (typeof value === 'string') {
      this.value = value && value.split(',');
    } else {
      this.value = value;
    }
  }
}
