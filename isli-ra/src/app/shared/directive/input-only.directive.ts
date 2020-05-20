import { Directive, ElementRef, Renderer2, SimpleChanges, Input, OnChanges } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'input[readonly]'
})
export class InputReadOnlyDirective implements OnChanges {
  @Input() readonly: boolean;
  constructor(private ref: ElementRef, private render: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if (this.readonly) {
      this.render.setProperty(this.ref.nativeElement, 'readonly', 'readonly');
      this.render.setProperty(this.ref.nativeElement, 'disabled', 'disabled');
      this.render.addClass(this.ref.nativeElement, 'ui-state-disabled');
    } else {
      this.render.removeAttribute(this.ref.nativeElement, 'readonly');
      this.render.removeAttribute(this.ref.nativeElement, 'disabled');
      this.render.removeClass(this.ref.nativeElement, 'ui-state-disabled');
    }
  }
}
