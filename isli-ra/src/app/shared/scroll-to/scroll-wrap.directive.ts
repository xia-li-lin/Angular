import { Directive, Input, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ScrollService } from './scroll.service';

@Directive({
  selector: '[appScrollWrap]'
})
export class ScrollWrapDirective implements AfterViewInit {
  constructor(private elemRef: ElementRef, private scrollServ: ScrollService) {}

  ngAfterViewInit(): void {
    this.scrollServ.registerScrollWrap(this.elemRef.nativeElement);
  }
}
