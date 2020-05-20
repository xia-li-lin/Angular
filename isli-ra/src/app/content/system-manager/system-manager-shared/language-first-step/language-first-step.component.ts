import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { NavigationService, STEP, NodeI18n } from 'src/app/service';
import { CommonFuncService, AppState, clickOnce } from 'src/app/core';

@Component({
  selector: 'app-language-first-step',
  templateUrl: './language-first-step.component.html',
  styleUrls: [ './language-first-step.component.scss' ]
})
export class LanguageFirstStepComponent implements OnInit {
  @Output() OnNextClick: EventEmitter<any> = new EventEmitter();

  @Input() languageListStandradData: Array<any>;
  @Input() languageListData: Array<any>;
  @Input() langCode: string;

  public errorFlag: boolean;
  private dataChange = false;

  constructor(private navigationService: NavigationService, private appState: AppState) {}

  ngOnInit() {}

  handleDataChange() {
    this.dataChange = true;
  }

  handleNextClick() {
    if (!this.dataChange) {
      this.OnNextClick.emit(STEP.SECOND);
      return;
    }
    const targetData = CommonFuncService.clone(this.languageListData);
    let allData = [];
    targetData.forEach((element) => {
      allData = allData.concat(element.children);
    });
    const nameNotExistData = allData.filter((ele) => {
      return !ele.name;
    });
    console.log('targetData----', targetData);
    console.log('allData----', allData);
    console.log('nameNotExistData----', nameNotExistData);
    if (nameNotExistData.length) {
      this.errorFlag = true;
    } else {
      this.errorFlag = false;
    }
    const transData = allData.map((ele) => {
      return new NodeI18n(null, ele.id, this.langCode, ele.name, ele.name);
    });
    if (!this.errorFlag) {
      this.navigationService.addOrUpdateTreeI18N(transData).success((res) => {
        console.log(res);
        this.OnNextClick.emit(STEP.SECOND);
      });
    }
  }
}
