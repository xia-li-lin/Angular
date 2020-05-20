import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

import { PictureService, Picture } from 'src/app/service';
import { ImageVaildOptions, AppState, IMAGE_ERROE, clickWaitHttp, clickOnce } from 'src/app/core';

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: [ './picture-list.component.scss' ],
  providers: [ ConfirmationService ]
})
export class PictureListComponent implements OnInit {
  public pictureListData: Array<Picture>;
  public imageVaildOptions = new ImageVaildOptions();

  constructor(
    private pictureService: PictureService,
    private appState: AppState,
    private confirmationService: ConfirmationService,
    private translateService: TranslateService
  ) {
    this.imageVaildOptions.wdithHeights = [];
    this.imageVaildOptions.validError = this.validImage.bind(this);
  }

  ngOnInit() {
    this.getPictureList();
  }

  @clickWaitHttp('handleFileUploaderChange')
  public handleFileUploaderChange(event: UIEvent, id: number, langCode: string) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    if (!target.files[0]) {
      return;
    }
    return this.pictureService
      .uploadImage(
        target.files[0],
        id,
        langCode || this.appState.get('language'),
        target.files[0].name,
        this.imageVaildOptions
      )
      .success((res) => {
        this.pictureService.enableImage(res.data.imgId, res.data.url).success(() => {
          this.confirmationService.confirm({
            message: this.translateService.instant('siteManager.picture.list.dialog.content'),
            accept: () => {}
          });
        });
        this.getPictureList();
      })
      .error((res) => {
        console.log('fail', res);
      });
  }

  @clickOnce()
  public handerUploader(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  // 列表
  private getPictureList() {
    this.pictureService
      .getImageList()
      .success((res) => {
        this.pictureListData = res.data;
      })
      .error((res) => {
        console.log(res);
      });
  }

  private validImage(error: IMAGE_ERROE) {}
}
