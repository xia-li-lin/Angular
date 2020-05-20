import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpUploadReponseConvertService } from './http-upload-reponse-convert.service';
import { FileUploadHttpService } from './file-upload-http.service';
import { FileTrunkUploadManager } from './file-trunk-upload-manager.service';

@NgModule({
    imports: [ CommonModule ],
    declarations: [],
    providers: [ HttpUploadReponseConvertService, FileUploadHttpService, FileTrunkUploadManager ]
})
export class FileTrunkUploadModule {}
