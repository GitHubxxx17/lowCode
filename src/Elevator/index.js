const sliderElement = document.querySelector("#slider");
let mouseDownX = 0;
let mouseDownY = 0;
let sliderStartX = 0;
let sliderStartY = 0;
let selectedElement = undefined;
let selected = false;
let startPosition = -1;
let endPosition = -1;

document.querySelector("aside > ul").addEventListener("mousedown", (e) => {
  const target = e.target;
  //getBoundingClientRect方法返回元素的大小及其相对于视口的位置
  const { top, left } = target.getBoundingClientRect();
  console.log(target.getBoundingClientRect());
  sliderElement.classList.remove("recovering");

  if (selectedElement) {
    applyChange();
  }

  // 获取鼠标按下的位置
  mouseDownX = e.clientX;
  mouseDownY = e.clientY;
  console.log("mouseDownY:" + mouseDownY);

  // 获取当前滑块的开始坐标
  sliderStartY = top;
  sliderStartX = left;
  console.log("sliderStartY:" + sliderStartY);

  selectedElement = target;
  console.log(selectedElement);
  selected = true;
  startPosition = [...document.querySelector("aside > ul").children].indexOf(
    target
  ); // 记录开始的下标
  endPosition = startPosition;
  target.style.setProperty("visibility", "hidden"); // 设置隐藏
  sliderElement.style.setProperty("top", `${top}px`);
  sliderElement.style.setProperty("left", `${left}px`);
  sliderElement.style.setProperty("display", `flex`);
  sliderElement.innerHTML = target.innerHTML;
  console.log(1);
});

window.addEventListener("mousemove", (e) => {
  if (!selected) {
    return;
  }
  console.log(2);

  // 对滑块定位
  sliderElement.style.setProperty(
    "left",
    `${sliderStartX + e.clientX - mouseDownX}px`
  );
  sliderElement.style.setProperty(
    "top",
    `${sliderStartY + e.clientY - mouseDownY}px`
  );

  setEndPosition(calcEndPostion(e.clientY));
});

window.addEventListener("mouseup", (e) => {
  if (selected) {
    selected = false;
    hideSlider(selectedElement);
  }
});

// 计算移动到第几个滑块处
const calcEndPostion = function (mouseY) {
  const children = [...document.querySelector("aside > ul").children];
  for (let i = 0; i < children.length; i++) {
    if (mouseY > i * 60 && mouseY <= (i + 1) * 60) {
      return i;
    }
  }

  return -1;
};

const setEndPosition = function (pos) {
  // 如果没有改变的话直接返回
  if (pos === -1 || endPosition === pos) {
    return;
  }
  console.log("放置滑块");

  const children = [...document.querySelector("aside > ul").children];
  children.forEach((el, index) => {
    el.style.setProperty("transition", `transform 300ms ease`);
    // 点击的li：向下移动--剩下的li：比原先还低的li--比最终的高--向上移动
    if (pos > startPosition && index > startPosition && index <= pos) {
      console.log(
        "向下移动 pos: " +
          pos +
          " index:" +
          index +
          " startPosition:" +
          startPosition
      );
      el.style.setProperty("transform", "translateY(-100%)");
    }
    // 点击的li：向上移动--剩下的li：比原先还高的li--比最终的低--向下移动
    else if (pos <= startPosition && index < startPosition && index >= pos) {
      console.log(el);
      el.style.setProperty("transform", `translateY(100%)`);
      console.log(
        "向上移动 pos: " +
          pos +
          " index:" +
          index +
          " startPosition:" +
          startPosition
      );
    } else {
      el.style.setProperty("transform", `translateY(0)`);
    }
  });
  endPosition = pos;
};

const hideSlider = function () {
  sliderElement.classList.add("recovering");
  sliderElement.style.setProperty("left", `${sliderStartX}px`);

  sliderElement.style.setProperty("top", `${endPosition * 60}px`);
};

const applyChange = function () {
  document.querySelector("#slider").style.setProperty("display", `none`);
  selectedElement.style.removeProperty("visibility");
  const ul = document.querySelector("aside > ul");
  const children = [...ul.children];
  children.forEach((el) => {
    el.style.removeProperty("transform");
    el.style.removeProperty("transition");
  });
  if (startPosition !== endPosition) {
    // 删除选择的li
    const target = ul.removeChild(selectedElement);
    console.log(ul);
    console.log(target);
    // 添加
    if (endPosition === children.length - 1) {
      ul.appendChild(target);
    } else if (endPosition > startPosition) {
      // parentNode.insertBefore(newNode, referenceNode);
      // newNode：将要插入的节点
      // referenceNode：被参照的节点（即要插在该节点之前）
      ul.insertBefore(target, children[endPosition + 1]);
    } else {
      ul.insertBefore(target, children[endPosition]);
    }
  }
  selectedElement = undefined;
};
