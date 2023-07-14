const fs = new Request("")

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
console.log(dataJson);
// console.log(dataJson);
// for (var i = 0; i < dataJson.length; i++) {
//   //循环生成
//   console.log(generate(dataJson[i]));
// }

//
const buttonStyle = (style) => {
  let display, position, zIndex;
  for (key in style) {
    //遍历数据
    switch (key) {
      case "display":
        display = style["display"];
        break;
      case "position":
        position = style["position"];
        break;
      case "zIndex":
        zIndex = style["zIndex"];
        break;
    }
  }
  return `display:${display}; position:${position}; z-index:${zIndex}`;
};

let nodes = dataJson["body"];
const generateHTml = (nodes) => {
  if (nodes instanceof Array) {
    return nodes.map((node) => {
      let children = generateHTml(node.children);
      console.log(children);
      if (node.type.includes("container")) {
        // 创建节点片段对象
        let fragment = document.createDocumentFragment();
        let target = document.createElement(`div`);
        // 设置target的属性
        target.setAttribute("type", `${node.type}`);
        // target.setAttribute("style", `${node.style}`);
        children.map((item) => {
          target.appendChild(item);
        });

        fragment.appendChild(target);
        return fragment;
      } else {
        let target = document.createElement(`${node.type}`);
        // 设置target的属性
        target.setAttribute("type", `${node.type}`);
        if (node.type == "button") {
          target.setAttribute("style", `${buttonStyle(node.style)}`);
        }
        target.innerHTML = node.children;
        return target;
      }
    });
  } else {
    return nodes; // 不是数组直接返回
  }
};

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
