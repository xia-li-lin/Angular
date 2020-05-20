import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FqManagerReplay } from 'src/app/service';
import { clickOnce } from 'src/app/core';

@Component({
  selector: 'app-fq-manager-replay',
  templateUrl: './fq-manager-replay.component.html',
  styleUrls: [ './fq-manager-replay.component.scss' ]
})
export class FqManagerReplayComponent implements OnInit {
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() hideShow = new EventEmitter();

  @Input() fqManagerReplay = new FqManagerReplay();

  public questionReplay = false;

  constructor() {}

  ngOnInit() {}

  // 编辑取消
  handleCancel() {
    this.questionReplay = false;
  }

  // 删除
  handleDeleteClick() {
    this.delete.emit(this.fqManagerReplay);
  }

  // 编辑
  @clickOnce()
  handleEditClick() {
    this.questionReplay = true;
  }

  //  显示隐藏
  handleHideShow() {
    this.hideShow.emit(this.fqManagerReplay);
  }

  handleSave(content: string) {
    this.fqManagerReplay.replayContent = content;
    this.edit.emit(this.fqManagerReplay);
  }
}
