import { ScrollService } from './scroll.service';
import { Directive, Input, ElementRef, AfterViewInit, OnDestroy, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollTo]'
})
export class ScrollToDirective implements AfterViewInit, OnDestroy {
  @Input() appScrollTo: string;
  constructor(private elemRef: ElementRef, private scrollServ: ScrollService) { }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    if (!this.appScrollTo) {
      throw new Error('you should set scroll dest name');
    }
    this.scrollServ.registerScrollTab(this.elemRef, this.appScrollTo);
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.scrollServ.unregisterScrollTab(this.elemRef);
  }

  @HostListener('click')
  handleClick() {
    this.scrollServ.scrollTo(this.appScrollTo);
  }
}
