import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { clickOnce } from 'src/app/core/cache';

@Component({
  selector: 'app-shared-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: [ './dialog.component.scss' ],
  animations: [
    trigger('animation', [
      state(
        'void',
        style({
          opacity: 0
        })
      ),
      state(
        'visible',
        style({
          opacity: 1
        })
      ),
      transition('* => *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements OnInit {
  @Output() OnCancelClick = new EventEmitter();

  @Input() title: string;
  @Input() cancelTxt;
  @Input() confirmTxt = '确认';
  @Input() validFunc: () => boolean | Promise<boolean>;
  @Input() showFooter = true;
  @Input() styleClass = '';

  dailogState = 'visible';
  constructor() {}

  ngOnInit() {}

  @clickOnce('dailog', 1000)
  handleCloseClick() {
    this.dailogState = 'void';
  }
  handleAnimationDone() {
    if (this.dailogState === 'void') {
      Promise.resolve(null).then(() => {
        this.OnCancelClick.emit();
      });
    }
  }

  @clickOnce('handleConfirmClick', 1000)
  handleConfirmClick() {
    console.log(this.validFunc);
    if (this.validFunc) {
      const result = this.validFunc();
      if (typeof result === 'boolean' && result) {
        this.handleCloseClick();
      } else if ((result as Promise<boolean>).then) {
        (result as Promise<boolean>).then((retVal) => {
          if (retVal) {
            this.handleCloseClick();
          }
        });
      }
    } else if (!this.validFunc) {
      this.handleCloseClick();
    }
  }
}
