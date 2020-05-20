import { DropDownOption } from '../common.model';

export const SHOW_HIDE_STATUS_LIST = [
  new DropDownOption('siteManager.common.all', ''),
  new DropDownOption('siteManager.common.show', 0),
  new DropDownOption('siteManager.common.hide', 1)
];

export const FEED_BACK_STATUS = [
  new DropDownOption('common.all', ''),
  new DropDownOption('common.pending', 1),
  new DropDownOption('common.replied', 2)
];

// 格式化时间
export function formatDateTime(inputTime) {
  const date = new Date(inputTime);
  const y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? 0 + m : m;
  let d = date.getDate();
  d = d < 10 ? 0 + d : d;
  return y + '-' + m + '-' + d;
}

// 格式化上传附件提交给后台
export function formatFilePaths(filePaths) {
  return filePaths
    .map((item) => {
      return item.filePath + '>>' + item.fileName;
    })
    .join('<>');
}

export function formatFilePathsReverse(filePaths) {
  return filePaths.split('<>').map((item) => {
    return {
      fileName: item.split('>>')[1],
      filePath: item.split('>>')[0]
    };
  });
}
