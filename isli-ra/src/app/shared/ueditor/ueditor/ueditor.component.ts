import {
  Component,
  Input,
  forwardRef,
  ViewChild,
  ElementRef,
  OnDestroy,
  EventEmitter,
  Output,
  NgZone,
  ViewEncapsulation,
  SimpleChanges,
  OnInit,
  OnChanges,
  AfterViewInit
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { ScriptService } from './script.service';
import { UEditorConfig } from './ueditor.config';
import { AppState } from 'src/app/core';

declare const window: any;
declare const UE: any;

export type EventTypes =
  | 'destroy'
  | 'reset'
  | 'focus'
  | 'langReady'
  | 'beforeExecCommand'
  | 'afterExecCommand'
  | 'firstBeforeExecCommand'
  | 'beforeGetContent'
  | 'afterGetContent'
  | 'getAllHtml'
  | 'beforeSetContent'
  | 'afterSetContent'
  | 'selectionchange'
  | 'beforeSelectionChange'
  | 'afterSelectionChange';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ueditor',
  template: `
    <textarea #host class="ueditor-textarea"></textarea>
    <p class="loading" *ngIf="loading">{{loadingTip}}</p>
    `,
  encapsulation: ViewEncapsulation.Emulated,
  styles: [ `.ueditor-textarea{display:none;}` ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UEditorComponent),
      multi: true
    }
  ]
})
export class UEditorComponent implements OnDestroy, ControlValueAccessor, OnInit, OnChanges, AfterViewInit {
  static idPool = 0;

  private instance: any;
  private value: string;
  private path: string;
  private events: any = {};

  loading = true;
  id: string;

  @Input() config: any;
  @Input() loadingTip = '加载中...';
  @Input() readonly = false;
  @ViewChild('host', { static: true })
  host: ElementRef;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onPreReady = new EventEmitter<UEditorComponent>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onReady = new EventEmitter<UEditorComponent>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onDestroy = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onContentChange = new EventEmitter();

  protected onChange: (v: any) => void;
  protected onTouched: (v: any) => void;

  constructor(
    private el: ElementRef,
    private zone: NgZone,
    private ss: ScriptService,
    private defConfig: UEditorConfig,
    private stateServ: AppState
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('readonly' in changes && this.instance) {
      this.readonly ? this.instance.setDisabled() : this.instance.setEnabled();
    }
  }

  ngOnInit() {
    this.path = this.defConfig && this.defConfig.path;
    if (!this.path) {
      this.path = './assets/ueditor/';
    }

    // 构建一个虚拟id
    this.id = 'ueditor-' + ++UEditorComponent.idPool;
    this.host.nativeElement.id = this.id;
    const currentLang: string = this.stateServ.get('language') || 'ZH_TW';
    this.defConfig.options = this.defConfig.options || {};
    if (currentLang.toLowerCase().startsWith('zh')) {
      this.defConfig.options.lang = 'zh-cn';
    } else {
      this.defConfig.options.lang = 'en';
    }

    if (!window.UE || Object.keys(window.UE).length <= 1) {
      this.ss.load(this.path, true).getChangeEmitter().subscribe((res) => {
        this.init();
      });
    }
  }

  ngAfterViewInit(): void {
    // 已经存在对象无须进入懒加载模式
    if (window.UE && Object.keys(window.UE).length > 1) {
      this.init();
      return;
    }
  }

  private init(options?: any) {
    if (!window.UE) {
      throw new Error('uedito js文件加载失败');
    }

    if (this.instance) {
      return;
    }

    // registrer hook
    if (this.defConfig && this.defConfig.hook) {
      if (!this.defConfig._hook_finished) {
        this.defConfig._hook_finished = true;
        this.defConfig.hook(UE);
      }
    }

    Promise.resolve(null).then(() => {
      this.loading = false;
    });
    this.onPreReady.emit(this);
    this.zone.runOutsideAngular(() => {
      const opt = Object.assign(
        {
          UEDITOR_HOME_URL: this.path
        },
        this.defConfig && this.defConfig.options,
        this.config,
        options
      );

      const ueditor = UE.getEditor(this.id, opt);
      ueditor.ready(() => {
        this.zone.run(() => {
          this.instance = ueditor;
          // tslint:disable-next-line:no-unused-expression
          this.value && this.instance.setContent(this.value);
          this.onReady.emit(this);
          this.readonly ? this.instance.setDisabled() : this.instance.setEnabled();
        });
      });

      ueditor.addListener('contentChange', () => {
        this.updateValue(ueditor.getContent());
      });
    });
  }

  private updateValue(value: string) {
    this.zone.run(() => {
      this.value = value;

      this.onChange(this.value);
      this.onTouched(this.value);

      this.onContentChange.emit(this.value);
    });
  }

  private destroy() {
    if (this.instance) {
      for (const ki in this.events) {
        if (!this.events.hasOwnProperty(ki)) {
          continue;
        }
        this.instance.removeListener(ki, this.events[ki]);
      }
      this.instance.removeListener('ready');
      this.instance.removeListener('contentChange');
      this.instance.destroy();
      this.instance = null;
    }
    this.onDestroy.emit();
  }

  /**
   * 获取UE实例
   *
   *
   */
  get Instance(): any {
    return this.instance;
  }

  /**
   * 设置编辑器语言
   *
   *
   */
  setLanguage(lang: 'zh-cn' | 'en') {
    this.ss.loadScript(`${this.path}/lang/${lang}/${lang}.js`).then((res) => {
      this.destroy();

      // 清空语言
      if (!UE._bak_I18N) {
        UE._bak_I18N = UE.I18N;
      }
      UE.I18N = {};
      UE.I18N[lang] = UE._bak_I18N[lang];

      this.init();
    });
  }

  /**
   * 添加编辑器事件
   */
  addListener(eventName: EventTypes, fn: any): void {
    if (this.events[eventName]) {
      return;
    }
    this.events[eventName] = fn;
    this.instance.addListener(eventName, fn);
  }

  /**
   * 移除编辑器事件
   */
  removeListener(eventName: EventTypes): void {
    if (!this.events[eventName]) {
      return;
    }
    this.instance.removeListener(eventName, this.events[eventName]);
    delete this.events[eventName];
  }

  ngOnDestroy() {
    this.destroy();
  }

  writeValue(value: string): void {
    this.value = value;
    if (this.instance) {
      this.instance.setContent(this.value);
    }
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.instance.setDisabled();
    } else {
      this.instance.setEnabled();
    }
  }
}
