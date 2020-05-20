import { FileUploadHttpService } from './file-upload-http.service';
import { FileTrunkManager } from './file-trunk-manager.service';

const enum FILE_UPLOAD_STATUS {
  WAIT,
  BEGIN,
  END
}

export class FileItemUploadService {
  private fileTrunkManager: FileTrunkManager;
  private stop = false;
  private fileuploadPromise = [];
  private status = FILE_UPLOAD_STATUS.WAIT;
  private checking = false;
  constructor(
    private file: File,
    private uploadUrl: string,
    private stateUrl: string,
    private maxUploadThread: number,
    private sessionId: string,
    private http: FileUploadHttpService,
    private fileMd5: string
  ) {
    this.fileTrunkManager = new FileTrunkManager(this.file);
  }

  public start() {
    if (this.status !== FILE_UPLOAD_STATUS.WAIT) {
      return;
    }
    for (let i = 0; i < this.maxUploadThread; i++) {
      this.startUpload(i);
    }
  }

  public delete() {
    this.stop = true;
    this.status = FILE_UPLOAD_STATUS.END;
    this.http.jsonPost(this.stateUrl, {}, {}, { session_id: this.sessionId, state: 'cancel' });
  }

  public isOver() {
    return this.stop || this.status === FILE_UPLOAD_STATUS.END;
  }

  public checkSame(fileMd5) {
    return this.fileMd5 === fileMd5 && !this.stop;
  }

  private startUpload(index) {
    if (this.stop) {
      return;
    }
    this.http
      .get(this.uploadUrl)
      .success((res) => {
        this.fileTrunkManager
          .getNextFileTrunkSize(res.data.start_offset, res.data.end_offset + 1)
          .then((fileTrunkInfo) => {
            this.uploadTrunk(fileTrunkInfo, res.data.token, index);
          });
      })
      .error((res) => {
        setTimeout(() => {
          this.startUpload(index);
        }, 5000);
      })
      .failed((res) => {
        if ([ '1001' ].indexOf(res.code) === -1) {
          setTimeout(() => {
            this.startUpload(index);
          }, 5000);
        } else {
          setTimeout(() => {
            this.checkUploadOver(); // 检查上传已经完成
          }, 5000);
        }
      });
  }

  private uploadTrunk(trunkInfo, token, taskId, index = 0) {
    if (this.stop) {
      return;
    }
    trunkInfo.token = token;
    if (index > 3) {
      console.warn('retry with three times');
      return;
    }
    console.log('uploadtrunk---', taskId, '   ', trunkInfo.file.size / 1024 / 1024);
    this.fileuploadPromise[taskId] = this.http
      .multPost(this.uploadUrl, trunkInfo, {})
      .success(() => {
        // 上传下一块文件
        this.startUpload(taskId);
      })
      .error((res) => {
        setTimeout(() => this.uploadTrunk(trunkInfo, token, taskId, index + 1), 5000);
      })
      .failed((res) => {
        console.warn('upload trunk with failed: ', res);
        if ([ '0006', '0001' ].indexOf(res.code) === -1) {
          setTimeout(() => this.startUpload(taskId), 5000);
        }
      })
      .toPromise();
  }

  private checkUploadOver() {
    Promise.all(this.fileuploadPromise).then(() => {
      this.http
        .get(this.uploadUrl)
        .before(() => {
          if (this.checking || this.status === FILE_UPLOAD_STATUS.END) {
            return true;
          }
          this.checking = true;
        })
        .success(() => {
          this.status = FILE_UPLOAD_STATUS.WAIT;
          this.start();
        })
        .error((res) => {
          setTimeout(() => {
            this.checkUploadOver();
          }, 5000);
        })
        .failed((res) => {
          if ([ '1001' ].indexOf(res.code) === -1) {
            setTimeout(() => {
              this.status = FILE_UPLOAD_STATUS.WAIT;
              this.start();
            }, 5000);
          } else {
            this.status = FILE_UPLOAD_STATUS.END;
          }
        })
        .after(() => {
          this.checking = false;
        });
    });
  }
}
