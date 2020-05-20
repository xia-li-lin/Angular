import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-language-last-step',
  templateUrl: './language-last-step.component.html',
  styleUrls: ['./language-last-step.component.scss']
})
export class LanguageLastStepComponent implements OnInit {

  @Output() OnCompleteClick: EventEmitter<any> = new EventEmitter();
  @Output() OnCancelCLick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  handleCompleteClick() {
    this.OnCompleteClick.emit();
  }

  handleCancelClick() {
    this.OnCancelCLick.emit();
  }
}
