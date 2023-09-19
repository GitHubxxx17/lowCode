import { reactive } from "vue";

export default class Draggable {
  containerElement = null; //容器
  rectList = []; //容器内排序节点的数据
  handle = null; //拖拽点
  drag = { element: null, index: 0, firstIndex: 0 }; //拖拽节点
  clone = { element: null }; //克隆节点
  diff = { x: null, y: null }; //计算位置
  isMouseDown = false; //是否处于拖拽状态
  dragData = null; //拖拽数据
  dragClassName = null; //拖拽类名
  cloneClassName = null; //克隆类名
  animation = ".5s";//动画时间
  constructor(options: any) {
    //构造函数
    this.containerElement = options.el;
    this.handle = options.handle;
    this.dragData = reactive(options.dragData);
    this.dragClassName = options.dragClassName;
    this.cloneClassName = options.cloneClassName;
    if (options.animation) this.animation = options.animation;
    this.init();
  }
  init() {
    //初始化函数
    this.bindEventListener();
    this.getRectList();
  }
  getRectList() {
    //获取容器内排序节点的数据
    this.rectList.length = 0;
    for (const item of this.containerElement.children) {
      this.rectList.push(item.getBoundingClientRect());
    }
  }
  onMouseDown(e: any) {
    //鼠标按下
    const { clientY, clientX, target } = e;
    if (
      target == this.containerElement ||
      !target.classList.contains(this.handle)
    )
      return;
    this.getRectList();
    this.isMouseDown = true;
    this.drag.element = this.findActionNode(target);
    this.drag.element.classList.add(this.dragClassName);
    this.clone.element = this.drag.element.cloneNode(true);
    document.body.appendChild(this.clone.element);
    this.clone.element.className = this.cloneClassName;

    const index = [].indexOf.call(
      this.containerElement.children,
      this.drag.element
    );
    this.drag.index = index;
    this.drag.firstIndex = index;

    const { top, left } = this.drag.element.getBoundingClientRect();
    this.diff.x = clientX - left;
    this.diff.y = clientY - top;
    this.clone.element.style.top = `${top}px`;
    this.clone.element.style.left = `${left}px`;

    for (const item of this.containerElement.children) {
      item.style.transition = `transform ${this.animation}`;
    }
  }
  onMouseMove(e: any) {
    //鼠标移动
    if (this.isMouseDown) {
      this.clone.element.style.top = `${e.clientY - this.diff.y}px`;

      for (let i = 0; i < this.rectList.length; i++) {
        if (
          i !== this.drag.index &&
          e.clientX > this.rectList[i].left &&
          e.clientX < this.rectList[i].right &&
          e.clientY > this.rectList[i].top &&
          e.clientY < this.rectList[i].bottom
        ) {
          if (this.drag.index < i) {
            for (let j = this.drag.index; j < i; j++) {
              if (j < this.drag.firstIndex) {
                this.containerElement.children[j].style.transform =
                  "translate3d(0px, 0px, 0)";
              } else {
                const x = this.rectList[j].left - this.rectList[j + 1].left;
                const y = this.rectList[j].top - this.rectList[j + 1].top;
                this.containerElement.children[j + 1].style.transform =
                  "translate3d(" + x + "px, " + y + "px, 0)";
              }
            }
          } else if (this.drag.index > i) {
            for (let j = i; j < this.drag.index; j++) {
              if (this.drag.firstIndex <= j) {
                this.containerElement.children[j + 1].style.transform =
                  "translate3d(0px, 0px, 0)";
              } else {
                const x = this.rectList[j + 1].left - this.rectList[j].left;
                const y = this.rectList[j + 1].top - this.rectList[j].top;
                this.containerElement.children[j].style.transform =
                  "translate3d(" + x + "px, " + y + "px, 0)";
              }
            }
          }
          const x =
            this.rectList[i].left - this.rectList[this.drag.firstIndex].left;
          const y =
            this.rectList[i].top - this.rectList[this.drag.firstIndex].top;
          this.drag.element.style.transform =
            "translate3d(" + x + "px, " + y + "px, 0)";
          this.drag.index = i;
          break;
        }
      }
    }
  }
  onMouseUp() {
    //鼠标松开
    if (this.isMouseDown) {
      this.isMouseDown = false;

      this.drag.element.classList.remove(this.dragClassName);
      this.clone.element.remove();

      for (const item of this.containerElement.children) {
        item.style = ''
      }
      let data = this.dragData[this.drag.firstIndex];
      this.dragData.splice(this.drag.firstIndex, 1);
      this.dragData.splice(this.drag.index, 0, data);
    }
  }
  bindEventListener() {
    //绑定事件
    this.containerElement.addEventListener(
      "mousedown",
      this.onMouseDown.bind(this)
    );
    this.containerElement.addEventListener(
      "mousemove",
      this.onMouseMove.bind(this)
    );
    window.addEventListener("mouseup", this.onMouseUp.bind(this));
  }
  findActionNode(target: any) {
    //寻找拖拽点所在的目标拖拽节点
    if (target.parentNode != this.containerElement) {
      return this.findActionNode(target.parentNode);
    } else {
      return target;
    }
  }
}
