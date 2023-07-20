const fs = require("fs");
const os = require("os");

// 写入文件
const writeFile = (path, context) => {
  fs.writeFile(__dirname + path, context, function (err) {
    if (err) {
      throw err;
    }

    // 写入成功后读取测试
    fs.readFile(__dirname + "/index.less", "utf-8", function (err, data) {
      if (err) {
        throw err;
      }
      console.log(data);
    });
  });
};

//  追加内容
const additionalContent = (path, addContext) => {
  fs.appendFile(__dirname + path, addContext, (err) => {
    if (err) {
      console.log("出错");
    } else {
      console.log("追加内容");
    }
  });
};

// 判断文件是否存在
const judgeFileExists = (path) => {
  fs.access(__dirname + path, (err) => {
    console.log(err ? "目录/文件不存在" : "文件存在,可以进行读写");
    return err ? false : true;
  });
};

writeFile("/index.less", "//out:../css/" + "\n");
let String = `.container-ordinary{position:relative;width:100%;z-index:1;.button{position:relative;z-index:1;}.text{position:relative;font-size:20px;color:blue;z-index:1;}.input{position:relative;z-index:1;}}`;
// additionalContent("/index.less", "\n");
additionalContent("/index.less", String);

// export { writeFile, additionalContent, judgeFileExists };
