import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { GlobalValidService } from 'mpr-form-valid';
import { AppState } from 'src/app/core';
import { ControllWord } from 'src/app/service/model';
import calculateNodeHeight from 'src/app/shared/directive/calculateNodeHeight';

const ERROR_MSG = {
  controlledNameZh: {
    required: 'service.controlledWordManagement.config.valid.chineseName'
  },
  controlledNameEn: {
    required: 'service.controlledWordManagement.config.valid.englishName'
  },
  controlledCode: {
    required: 'service.controlledWordManagement.config.valid.propFieldName'
  },
  displayOrder: {
    required: 'service.controlledWordManagement.config.valid.sort'
  }
};

@Component({
  selector: 'app-controlled-word-add',
  templateUrl: './controlled-word-add.component.html',
  styleUrls: [ './controlled-word-add.component.scss' ]
})
export class ControlledWordAddComponent implements OnInit, AfterViewInit {
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  @Input() controllWord: ControllWord = new ControllWord();
  @Input() showSort = false;
  @Input() title: string;

  @ViewChild('dialog', null)
  dialog: ElementRef;

  public errorMsg = ERROR_MSG;
  public language: string;

  constructor(private globalValidServ: GlobalValidService, private stateServ: AppState) {
    this.language = this.stateServ.get('language');
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    const dialogHeight = calculateNodeHeight(this.dialog.nativeElement);

    if (dialogHeight % 2 !== 0) {
      this.dialog.nativeElement.style.height = dialogHeight + 1 + 'px';
    }
  }

  // 保存
  handleSaveClick() {
    console.log(this.controllWord);
    if (this.globalValidServ.validAll()) {
      this.save.emit(this.controllWord);
    }
  }
}
