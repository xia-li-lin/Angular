import { Component, OnInit, ViewChild, Injector, forwardRef, Input } from '@angular/core';
import { NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AppState, FileUpload } from 'src/app/core';
import { CommonService } from 'src/app/service/common.service';
import { MessageManager } from 'src/app/service/model/message-manager.model';

const ERROR_MSG = {
  tidingsTheme: {
    required: 'Please enter the subject of message, 100 characters limit.'
  },
  content: {
    required: 'Please enter the message, 2000 characters limit.'
  },
  textLinkName: {},
  linkUrl: {
    pattern: 'Please enter a valid URL'
  },
  fileList: {}
};

@Component({
  selector: 'app-message-form-en',
  templateUrl: './message-form-en.component.html',
  styleUrls: [ './message-form-en.component.scss' ]
})
export class MessageFormEnComponent implements OnInit {
  @ViewChild(NgForm, { read: NgForm, static: true })
  form: NgForm;

  @Input() info: MessageManager;

  public errorMsg = ERROR_MSG;
  public fileError: string;
  public fileUpload: FileUpload;
  public fileTypeError = 'Incorrect attachment format';
  public fileSizeError = 'The attachment size should be less than 2MB';
  public fileuploadError = 'Upload failed';
  public langCode = 'EN_US';
  public buttonText = 'Upload';
  public fileTips = 'File size of not more than 2M, format support: doc, docx, xls, xlsx, ppt, pdf, zip';

  constructor(private inject: Injector, private state: AppState, private commonService: CommonService) {
    this.fileUpload = commonService.getUploader();
  }

  ngOnInit() {}
}
