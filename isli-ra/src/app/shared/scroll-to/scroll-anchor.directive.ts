import { Directive, Input, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ScrollService } from './scroll.service';

@Directive({
  selector: '[appScrollAnchor]'
})
export class ScrollAnchorDirective implements AfterViewInit, OnDestroy {
  @Input() appScrollAnchor: string;
  @Input() effective = true;
  constructor(private elemRef: ElementRef, private scrollServ: ScrollService) { }

  ngAfterViewInit(): void {
    if (!this.appScrollAnchor || !this.effective) {
      return;
    }
    this.scrollServ.registerScrollAnchor(this.elemRef, this.appScrollAnchor);
  }

  ngOnDestroy(): void {
    if (!this.appScrollAnchor) {
      return;
    }
    this.scrollServ.unregisterScrollAnchor(this.appScrollAnchor);
  }
}
