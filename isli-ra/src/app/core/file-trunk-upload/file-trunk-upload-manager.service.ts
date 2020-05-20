import { FileUploadHttpService } from './file-upload-http.service';
import { Injectable } from '@angular/core';
import { FileItemUploadService } from './file-item-upload.service';

@Injectable()
export class FileTrunkUploadManager {
  private tasks: { [key: string]: any } = {};
  constructor(private fileUploadServ: FileUploadHttpService) {}

  public addUploadTask(
    taskId: string,
    file: File,
    uploadUrl: string,
    stateUrl: string,
    sessionId: string,
    maxUploadSize: number,
    fileMd5: string
  ) {
    if (this.tasks[taskId] && this.tasks[taskId].checkSame(fileMd5)) {
      return;
    } else if (this.tasks[taskId]) {
      // 替换同一个商品的视频时， 存在一个正在上传的视频， 需要把这个视频删除
      this.tasks[taskId].delete();
    }
    const fileItemUpload = new FileItemUploadService(
      file,
      uploadUrl,
      stateUrl,
      maxUploadSize,
      sessionId,
      this.fileUploadServ,
      fileMd5
    );
    this.tasks[taskId] = fileItemUpload;
    return fileItemUpload;
  }

  public isOver() {
    let result = true;
    // tslint:disable-next-line:forin
    for (const name in this.tasks) {
      result = result && this.tasks[name].isOver();
    }
    return result;
  }

  public start(taskId) {
    if (!this.tasks[taskId]) {
      return;
    }
    this.tasks[taskId].start();
  }
}
