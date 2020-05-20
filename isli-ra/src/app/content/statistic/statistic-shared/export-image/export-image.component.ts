import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-export-image',
  templateUrl: './export-image.component.html',
  styleUrls: [ './export-image.component.scss' ]
})
export class ExportImageComponent implements OnInit {
  public canvasImg: any = '';

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    const shareContent = document.getElementById('mainTable'); // 需要截图的包裹的（原生的）DOM 对象
    const width = shareContent.offsetWidth; // 获取dom 宽度
    const height = shareContent.offsetHeight; // 获取dom 高度
    const canvas = document.createElement('canvas'); // 创建一个canvas节点
    const scale = 1; // 定义任意放大倍数 支持小数
    canvas.width = width * scale; // 定义canvas 宽度 * 缩放
    canvas.height = height * scale; // 定义canvas高度 *缩放
    canvas.getContext('2d').scale(scale, scale); // 获取context,设置scale
    const opts = {
      scale, // 添加的scale 参数
      canvas, // 自定义 canvas
      logging: true, // 日志开关
      width, // dom 原始宽度
      height // dom 原始高度
    };
    // tslint:disable-next-line:no-shadowed-variable
    html2canvas(shareContent, opts).then((canvas) => {
      this.canvasImg = canvas.toDataURL('image/png');
      console.log(canvas);
    });
  }

  takeScreenShot() {
    // 使用html2canvas插件，将数据源中的数据转换成画布。
    html2canvas(document.querySelector('#mainTable')).then((canvas) => {
      // 修改生成的宽度
      canvas.style.width = '1000px';
      this.canvasImg = canvas.toDataURL('image/png');
    });
  }

  // filename: 文件名称， content: canvas图片流地址
  downloadFile(filename, content) {
    const base64Img = content;
    const oA = document.createElement('a');
    oA.href = base64Img;
    oA.download = filename;
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    oA.dispatchEvent(event);
  }

  // 方法调用
  saveImgLocal() {
    this.downloadFile(this.translateService.instant('common.export'), this.canvasImg);
  }
}
