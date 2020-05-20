import {
  Directive,
  Input,
  forwardRef,
  Renderer2,
  ElementRef,
  HostListener,
  Renderer,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { AppState } from 'src/app/core';

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective implements OnChanges {
  @Input() appPermission: any;

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private appState: AppState) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if ('appPermission' in changes && this.appPermission) {
      this.appState.getPromise('permission').then((res) => {
        const permissions: Array<string> = res || [];
        const find = permissions.some((elem) => elem.startsWith(this.appPermission));
        if (!find) {
          this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
        }
        // if (permissions.indexOf(this.appPermission) === -1) {
        //   this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
        // }
      });
    }
  }
}
