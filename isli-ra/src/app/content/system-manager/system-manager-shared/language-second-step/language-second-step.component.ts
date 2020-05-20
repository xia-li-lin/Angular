import { Component, OnInit, Input, Output, EventEmitter, Injector, forwardRef } from '@angular/core';
import { PictureService, STEP } from 'src/app/service';
import { ImageVaildOptions, IMAGE_ERROE, AppState, clickOnce, clickWaitHttp } from 'src/app/core';
import { NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-second-step',
  templateUrl: './language-second-step.component.html',
  styleUrls: [ './language-second-step.component.scss' ]
})
export class LanguageSecondStepComponent implements OnInit {
  @Output() OnStepClick: EventEmitter<any> = new EventEmitter();
  @Output() OnUpdateHomeBckgroundClick: EventEmitter<any> = new EventEmitter();

  @Input() homeBackgroundData: Array<any> = [ {} ];

  public imageVaildOptions = new ImageVaildOptions();

  constructor(
    private pictureService: PictureService,
    private appState: AppState,
    private messageService: MessageService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {}

  @clickOnce()
  getImages(urlAddress: string) {
    return [
      {
        source: urlAddress,
        thumbnail: urlAddress,
        title: ''
      }
    ];
  }

  @clickWaitHttp('handleFileChange')
  handleFileChange(event: UIEvent, imgId: number, langCode: string) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    if (!target.files[0]) {
      return;
    }
    const fileType = target.files[0].name.split('.').pop().toLowerCase();
    if ([ 'jpg', 'jpeg', 'png', 'bmp' ].indexOf(fileType) === -1) {
      this.messageService.add({
        severity: 'error',
        summary: this.translateService.instant('systemShared.imgTips')
      });
      return true;
    }
    this.pictureService
      .uploadImage(
        target.files[0],
        imgId,
        langCode || this.appState.get('language'),
        target.files[0].name,
        this.imageVaildOptions
      )
      .success((res) => {
        console.log('success', res);
        this.pictureService.enableImage(res.data.imgId, res.data.url).success(() => {
          this.OnUpdateHomeBckgroundClick.emit();
        });
      })
      .error((res) => {
        console.log('fail', res);
      });
  }

  handlePreClick() {
    this.OnStepClick.emit(STEP.FIRST);
  }

  handleNextClick() {
    this.OnStepClick.emit(STEP.THIRD);
  }
}
