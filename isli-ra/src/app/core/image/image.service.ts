import { Injectable } from '@angular/core';
import { HttpImageUpload, ImageFile } from './http-image-upload';
import { HttpResponse } from '../http';

export class ImageVaildOptions {
  constructor(
    public validError?: ValidFunc,
    public maxFileSize = 1024 * 1024 * 20,
    public wdithHeights = [ { width: 800, height: 600, max: false } ],
    public allowedType = [ 'jpg', 'jpeg', 'bmp', 'png' ]
  ) {}
}

export class ImageResponse {
  constructor(
    public resultCode: string,
    public resultMsg: string,
    public imageId: string,
    public imageUrl: string,
    public thumbnailUrl: string,
    public hrefUrl?: string,
    public sort?: number
  ) {}
}

export enum IMAGE_ERROE {
  NO_ERRROR,
  HEIGHT_WIDTH_ERROR,
  SIZE_ERROR,
  FIEL_TYPE_ERROR,
  CONTENT_ERROR
}

export type ValidFunc = (error: IMAGE_ERROE) => void;

export class ImageUploadData {
  private width = 0;
  private height = 0;
  private fileType = 'jpg';
  protected validResult = true;
  private fileSize = 0;

  protected options: ImageVaildOptions;
  protected vaildPromise;
  protected imageFile: File;

  constructor(private imageUploader: HttpImageUpload, private url: string, protected imageAlias = 'imageFile') {}

  setImageFile(imageFile: File) {
    this.imageFile = imageFile;
    this.fileSize = imageFile.size;
    this.fileType = imageFile.name.split('.').pop().toLowerCase();
    const image = new Image();
    const oFReader = new FileReader();
    let resolveFunc;
    this.vaildPromise = new Promise((resolve) => {
      resolveFunc = resolve;
    });
    oFReader.onload = (ofEvent: any) => {
      image.src = ofEvent.target.result;
    };
    image.onload = () => {
      this.width = image.width;
      this.height = image.height;
      this.valid();
      resolveFunc(true);
    };

    image.onerror = () => {
      if (this.options.validError) {
        this.options.validError(IMAGE_ERROE.CONTENT_ERROR);
      }
      this.validResult = false;
      resolveFunc(false);
    };
    oFReader.readAsDataURL(imageFile);
    return this;
  }

  formatImageFile(fileBase64: string, width?: number, height?: number, fileSize?: number, imageName = 'picture') {
    try {
      this.fileSize = fileSize;
      const dataURIPattern = /^data:((.*?)(;charset=.*?)?)(;base64)?,/;
      const macthes = fileBase64.match(dataURIPattern);
      if (!macthes) {
        this.valid();
        return false;
      }
      if (width) {
        this.width = width;
      }
      if (height) {
        this.height = height;
      }
      const imgStr = fileBase64.substr(macthes[0].length);
      const byteString = atob(imgStr);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      let fileType = macthes[1].split('/').pop();
      this.fileType = fileType.toLowerCase();
      fileType = '.' + fileType;
      imageName = imageName.replace(fileType, '');
      this.imageFile = new File([ ab ], imageName + fileType, { type: macthes[1] });
      this.fileSize = this.imageFile.size;
      if (!width || !height) {
        this.setImageFile(this.imageFile);
      } else {
        this.valid();
      }
    } catch (e) {
      console.error(e);
    }
    return this;
  }

  valid() {
    this.vaildPromise = undefined;
    let error = IMAGE_ERROE.NO_ERRROR;
    if (this.options.maxFileSize < this.fileSize) {
      error = IMAGE_ERROE.SIZE_ERROR;
    } else if (this.options.allowedType && this.options.allowedType.indexOf(this.fileType) === -1) {
      error = IMAGE_ERROE.FIEL_TYPE_ERROR;
    }
    const oks = this.options.wdithHeights.filter((elem) => {
      if (elem.max) {
        return elem.width >= this.width && elem.height >= this.height;
      } else {
        return elem.width <= this.width && elem.height <= this.height;
      }
    });
    if (!oks.length && this.options.wdithHeights.length) {
      error = IMAGE_ERROE.HEIGHT_WIDTH_ERROR;
    }

    if (this.options.validError) {
      this.options.validError(error);
    }

    if (error !== IMAGE_ERROE.NO_ERRROR) {
      this.validResult = false;
      return false;
    }
    this.validResult = true;
    return true;
  }

  post(formData, urlData): HttpResponse<any> {
    const imageFile = new ImageFile(this.imageFile, this.imageAlias, this.imageFile && this.imageFile.name);
    return this.imageUploader
      .post(this.url, urlData, [ imageFile ], formData)
      .before(() => {
        if (!this.validResult) {
          return true;
        }
      })
      .delay(this.vaildPromise);
  }

  put(formData, urlData) {
    const imageFile = new ImageFile(this.imageFile, this.imageAlias, this.imageFile && this.imageFile.name);
    return this.imageUploader
      .put(this.url, urlData, [ imageFile ], formData)
      .before(() => {
        if (!this.validResult) {
          return true;
        }
      })
      .delay(this.vaildPromise);
  }

  setImageValidOptions(options: ImageVaildOptions) {
    this.options = Object.assign({}, this.options, options);
    return this;
  }
}
