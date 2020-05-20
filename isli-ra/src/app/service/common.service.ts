import { Injectable } from '@angular/core';
import {
  HttpJson,
  FileUpload,
  httpCacheForEver,
  ImageUploadData,
  HttpImageUpload,
  ImageVaildOptions,
  HttpResponse
} from '../core';
import { HttpMultiService } from '../core/http/http-multi.service';
import { WebFile } from './model';

const HTTP_GET_REGIONS = '/isli/irms/manage-block/base/uucCommon/region';
const HTTP_GET_SERVICE_CODE_LIST = '/isli/irms/manage-manager/base/serviceinfo/getServiceInfos';
const HTTP_GET_LANGUAGES = 'HTTP_GET_LANGUAGES';
const HTTP_GET_COUNTRY = 'HTTP_GET_COUNTRY';
const HTTP_GET_PROVINCE = 'HTTP_GET_PROVINCE';
const HTTP_GET_INDUSTRY = '/isli/irms/manage-block/base/uucCommon/industry';
export const FILE_UPLOAD_PATH = '/isli/irms/manage-provider/base/serviceProviderAccount/registerFile';
const HTTP_POST_IMAGE_UPLOAD = '/isli/irms/manage-provider/base/serviceProviderAccount/registerFile';
const HTTP_POST_COMMON_IMAGE = '/isli/irms/manage-website/base/uploadFile/file';
const HTTP_POST_WEBFILE_ADD = '/isli/irms/manage-website/base/webFile/addWebFile';
const HTTP_GET_DOWNLOAD_URL = '/isli/irms/manage-manager/base/serviceinfo/scPdfUrl';
const HTTP_GET_DOWNLOAD_FILE = '/isli/irms//manage-servicecode/base/scManager/V1/downloadFile';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(
    private http: HttpJson,
    private fileUploader: HttpMultiService,
    private imageUploadServ: HttpImageUpload
  ) {}

  getUserRegions() {
    return this.http.get(HTTP_GET_REGIONS);
  }

  getServiceCodeList() {
    return this.http.get(HTTP_GET_SERVICE_CODE_LIST);
  }

  // 服务说明文件上传
  getUploader(): FileUpload {
    return new FileUpload(FILE_UPLOAD_PATH, 'file', this.fileUploader);
  }

  @httpCacheForEver('getLanauages')
  getLanauages() {
    return this.http.get(HTTP_GET_LANGUAGES);
  }

  @httpCacheForEver('getCountry')
  getCountry() {
    return this.http.get(HTTP_GET_COUNTRY);
  }

  @httpCacheForEver((countryId) => {
    return 'getProvice' + countryId;
  })
  getProvince(countryId: string) {
    return this.http.get(HTTP_GET_PROVINCE, {}, { countryId });
  }

  getCompanyIndustry() {
    return this.http.get(HTTP_GET_INDUSTRY);
  }

  uploadImage(
    image: File,
    options?: ImageVaildOptions
  ): HttpResponse<{ filePath: string; fileMd5: string; fileUuid: string; fileId: number }> {
    return new ImageUploadData(this.imageUploadServ, HTTP_POST_IMAGE_UPLOAD, 'file')
      .setImageValidOptions(options || ({} as any))
      .setImageFile(image)
      .post({}, {});
  }

  uploadCommomImage(
    image: File,
    options?: ImageVaildOptions
  ): HttpResponse<{ filePath: string; fileMd5: string; fileUuid: string; fileId: number }> {
    return new ImageUploadData(this.imageUploadServ, HTTP_POST_COMMON_IMAGE, 'file')
      .setImageValidOptions(options || ({} as any))
      .setImageFile(image)
      .post({}, {});
  }

  /**
   * 上传的附件，和当前的项目相关联
   *
   */
  addWebFile(files: Array<WebFile>) {
    return this.http.post(HTTP_POST_WEBFILE_ADD, {}, {}, files);
  }

  getFileDownloadURL(uuid: string): HttpResponse<string> {
    return this.http.get(HTTP_GET_DOWNLOAD_URL, {}, { uuid });
  }

  downLoadFile(uuid: string) {
    saveAs(HTTP_GET_DOWNLOAD_FILE + '?' + this.http.formatParams({ fileUuid: uuid }));
  }
}
