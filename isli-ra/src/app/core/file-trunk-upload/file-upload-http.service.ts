import { HttpUploadReponseConvertService } from './http-upload-reponse-convert.service';
import { Injectable } from '@angular/core';
import { HttpJson, HttpHookService } from '../http';
import { IHttpHeaderService } from '../http/http-header.service';
import { HttpClient } from '@angular/common/http';
import { ImageFile } from '../image';
import { HttpMultiService } from '../http/http-multi.service';

@Injectable({
    providedIn: 'root'
})
export class FileUploadHttpService extends HttpMultiService {
    private httpJson: HttpJson;
    constructor(
        protected http: HttpClient,
        protected httpResponseConvertServ: HttpUploadReponseConvertService,
        protected httpHeaderServ: IHttpHeaderService,
        protected httpHook: HttpHookService
    ) {
        super(http, httpResponseConvertServ, httpHeaderServ, httpHook);
        this.httpJson = new HttpJson(http, httpResponseConvertServ, httpHeaderServ, httpHook);
    }

    multPost(url, formData, urlData) {
        const file: File = formData.file;
        delete formData.file;
        const imageFile = new ImageFile(file, 'file', file.name);
        return this.post(url, urlData, {}, this.buildBody(formData, [ imageFile ]));
    }

    jsonPost(url, urlParam, queryParmas, body) {
        return this.httpJson.post(url, urlParam, queryParmas, body);
    }

    private buildBody(formData, imageFiles) {
        const form = new FormData();
        formData = formData || {};
        for (const imageFile of imageFiles) {
            form.append(imageFile.alias, imageFile.file, imageFile.fileName);
        }
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                form.append(key, formData[key]);
            }
        }
        return form;
    }
}
