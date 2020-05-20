import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { STEP, ContentService, Content } from 'src/app/service';
import { clickWaitHttp, clickOnce } from 'src/app/core';

@Component({
  selector: 'app-language-third-step',
  templateUrl: './language-third-step.component.html',
  styleUrls: [ './language-third-step.component.scss' ]
})
export class LanguageThirdStepComponent implements OnInit {
  @Output() OnStepClick: EventEmitter<any> = new EventEmitter();

  @Input() contentData: Array<any>;

  public showEditFlag: boolean;
  public itemContentDetail: any;
  public itemContent: Content;

  constructor(private contentServ: ContentService) {}

  ngOnInit() {}

  handlePreClick() {
    this.OnStepClick.emit(STEP.SECOND);
  }

  handleNextClick() {
    this.OnStepClick.emit(STEP.LAST);
  }

  @clickWaitHttp('handleContentEditor')
  handleEditClick(rowData) {
    this.contentServ.getContentById(rowData.contentId).success((res) => {
      this.itemContent = res.data;
      this.itemContentDetail = res.data.contentDetail.contentDetail;
      this.showEditFlag = true;
    });
  }

  @clickWaitHttp('handleSaveClick')
  handleSaveClick(content) {
    this.itemContent.contentDetail.contentDetail = content;
    this.contentServ.updateContent(this.itemContent).success((res) => {
      this.showEditFlag = false;
    });
  }

  handleCancelClick() {
    this.showEditFlag = false;
  }
}
