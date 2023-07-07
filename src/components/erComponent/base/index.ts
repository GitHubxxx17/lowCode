import * as fs from 'fs';
import * as path from 'path';

// 获取当前文件夹路径
const folderPath = __dirname;
// 获取当前文件夹下的所有文件
const files = fs.readdirSync(folderPath);

files.forEach((file) => {
  // 检查文件扩展名是否为 .tsx
  if (path.extname(file) === '.tsx') {
    // 获取文件的绝对路径
    const filePath = path.join('./', file);
    // export { import(filePath)  } 
  }
});