import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToDirective } from './scroll-to.directive';
import { ScrollAnchorDirective } from './scroll-anchor.directive';
import { ScrollService } from './scroll.service';
import { ScrollWrapDirective } from './scroll-wrap.directive';

@NgModule({
  declarations: [ ScrollToDirective, ScrollAnchorDirective, ScrollWrapDirective ],
  imports: [ CommonModule ],
  exports: [ ScrollToDirective, ScrollAnchorDirective, ScrollWrapDirective ],
  providers: [ ScrollService ]
})
export class ScrollToModule {}
