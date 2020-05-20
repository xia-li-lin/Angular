import {
  Component,
  OnInit,
  Input,
  forwardRef,
  ViewChild,
  ElementRef,
  Injector,
  Output,
  EventEmitter,
  DoCheck,
  AfterViewInit
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl, ControlContainer } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { ImageUploadData, HttpImageUpload, ImageVaildOptions, IMAGE_ERROE, AppState } from 'src/app/core';
import { clickOnce } from 'src/app/core/cache';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: [ './file-upload.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ]
})
export class FileUploadComponent implements OnInit, ControlValueAccessor, DoCheck, AfterViewInit {
  @Output() delete = new EventEmitter();
  @Input() uploadTxt = this.translateService.instant('common.upload');
  @Input() accept = 'image/jpeg,image/png,image/bmp';
  @Input() url = '/isli/irms/manage-website/base/uploadFile/file';
  @Input() alias = 'file';
  @Input() formData = {};
  @Input() feildName = 'filePath';
  @Input() all = false;
  @Input() readonly = false;
  @Input() maxFileSzie = 1024 * 1024 * 2;
  @Input() widthHeight = [];
  @Input() allowType = [ 'jpg', 'jpeg', 'bmp', 'png' ];
  @ViewChild('fileInput', { static: true })
  fileInput: ElementRef;
  public error = false;
  public imgUrl: string;
  public stepValue = 0;

  private imageUpload: ImageUploadData;
  private valueChange = (v: string) => {};
  private touchChange = (v: string) => {};
  // tslint:disable-next-line:member-ordering
  private formControl: NgControl;

  constructor(
    private imageUploader: HttpImageUpload,
    private inject: Injector,
    private state: AppState,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    // tslint:disable-next-line: deprecation
    this.formControl = this.inject.get(NgControl);
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    this.imageUpload = new ImageUploadData(this.imageUploader, this.url, this.alias);
    this.imageUpload.setImageValidOptions(
      new ImageVaildOptions(this.validFunc.bind(this), this.maxFileSzie, this.widthHeight, this.allowType)
    );
  }

  registerOnChange(func: (_: any) => void) {
    this.valueChange = func;
  }

  registerOnTouched(func: (_: any) => void) {
    this.touchChange = func;
  }

  writeValue(imgUrl: string) {
    if (typeof imgUrl === 'string') {
      this.imgUrl = imgUrl;
    } else if (this.feildName && imgUrl && this.all) {
      this.imgUrl = imgUrl[this.feildName];
    } else {
      this.imgUrl = '';
    }
  }

  @clickOnce()
  hanldeDeleteClick(event: UIEvent) {
    event.stopPropagation();
    this.delete.emit();
    this.imgUrl = '';
    this.valueChange('');
  }

  handleFileClick() {
    if (this.readonly) {
      return;
    }
    if (!this.fileInput) {
      console.error('can not find file input element');
      return;
    }
    this.fileInput.nativeElement.click();
  }

  validFunc(error: IMAGE_ERROE) {
    if (!this.formControl) {
      return;
    }
    const control = this.formControl.control;
    if (error === IMAGE_ERROE.NO_ERRROR) {
      control.setErrors(null);
    } else if (error === IMAGE_ERROE.CONTENT_ERROR) {
      control.setErrors({ imageContentError: true });
    } else if (error === IMAGE_ERROE.FIEL_TYPE_ERROR) {
      control.setErrors({ imageFileTypeError: true });
    } else if (error === IMAGE_ERROE.SIZE_ERROR) {
      control.setErrors({ imageFileSizeError: true });
    } else if (error === IMAGE_ERROE.HEIGHT_WIDTH_ERROR) {
      control.setErrors({ imageWidthHeightError: true });
    } else {
      control.setErrors(null);
    }
  }

  handleFileChange(event: UIEvent) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    if (!target.files || !target.files[0]) {
      return;
    }
    this.imageUpload
      .setImageFile(target.files[0])
      .post({}, Object.assign({}, { uid: this.state.get('uid') }, this.formData))
      .before(() => {
        this.stepValue = 0;
      })
      .success((res) => {
        if (this.feildName && !this.all) {
          this.imgUrl = res.data[this.feildName];
          this.valueChange(this.imgUrl);
        } else {
          //   this.imgUrl = res.data;
          this.valueChange(res.data);
        }
      })
      .process((current: number, total: number) => {
        this.stepValue = Number((current / total).toFixed(2));
      })
      .after(() => {
        target.value = null;
        this.stepValue = 0;
      });
  }

  ngDoCheck(): void {
    if (!this.formControl) {
      return;
    }
    const control = this.formControl.control;
    this.error = !control.pristine && !!control.errors;
  }
}
