import {
  NgModule,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  DoCheck,
  EventEmitter,
  Optional
} from '@angular/core';
import { NgModel } from '@angular/forms';
import calculateNodeHeight from './calculateNodeHeight';

@Directive({
  selector: '[appInputTextarea]',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[class.ui-inputtext]': 'true',
    '[class.ui-corner-all]': 'true',
    '[class.ui-inputtextarea-resizable]': 'autoResize',
    '[class.ui-state-default]': 'true',
    '[class.ui-widget]': 'true',
    '[class.ui-state-filled]': 'filled'
  }
})
export class InputTextareaDirective implements DoCheck {
  @Input() autoResize: boolean;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onResize = new EventEmitter();

  filled: boolean;

  cachedScrollHeight: number;

  constructor(public el: ElementRef, @Optional() public ngModel: NgModel) {}

  ngDoCheck() {
    this.updateFilledState();

    if (this.autoResize) {
      this.resize();
    }
  }

  // AfterViewInit() {
  //   setTimeout(() => {
  //     this.updateFilledState();
  //     if (this.autoResize) {
  //       this.resize();
  //     }
  //   }, 200);
  // }

  // To trigger change detection to manage ui-state-filled for material labels when there is no value binding
  @HostListener('input', [ '$event' ])
  onInput(e) {
    this.updateFilledState();
    if (this.autoResize) {
      this.resize(e);
    }
  }

  updateFilledState() {
    this.filled =
      (this.el.nativeElement.value && this.el.nativeElement.value.length) || (this.ngModel && this.ngModel.model);
  }

  @HostListener('focus', [ '$event' ])
  onFocus(e) {
    if (this.autoResize) {
      this.resize(e);
    }
  }

  @HostListener('blur', [ '$event' ])
  onBlur(e) {
    if (this.autoResize) {
      this.resize(e);
    }
  }

  resize(event?: Event) {
    const height = calculateNodeHeight(this.el.nativeElement);
    if (this.cachedScrollHeight === height) {
      return;
    }
    this.cachedScrollHeight = height;
    this.el.nativeElement.style.height = 'auto';
    this.el.nativeElement.style.height = height + 'px';

    if (parseFloat(this.el.nativeElement.style.height) >= parseFloat(this.el.nativeElement.style.maxHeight)) {
      this.el.nativeElement.style.overflowY = 'scroll';
      this.el.nativeElement.style.height = this.el.nativeElement.style.maxHeight;
    } else {
      this.el.nativeElement.style.overflow = 'hidden';
    }

    this.onResize.emit(event || {});
  }
}
