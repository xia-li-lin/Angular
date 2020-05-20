import * as forge from 'node-forge';

export class FileTrunkManager {
  private file: File;
  private startOffset;
  private endOffset;
  private currentOffset;

  private trunkSize = 1024 * 1024; // 初始 1MB
  private minTrunkSize = 1024 * 1024; // 最小1MB
  private maxTrunkSize = 1024 * 1024 * 16; // 最大16MB

  constructor(file: File, startOffset = 0, endOffset = 0) {
    this.file = file;
    this.startOffset = startOffset || 0;
    this.endOffset = endOffset || file.size;
    this.currentOffset = this.startOffset;
  }

  static getFileMd5(file: File) {
    const trunkFile = file;
    const md5 = forge.md.md5.create();
    const reader = new FileReader();
    let resolveFunc;
    reader.onload = (eventFile: any) => {
      const binary = eventFile.target.result;
      const trunkMd5 = md5.update(binary).digest().toHex();
      resolveFunc(trunkMd5);
    };
    reader.readAsBinaryString(trunkFile);
    return new Promise((resovle) => {
      resolveFunc = resovle;
    });
  }

  getNextFileTrunkSize(begin: number, end: number) {
    begin = begin < 0 ? 0 : begin;
    end = end > this.file.size ? this.file.size : end;
    const trunkFile = this.file.slice(begin, end);
    const md5 = forge.md.md5.create();
    const reader = new FileReader();
    let resolveFunc;
    reader.onload = (eventFile: any) => {
      const binary = eventFile.target.result;
      const trunkMd5 = md5.update(binary).digest().toHex();
      resolveFunc({
        start_byte: begin,
        end_byte: end,
        part_md5: trunkMd5,
        file: trunkFile
      });
    };
    reader.readAsBinaryString(trunkFile);
    return new Promise((resovle) => {
      resolveFunc = resovle;
    });
  }

  getNextFileTrunk() {
    if (!this.file || this.currentOffset >= this.file.size) {
      return null;
    }
    const beginTrunk = this.currentOffset;
    let nextTrunkEnd = this.currentOffset + this.trunkSize;
    if (nextTrunkEnd > this.endOffset) {
      nextTrunkEnd = this.endOffset;
    }
    this.currentOffset = nextTrunkEnd;
    const trunkFile = this.file.slice(beginTrunk, nextTrunkEnd);
    const md5 = forge.md.md5.create();
    const reader = new FileReader();
    let resolveFunc: any;
    reader.onload = (eventFile: any) => {
      const binary = eventFile.target.result;
      const trunkMd5 = md5.update(binary).digest().toHex();
      resolveFunc({
        start_byte: beginTrunk,
        end_byte: nextTrunkEnd,
        part_md5: trunkMd5,
        file: trunkFile
      });
    };
    reader.readAsBinaryString(trunkFile);
    return new Promise((resovle) => {
      resolveFunc = resovle;
    });
  }

  adjuestTrunkSize(lastTotalCast) {
    if (lastTotalCast <= 2000) {
      this.trunkSize = this.trunkSize * 2; // 小于2s下一个块翻倍
    } else if (lastTotalCast <= 5000) {
      // 小于5s 下一块加1MB
      this.trunkSize += 1024 * 1024;
    } else if (lastTotalCast <= 8000) {
      // 超过 5s 下一块减1MB
      this.trunkSize -= 1024 * 1024;
    } else {
      this.trunkSize = this.trunkSize / 2;
    }
    if (this.trunkSize <= this.minTrunkSize) {
      this.trunkSize = this.minTrunkSize;
    } else if (this.trunkSize >= this.maxTrunkSize) {
      this.trunkSize = this.maxTrunkSize;
    }
  }
}
