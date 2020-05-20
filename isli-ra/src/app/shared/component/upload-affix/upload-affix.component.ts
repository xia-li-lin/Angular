import { Component, OnInit, Input, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { CommonService } from 'src/app/service/common.service';
import { FileUpload } from 'src/app/core';

@Component({
  selector: 'app-upload-affix',
  templateUrl: './upload-affix.component.html',
  styleUrls: [ './upload-affix.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadAffixComponent),
      multi: true
    }
  ]
})
export class UploadAffixComponent implements OnInit {
  @Input() fileTypeError = this.translateService.instant('common.uploadAffix.fileTypeError');
  @Input() fileSizeError = this.translateService.instant('common.uploadAffix.fileSizeError');
  @Input() fileuploadError = this.translateService.instant('common.uploadAffix.fileuploadError');
  @Input() langCode = 'ZH_TW';
  @Input() buttonText = this.translateService.instant('common.uploadAffix.buttonText');
  @Input() fileTips = this.translateService.instant('common.uploadAffix.fileTips');
  @Input() xfileId = 'xfile';
  @ViewChild('fileInput', { static: true })
  fileInput: ElementRef;

  public fileList: Array<any>;
  public fileError: string;
  public fileUpload: FileUpload;

  private change = (value: any) => {};

  constructor(private commonService: CommonService, private translateService: TranslateService) {
    this.fileUpload = commonService.getUploader();
  }

  ngOnInit() {}

  registerOnChange(fn) {
    this.change = fn;
  }

  registerOnTouched(fn) {}

  writeValue(fileList: any) {
    this.fileList = fileList;
  }

  handleDeleteClick(index: number) {
    console.log(index);
    this.fileList.splice(index, 1);
    this.fileInput.nativeElement.value = '';
  }

  handleFileChange(event: UIEvent) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    if (!target.files || !target.files[0]) {
      return;
    }
    const file = target.files[0];
    this.fileUpload
      .setFile(file)
      .post(null, {})
      .before(() => {
        const size = file.size / 1024 / 1024;
        const fileType = file.name.split('.').pop().toLowerCase();
        if (size > 2) {
          this.fileError = this.fileSizeError;
          return true;
        } else if ([ 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pdf', 'zip' ].indexOf(fileType) === -1) {
          this.fileError = this.fileTypeError;
          return true;
        }
      })
      .after((res) => {
        if (res && res.success) {
          this.fileError = '';
        }
      })
      .success((response) => {
        console.log(response);
        this.fileList = this.fileList || [];
        this.fileList.push({
          fileName: response.data.fileName,
          filePath: response.data.filePath,
          langCode: this.langCode
        });
        console.log('file list----', this.fileList);
        this.change(this.fileList);
      })
      .error((error) => {
        this.fileError = this.fileuploadError;
      });
  }
}
