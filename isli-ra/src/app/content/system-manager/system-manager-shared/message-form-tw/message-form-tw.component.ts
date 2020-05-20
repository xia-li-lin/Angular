import { Component, OnInit, ViewChild, Injector, forwardRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUpload } from 'src/app/core';
import { CommonService } from 'src/app/service/common.service';
import { MessageManager } from 'src/app/service/model/message-manager.model';

const ERROR_MSG = {
  tidingsTheme: {
    required: '請輸入消息主題，限20字'
  },
  content: {
    required: '請輸入內容，限2000字'
  },
  textLinkName: {},
  linkUrl: {},
  fileList: {}
};

@Component({
  selector: 'app-message-form-tw',
  templateUrl: './message-form-tw.component.html',
  styleUrls: [ './message-form-tw.component.scss' ]
})
export class MessageFormTwComponent implements OnInit {
  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;
  @Input() info: MessageManager;

  public errorMsg = ERROR_MSG;
  public fileError: string;
  public fileUpload: FileUpload;

  public fileTypeError = '附件格式不正确';
  public fileSizeError = '附件不能超过2M';
  public fileuploadError = '上传失败';
  public langCode = 'ZH_TW';
  public buttonText = '上传附件';
  public fileTips = '文件大小不超过2M, 支持的格式为: doc, docx, xls, xlsx, ppt, pdf, zip';

  constructor(private commonService: CommonService) {
    this.fileUpload = commonService.getUploader();
  }

  ngOnInit() {}
}
