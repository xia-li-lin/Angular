import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { GlobalValidService } from 'mpr-form-valid';
import { NgForm } from '@angular/forms';
import { AppState, clickOnce } from 'src/app/core';
import calculateNodeHeight from 'src/app/shared/directive/calculateNodeHeight';

@Component({
  selector: 'app-appeal-review-dialog',
  templateUrl: './appeal-review-dialog.component.html',
  styleUrls: [ './appeal-review-dialog.component.scss' ],
  providers: [ GlobalValidService ]
})
export class AppealReviewDialogComponent implements OnInit, AfterViewInit {
  @Output() cancelClick: EventEmitter<any> = new EventEmitter();
  @Output() submitClick: EventEmitter<any> = new EventEmitter();

  @Input() serviceRegisterInfo: any;

  @ViewChild(NgForm, { static: true })
  form: NgForm;
  @ViewChild('dialog', null)
  dialog: ElementRef;

  public approvalOpinion: string;
  public approvalOperation = '3';
  public language: string;

  public errorMsg = {
    reason: {
      required: 'service.register.dialog.submitReasonRequired'
    }
  };

  constructor(private globalValidServ: GlobalValidService, private stateServ: AppState) {
    this.language = this.stateServ.get('language');
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    const dialogHeight = calculateNodeHeight(this.dialog.nativeElement);

    if (dialogHeight % 2 !== 0) {
      this.dialog.nativeElement.style.height = dialogHeight + 1 + 'px';
    }
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    Promise.resolve(null).then(() => {
      this.form.controls.groupname.valueChanges.subscribe((value) => {
        if (value === 3) {
          this.form.controls.reason.setErrors(null);
        } else if (!this.approvalOpinion) {
          this.form.controls.reason.markAsDirty();
          this.form.controls.reason.setErrors({ required: true });
        }
      });
    });
  }

  @clickOnce()
  handleSubmitClick() {
    if (this.globalValidServ.validAll()) {
      this.submitClick.emit({
        approvalOperation: this.approvalOperation,
        approvalOpinion: this.approvalOpinion
      });
    }
  }
}
