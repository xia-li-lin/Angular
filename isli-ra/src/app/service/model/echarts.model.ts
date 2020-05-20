// 显示datazoom固定条数
export const DATA_ZOOM_LEN = 10;

// 控制dataZoom显示固定条数数据
export function computedPosition(xDataLength: number) {
  return 100 - Math.floor(DATA_ZOOM_LEN / xDataLength * 100);
}

// 柱状图
export const BAR_OPTIONS = {
  color: [ '#218cdd' ],
  title: {
    text: '',
    show: false
  },
  textStyle: {
    color: '#9EA6AC',
    fontFamily: 'SourceHanSansSC-Regular',
    fontSize: 13,
    lineHeight: 19
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{b}: {c}',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    // left: '0',
    // right: '0',
    bottom: 50,
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      // 坐标轴斜着显示
      axisLabel: {
        color: '#9EA6AC',
        interval: 0,
        rotate: 40,
        formatter: (value) => {
          let texts = value;
          if (texts.length > 10) {
            texts = texts.substr(0, 9) + '...';
          }
          return texts;
        }
      },
      triggerEvent: true,
      axisTick: {
        alignWithLabel: true,
        lineStyle: { color: 'rgb(150,150,150)' } // x轴刻度的颜色
      },
      axisLine: {
        lineStyle: {
          // x轴坐标轴颜色
          color: '#DADBE0'
        }
      }
    }
  ],
  yAxis: [
    {
      name: '',
      type: 'value',
      axisLabel: {
        color: '#9EA6AC',
        show: true,
        formatter: (value) => {
          let texts = value;
          if (texts.length > 10) {
            texts = texts.substr(0, 9) + '...';
          }
          return texts;
        }
      }, // y轴字体颜色
      splitArea: { show: false }, // 去除网格区域
      splitLine: { show: false }, // 去除网格线
      axisLine: {
        lineStyle: { color: '#DADBE0' } // y轴坐标轴颜色
      },
      axisTick: {
        lineStyle: { color: '#9EA6AC' } // y轴坐标刻度颜色
      }
    }
  ],
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'top',
    feature: {
      dataZoom: {
        show: false,
        yAxisIndex: 'none'
      },
      myDown: {
        show: false,
        type: 'jpeg',
        title: '图片下载',
        pixelRatio: '5',
        icon: 'M4.7,22.9L29.3,45.5L54.7,23.4M4.6,43.6L4.6,58L53.8,58L53.8,43.6M29.2,45.1L29.2,0'
      }
    }
  },
  dataZoom: [
    {
      type: 'slider',
      show: true,
      xAxisIndex: [ 0 ],
      start: 0,
      end: 100,
      handleSize: 8,
      zoomLock: true
    },
    {
      type: 'inside',
      xAxisIndex: [ 0 ],
      start: 0,
      end: 100,
      zoomLock: true
    }
  ],
  series: [
    {
      type: 'bar',
      // barWidth: '60%',
      label: {
        normal: {
          formatter: (params) => {
            return params;
          }
        }
      }
    }
  ]
};

// 世界地图
export const MAP_OPTIONS = {
  title: {
    text: '',
    x: 'center',
    top: '0',
    textStyle: {
      fontWeight: 'normal',
      fontSize: 18
    },
    subtextStyle: {
      color: '#354754',
      fontWeight: 'normal',
      fontSize: 16,
      fontFamily: 'SourceHanSansSC-Medium'
    },
    show: true
  },
  tooltip: {
    trigger: 'item',
    formatter(params) {
      if (params.value[2]) {
        return params.name + ' : ' + params.value[2];
      } else {
        return params.name + ' : ' + params.value;
      }
    }
  },
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'top',
    feature: {
      myDown: {
        show: false,
        type: 'jpeg',
        title: '图片下载',
        pixelRatio: '5',
        icon: 'M4.7,22.9L29.3,45.5L54.7,23.4M4.6,43.6L4.6,58L53.8,58L53.8,43.6M29.2,45.1L29.2,0'
      }
    }
  },
  visualMap: [
    {
      bottom: 10,
      left: 10,
      pieces: [
        {
          value: 0,
          color: '#DCDFE3'
        },
        {
          gt: 1,
          lte: 9,
          color: '#BBDEFB'
        },
        {
          gt: 10,
          lte: 100,
          color: '#007BD8'
        },
        {
          gt: 100,
          color: '#002766'
        }
      ],
      outOfRange: {
        color: '#DCDFE3'
      }
    }
  ],
  series: [
    {
      type: 'map',
      mapType: 'world',
      itemStyle: {
        normal: {
          // areaColor: '#AAD5FF',
          // borderColor: 'white',
          label: {
            show: false,
            color: 'black'
          }
        }
        // emphasis: {
        //     areaColor: '#A5DABB'
        // }
      },
      zoom: 1.2
    }
  ]
};

// 中国地图
export const CHINA_MAP_OPTIONS = {
  title: {
    text: '',
    x: 'center',
    top: '0',
    textStyle: {
      fontWeight: 'normal',
      fontSize: 18
    },
    subtextStyle: {
      color: '#354754',
      fontWeight: 'normal',
      fontSize: 16,
      fontFamily: 'SourceHanSansSC-Medium'
    },
    show: true
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}<br/>{c}'
  },
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'top',
    feature: {
      myDown: {
        show: false,
        type: 'jpeg',
        title: '图片下载',
        pixelRatio: '5',
        icon: 'M4.7,22.9L29.3,45.5L54.7,23.4M4.6,43.6L4.6,58L53.8,58L53.8,43.6M29.2,45.1L29.2,0'
      }
    }
  },
  visualMap: [
    {
      bottom: 10,
      left: 10,
      pieces: [
        {
          value: 0,
          color: '#DCDFE3'
        },
        {
          gt: 1,
          lte: 9,
          color: '#BBDEFB'
        },
        {
          gt: 10,
          lte: 100,
          color: '#007BD8'
        },
        {
          gt: 100,
          color: '#002766'
        }
      ],
      outOfRange: {
        color: '#DCDFE3'
      }
    }
  ],
  series: [
    {
      name: '',
      type: 'map',
      mapType: 'china', // 自定义扩展图表类型
      label: {
        show: true
      }
    }
  ]
};

// 图片下载
export function imagedDwnLoadFn(echartsIntance, fileName) {
  if (echartsIntance) {
    const base64 = echartsIntance.getDataURL({
      type: 'jpeg',
      pixelRatio: 5,
      backgroundColor: '#fff',
      excludeComponents: [ 'toolbox', 'dataZoom' ]
    });
    console.log(base64, fileName);
    downloadFile(fileName + '.jpg', base64);
  }
}

// filename: 文件名称， content: canvas图片流地址
export function downloadFile(filename, content) {
  const base64Img = content;
  const oA = document.createElement('a');
  oA.href = base64Img;
  oA.download = filename;
  const event = document.createEvent('MouseEvents');
  event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  oA.dispatchEvent(event);
}
