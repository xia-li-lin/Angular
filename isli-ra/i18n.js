const readline = require('readline');
const os = require('os');
const fs = require('fs');
const path = require('path');
const io = readline.createInterface(process.stdin, process.stdout);

const defaultParams = { sname: '.+\\.json', path: './src/assets/i18n' };

function propmt() {
  io.write('--sname: 要处理的源文件名称,支持正则表达式, 默认值：*.json' + os.EOL);
  io.write('--path: 要处理文件所在目录，默认值：./assets/i18n' + os.EOL);
  io.write('--dest: 处理结果输入出文件' + os.EOL);
}

function checkArgs(args) {
  if (args.length < 3 || args.indexOf('--help') !== -1 || args.indexOf('-h') !== -1) {
    return false;
  }
  let index = args.filter((elem) => elem.indexOf('--dest') !== -1).length;
  return index > 0;
}

function formatArgs(args) {
  const formatArg = Object.assign({}, defaultParams);
  let index = args.findIndex((elem) => elem.indexOf('--sname') !== -1);
  if (index !== -1) {
    formatArg.sname = args[index].split('=').pop();
  }
  index = args.findIndex((elem) => elem.indexOf('--path') !== -1);
  if (index !== -1) {
    formatArg.path = args[index].split('=').pop();
  }
  index = args.findIndex((elem) => elem.indexOf('--dest') !== -1);
  if (index !== -1) {
    formatArg.dest = args[index].split('=').pop();
  }
  return formatArg;
}

async function getFiles(dirPath, sname) {
  return new Promise((reslove, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const filesMath = [];
        for (const file of files) {
          if (sname.test(file)) {
            filesMath.push(file);
          }
        }
        reslove(filesMath);
      }
    });
  });
}

async function getI18nJsonFormFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data.toString('utf8')));
      }
    });
  });
}

function copyObjToDest(dest, src) {
  if (typeof src !== 'object') {
    console.log('src should be a object', src);
    return;
  }
  for (let name in src) {
    if (!dest[name]) {
      dest[name] = {};
    }
    if (src[name] && typeof src[name] === 'object') {
      copyObjToDest(dest[name], src[name]);
    } else {
      dest[name] = src[name];
    }
  }
}

function exit() {
  io.close();
  return 0;
}

function stringify(node, level = 1) {
  if (typeof node !== 'object') {
    return JSON.stringify(node);
  }

  const out = [];
  const keys = Object.keys(node).sort();
  const selfIndex = keys.indexOf('self');

  if (selfIndex > -1) {
    const tmp = keys[0];
    keys[0] = keys[selfIndex];
    keys[selfIndex] = tmp;
  }

  keys.forEach((key) => {
    const value = stringify(node[key], level + 1);

    out.push('\n' + ' '.repeat(2 * level) + '"' + key + '": ' + value);
  });

  return '{' + out.join(',') + '\n' + ' '.repeat(2 * (level - 1)) + '}';
}

async function main() {
  const args = process.argv;
  if (!checkArgs(args)) {
    propmt();
    return exit();
  }
  const formatArg = formatArgs(args);
  io.write('all parameters: ' + JSON.stringify(formatArg, null, 3) + os.EOL);
  files = await getFiles(formatArg.path, new RegExp(formatArg.sname)).catch((err) => {
    io.write('open dir path: ' + formatArg.path + ' with error: ' + err);
  });
  io.write('get files: ' + JSON.stringify(files, null, 3) + os.EOL);
  let i18ns = {};
  const destIndex = files.findIndex((elem) => elem === formatArg.dest);
  if (destIndex !== -1) {
    const fileJson = await getI18nJsonFormFile(path.join(formatArg.path, formatArg.dest)).catch((err) => {
      console.log('json parse err:', err);
    });
    copyObjToDest(i18ns, fileJson);
  }
  for (const file of files) {
    if (file === formatArg.dest) {
      continue;
    }
    const fileJson = await getI18nJsonFormFile(path.join(formatArg.path, file)).catch((err) => {
      console.log('json parse err:', err);
    });
    copyObjToDest(i18ns, fileJson);
  }
  // console.log(JSON.stringify(i18ns, null, 3));
  fs.writeFile(path.join(formatArg.path, formatArg.dest), stringify(i18ns), (err) => {
    if (err) {
      console.log('write file err:', err);
    }
    exit();
  });
}

main();
