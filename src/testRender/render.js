// import { writeFile, additionalContent, judgeFileExists } from "./less/wirte.js";

// 将逗号转换为分号
const replaceCommasWithSemicolon = (string) => {
  let pattern = /,/g;
  let replacement = ";";
  return string.replace(pattern, replacement);
};

// 在最后一个花括号前面追加内容
const addContentBeforeCurlyBraces = (sting, addContext) => {
  // const regex = /(?=\})/;
  const regex = /(?=\}(?!.*\}))/;
  return sting.replace(regex, addContext);
};

// 追加内容
const addContentTail = (sting, addContext) => {
  return sting + "\n" + addContext;
};

// 去除引号
const removeQuotationMarks = (string) => {
  // const regex = /"([^"]+)"(?=:)/g; // 将冒号前的两个冒号去掉
  const regex = /"/g;
  return string.replace(regex, "");
};

// 将大写字母变成小写并且后面追加一个-
const uptoLow = (sting) => {
  return sting.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
};

// 获取json文件数据
const loadData = (name) => {
  let xhr = new XMLHttpRequest();
  //   HTML文档的格式要与流中的读取格式设置一致
  let okStatus = document.location.protocol === "file:" ? 0 : 200;
  xhr.open("GET", name, false);
  xhr.overrideMimeType("text/html;charset=utf-8"); //默认为utf-8
  xhr.send(null);
  return xhr.status === okStatus ? xhr.responseText : null;
};

//获取CSS选择器
const $ = (selectors) => {
  if (document.querySelectorAll(selectors).length != 1)
    return document.querySelectorAll(selectors);
  else return document.querySelector(selectors);
};

// 生成html字符串

let dataStr = loadData("./data.json");
let dataJson = JSON.parse(dataStr);
// console.log(dataJson);

const formatStyle = (name, style) => {
  let newStyle = replaceCommasWithSemicolon(JSON.stringify(style));
  return `.${name}` + addContentBeforeCurlyBraces(newStyle, ";");
};

let nodes = dataJson["body"];
const generateHTml = (nodes) => {
  if (nodes instanceof Array) {
    return nodes.map((node) => {
      let children = generateHTml(node.children);
      if (node.type.includes("container")) {
        // 创建节点片段对象
        let fragment = document.createDocumentFragment();
        let target = document.createElement(`div`);
        // 设置target的属性
        target.setAttribute("type", `${node.type}`);
        target.setAttribute("class", `${node.type}`);
        children.map((item) => {
          target.appendChild(item);
        });

        fragment.appendChild(target);
        return fragment;
      } else {
        let target = document.createElement(`${node.type}`);
        // 设置target的属性
        target.setAttribute("type", `${node.type}`);
        // if (node.type == "button") {
        // target.setAttribute("style", `${buttonStyle(node.type, node.style)}`);
        // }
        target.setAttribute("class", `${node.type}`);
        target.innerHTML = node.children;
        return target;
      }
    });
  } else {
    return nodes; // 不是数组直接返回
  }
};

const generateStyle = (nodes) => {
  if (nodes instanceof Array) {
    return nodes.map((node) => {
      let childrenStyle = generateStyle(node.children);
      console.log(childrenStyle);
      if (node.type.includes("container")) {
        let parentStyle = formatStyle(node.type, node.style);
        childrenStyle.map((item) => {
          parentStyle = addContentBeforeCurlyBraces(parentStyle, item);
          console.log(parentStyle);
        });
        return parentStyle;
      } else {
        return formatStyle(node.type, node.style);
      }
    });
  } else {
    return nodes; // 不是数组直接返回
  }
};

let aaa = generateStyle(dataJson["body"])[0];
console.log(uptoLow(removeQuotationMarks(aaa)));

let temp = generateHTml(dataJson["body"]);
console.log(temp);
temp.forEach((element) => {
  $("body").appendChild(element);
});

// createdocumentfragment()方法创建了一虚拟的节点对象，节点对象包含所有属性和方法。
// 可以用于创建文档片段对象
// var fragment = document.createDocumentFragment();
// li = document.createElement("li");
// li.className = "xiaoli";
// li.innerHTML = "text";
// fragment.appendChild(li);
// // 添加内容：innerHTML
// // 设置属性：setAttribute("type", "button")
// $("body").appendChild(fragment);
