import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, Renderer2, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: [ './tab-menu.component.scss' ]
})
export class TabMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() sheetItems: Array<any> = [];

  @Output() tabMenuClick = new EventEmitter();
  @Output() exportImageClick = new EventEmitter();
  @Output() exportExcelClick = new EventEmitter();

  @Input() tabMenu: Array<any>;

  public currentIndex = 0;
  public documentClickListener: any;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  // 切换tab
  handleTabMenuClick(tab) {
    this.currentIndex = tab.index;
    this.tabMenuClick.emit(tab);
  }

  // 点击显示子菜单
  handleShowChildrenTabMenuClick(tab, event) {
    this.stopPropagation(event);
    tab.showChildren = !tab.showChildren;
  }

  // 点击子菜单
  handleChildrenTabMenuClick(tab, children, event) {
    // tslint:disable-next-line:triple-equals
    if (children.index == 0) {
      this.exportImageClick.emit(children);
    } else {
      this.exportExcelClick.emit(children);
    }
    tab.showChildren = false;
    this.stopPropagation(event);
  }

  ngAfterViewInit() {
    this.bindDocumentClickListener();
  }

  // 点击空白区域
  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener = this.renderer.listen('body', 'click', () => {
        this.tabMenu.forEach((val) => {
          val.showChildren = false;
        });
      });
    }
  }

  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
    }
  }

  ngOnDestroy() {
    this.unbindDocumentClickListener();
  }

  // 阻止冒泡事件
  stopPropagation(e: Event) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
  }
}
