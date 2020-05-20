import { Injectable } from '@angular/core';
import { HttpJson, HttpResponse, HttpImageUpload, ImageUploadData, ImageVaildOptions, AppState } from 'src/app/core';
import { Picture, WelcomeImage } from '../model';

const HTTP_GET_IMAGE_LIST = '/isli/irms/manage-website/base/welcomeImage/v1/images';
const HTTP_GET_IAMGE_LIST_BY_LANGCODE = '/isli/irms/manage-website/base/welcomeImage/image/{langCode}';
const HTTP_POST_IMAGE_UPLOAD = '/isli/irms/manage-website/base/welcomeImage/imageNew';
const HTTP_POST_IMAGE_ENABLE = '/isli/irms/manage-website/base/welcomeImage/enableImg';

@Injectable({ providedIn: 'root' })
export class PictureService {
  constructor(private http: HttpJson, private imageUploadServ: HttpImageUpload, private stateServ: AppState) {}

  getImageList(): HttpResponse<Array<Picture>> {
    return this.http.get(HTTP_GET_IMAGE_LIST);
  }

  getImageForLangCode(langCode?: string) {
    return this.http.get(HTTP_GET_IAMGE_LIST_BY_LANGCODE, { langCode: langCode || this.stateServ.get('language') });
  }

  /**
   *
   * @param imageFile 新上传的文件
   * @param imgId  被替换图片的ID
   * @param langCode 页面语种
   * @param imageName 新上传文件的名称
   * @param options 图片验证配置
   */
  uploadImage(
    imageFile: File,
    imgId: number,
    langCode: string,
    imageName: string,
    options?: ImageVaildOptions
  ): HttpResponse<WelcomeImage> {
    return new ImageUploadData(this.imageUploadServ, HTTP_POST_IMAGE_UPLOAD, 'image')
      .setImageValidOptions(options || ({} as any))
      .setImageFile(imageFile)
      .post({ adName: imageName, oldImgId: imgId, langCode }, {});
  }

  enableImage(imgId: number, url: string) {
    return this.http.post(HTTP_POST_IMAGE_ENABLE, {}, {}, [ { imgId, urlAddress: url } ]);
  }
}
