import { reactive, render } from "vue";
import dragStore from "../stores/dragStore.ts";
import pinia from "../stores/index.ts";
import deepcopy from "deepcopy";
import { events } from "../utils/events.ts";
let jsonData = null; //渲染的json数据
console.log(jsonData);
function useDragger(): any {
  const dragData = dragStore(pinia); //拖拽数据
  let ghostEl = null; //影子组件
  let container = null; //父容器
  let renderEl = null; //渲染节点
  let dragEl = null; //拖拽组件
  let startX = 0; //鼠标在目标节点中的x值
  let startY = 0; //鼠标在目标节点中的y值
  // let oldContainer = null; //一开始拖拽时组件所在的容器
  let oldIndex = -1; //拖拽节点一开始的位置
  let newIndex = -1; //拖拽节点最后的位置
  let dragChildList = []; //拖拽节点当前容器所有的子节点
  let isSort = false; //是否排序
  // let isAdd = false; //是否添加进其他容器
  // let canChange = null; // 能进行交换节点或者容器
  let inlineArr = []; // 记录当前容器的每行节点情况

  /**
   *初始化函数
   */
  const init = () => {
    container?.classList.remove("chosen-container"); //移除上一个容器的选中
    if (ghostEl) ghostEl.remove(); //移除影子（后面得改成隐藏和显示）
    if (renderEl) renderEl.remove(); //移除渲染节点
    ghostEl = null;
    renderEl = null;
    container = null;
    dragData.isClone = false;
    dragData.isDrag = false;
    dragData.isDraging = false;
    document.body.removeEventListener("mousemove", DragGhostMove);
    document.body.removeEventListener("mousemove", dragMousemove);
  };

  /**
   *物料区鼠标按下事件
   * @param {*} component //物料区组件
   * @param {*} e 鼠标事件
   */
  const cloneMousedown = (component: any, e: any) => {
    mouseup(e);
    const span = findSpan(e.target);
    events.emit("cloneStart");
    dragData.isClone = true;
    dragData.selectedMaterial = component;
    createDragGhost("ghostClone", span, e); //创建拖拽的影子节点
    document.body.addEventListener("mousemove", DragGhostMove);
  };

  /**
   *页面鼠标松开事件
   * @param {*} e 鼠标事件
   */
  const mouseup = (e: any): void => {
    // 如果不是编辑区域
    if (!judgeIsMidContainer(e.target) && !dragData.isClone) return;
    //当处于克隆节点时
    if (dragData.isClone) {
      if (container) {
        let childrenData = findVnodeProps(container); //获取json子数据
        childrenData.push(deepcopy(dragData.selectedMaterial.defaultData)); //修改数据并重新渲染编辑区域
      }
      dragData.selectedMaterial = null;
      events.emit("cloneEnd");
    }
    //当处于拖拽节点时
    if (dragData.isDrag) {
      if (dragEl) {
        dragEl.style.removeProperty("visibility"); // 容器处于结束后也需要取消隐藏
        document.body.removeEventListener("mousemove", dragMousemove); //解绑鼠标移动事件，防止报错
        // 如果处于拖拽状态就相应改变
        if (dragData.isDraging) {
          applyReorder();
        }
        // 节点间重新排序
        if (isSort) {
          console.log("11111111");
          let childrenData = findVnodeProps(container); //获取json子数据
          if (oldIndex != childrenData.length - 1) {
            childrenData.splice(oldIndex, 1);
            childrenData.splice(newIndex, 0, dragData.selectedComponent); //修改数据并重新渲染编辑区域
          } else {
            childrenData.splice(
              newIndex,
              0,
              deepcopy(dragData.selectedComponent)
            ); //修改数据并重新渲染编辑区域
            childrenData.pop();
          }
          isSort = false;
        }

        dragEl.classList.remove("chosenEl");
        dragEl.onmousedown = null;
      }
      dragData.isDraging = false;
      dragEl = null;
    }
    init();
  };

  //绑定鼠标松开事件
  document.body.onmouseup = mouseup;

  /**
   *容器鼠标移入
   * @param {*} e 鼠标事件
   */
  const mouseenter = (e: any) => {
    // 克隆组件的情况
    if (dragData.isClone) {
      if (container) {
        container.classList.remove("chosen-container"); //移除上一个容器的选中
        if (renderEl) {
          container.removeChild(renderEl);
        }
      }
      container = findParentContainer(e.target); //获取容器节点
      container.classList.add("chosen-container");

      renderEl = document.createElement("div");
      renderEl.classList.add("renderEl");
      container.appendChild(
        (render(
          dragData.selectedMaterial.render(
            dragData.selectedMaterial.defaultData
          ),
          renderEl
        ),
        renderEl)
      );
    }
  };

  /**
   *容器鼠标移出
   * @param {*} e 鼠标事件
   */
  const mouseleave = (e: any) => {
    //鼠标移出
    if (dragData.isClone) {
      if (container) container.classList.remove("chosen-container"); //移除上一个容器的选中
      let newContainer = findParentContainer(e.target); //获取容器节点
      container.removeChild(renderEl);
      if (container == newContainer) {
        //鼠标移出后如果获取的容器与上一个相同则获取它的父节点容器
        container = findParentContainer(e.target.parentNode);
        container.classList.add("chosen-container");
        renderEl = document.createElement("div");
        renderEl.classList.add("renderEl");
        container.appendChild(
          (render(
            dragData.selectedMaterial.render(
              dragData.selectedMaterial.defaultData
            ),
            renderEl
          ),
          renderEl)
        );
      }
    }
  };

  /**
   * @param {*} target 目标节点
   * @return {*} 返回标签为span的父组件
   */
  const findSpan = (target: any): any => {
    //如果点到父节点就直接返回子节点
    if (target.tagName == "DIV") return target.children[0];
    if (target.tagName == "SPAN") {
      return target;
    } else {
      return findSpan(target.parentNode);
    }
  };

  /**
   * @param {*} target 目标节点
   * @return {*} 返回最近的父容器节点
   */
  const findParentContainer = (target: any): any => {
    if (target.className.includes("container")) {
      return target;
    } else {
      return findParentContainer(target.parentNode);
    }
  };

  /**
   * @param {*} target 目标节点
   * @return {*} 判断是否是中间的容器
   */
  const judgeIsMidContainer = (target: any): any => {
    if (target.parentNode == document.body) return false;
    if (target?.classList.contains("Editorcontainer")) {
      return true;
    } else {
      return judgeIsMidContainer(target.parentNode);
    }
  };

  /**
   * @param {*} target 目标容器
   * @return {*} 返回该容器的json子数据
   */
  const findVnodeProps = (target: any): any => {
    return target.attributes.childrenList;
  };

  /**
   * 点击选中节点
   * @param {*} e 鼠标事件
   */
  const onclickToDrag = (e: any) => {
    //如果点击的区域是整个编辑区域的话
    if (e.target.classList.contains("Editorcontainer")) {
      container = e.target;
      e.target.classList.add("chosen-container");
      dragData.selectedComponent = null;
      dragData.selectKey = null;
      return;
    }

    dragEl = findDragEl(e.target); //获取拖拽节点
    container = findParentContainer(dragEl.parentNode); //获取当前正在拖拽的容器
    dragEl.classList.add("chosenEl");
    container.classList.add("chosen-container");
    dragChildList = [...container.children]; //获取当前容器所有子组件
    newIndex = oldIndex = dragChildList.indexOf(dragEl); //获取拖拽组件在当前容器的位置

    dragData.isDrag = true;
    dragData.selectKey = dragEl.attributes["data-key"].nodeValue;
    dragData.containerData = findVnodeProps(container); //获取json子数据
    dragData.selectedComponent = reactive(dragData.containerData[oldIndex]);
    dragData.selectedIndex = oldIndex;

    dragEl.onmousedown = (e: any) => {
      console.log("正在交换组件中");
      dragData.isDraging = true;
      createDragGhost("ghostDrag", dragEl, e); //创建拖拽的影子节点
      dragEl.style.setProperty("visibility", "hidden");
      document.body.addEventListener("mousemove", dragMousemove);
    };
    //销毁拖拽组件相关数据
    dragData.destructionOfDrag = () => {
      if (dragData.isDrag) {
        dragData.selectKey = null;
        dragData.selectedComponent = null;
        if (ghostEl) ghostEl.remove(); //移除影子（后面得改成隐藏和显示）
        if (dragEl) {
          dragEl.style.removeProperty("visibility"); // 容器处于结束后也需要取消隐藏
          document.body.removeEventListener("mousemove", dragMousemove); //解绑鼠标移动事件，防止报错
          container?.classList.remove("chosen-container");
          dragEl.classList.remove("chosenEl");
          dragEl.onmousedown = null;
        }
        dragData.isDraging = false;
        dragData.isDrag = false;
        dragEl = null;
      }
    };
  };

  const dragMousemove = (e: any) => {
    DragGhostMove(e); //影子组件移动
    // 找到可以交换顺序的节点
    // canChange = findDragEl(e.target);
    //遍历子节点，将目标节点（不是拖拽节点）与拖拽节点交换位置
    simulateMovement(calcNewIndex(e.clientY, e.clientX));
  };

  /**
   * 找到当前拖拽行最大的高度
   * @param {*} line
   * @return {*} maxHeight
   */
  const findInlineMaxHeight = (line: number): number => {
    let maxHeight = -1; // 记录当前拖拽节点处于的行中最大的节点高度
    for (let i = 0; i < inlineArr[line].length; i++) {
      maxHeight = Math.max(
        maxHeight,
        dragChildList[inlineArr[line][i]].offsetHeight
      );
    }
    return maxHeight;
  };

  /**
   * 总结容器行内的节点个数情况
   */
  const summarizeInlineNode = () => {
    let containerWidth = container.offsetWidth; // 获取当前容器的宽度
    let calcWidth = 0; // 计算当前行已填入节点的宽度
    // let curInlineStart = 0; // 记录当前拖拽节点处于行的开始节点下标
    // let curInlineEnd = 0; // 记录当前拖拽节点处于行的结束节点下标
    let perInlineArr = []; // 每行的节点下标
    for (let i = 0; i < dragChildList.length; i++) {
      perInlineArr.push(i);
      calcWidth += dragChildList[i].offsetWidth;
      // calcWidth > containerWidth已经找到一行了 需要重新开始计算
      if (calcWidth > containerWidth) {
        perInlineArr.pop();
        inlineArr.push(perInlineArr);
        perInlineArr = [];
        // curInlineStart = i;
        calcWidth = dragChildList[i].offsetWidth;
        perInlineArr.push(i);
      }
    }
    if (perInlineArr.length != 0) {
      inlineArr.push(perInlineArr);
    }
  };

  /**
   * 计算要移动的组件的放置的最新位置(bug：超出范围会直接返回第一个的位置
   * @param {number} mouseY 鼠标Y值
   * @param {number} mouseX 鼠标X值
   * @return {*} 当前节点所在的位置
   */
  const calcNewIndex = function (mouseY: number, mouseX: number):number {
    inlineArr = [];
    summarizeInlineNode(); // 算出当前容器的每行节点情况
    let { top, left } = container.getBoundingClientRect();

    let newIndexLine = 0; // 记录鼠标位置处于当前容器的节点的第几行
    let newIndexRow = 0; // 记录鼠标位置处于 newIndexLine 的第几个节点位置
    for (let i = 0; i < inlineArr.length; i++) {
      let maxHeightTemp = findInlineMaxHeight(i);
      if (mouseY > top && mouseY <= top + maxHeightTemp) {
        newIndexLine = i;
        break;
      }
      top += maxHeightTemp;
    }
    let curOffsetWidth = 0;
    for (let i = 0; i < inlineArr[newIndexLine].length; i++) {
      curOffsetWidth = dragChildList[inlineArr[newIndexLine][i]].offsetWidth;
      if (mouseX > left && mouseX <= left + curOffsetWidth) {
        newIndexRow = i;
        break;
      }
      left += curOffsetWidth;
    }

    return inlineArr[newIndexLine][newIndexRow]; // 把鼠标（即需要移动的组件）位于的放置的最新位置返回去
  };

  // 更新容器行内的节点个数情况
  // const updateInlineNode = (curPos) => {
  //   let containerWidth = container.offsetWidth; // 获取当前容器的宽度
  //   let calcWidth = 0; // 计算当前行已填入节点的宽度
  //   let noChange = true;
  //   for (let i = 0; i < inlineArr.length; i++) {
  //     for (let j = 0; j < inlineArr[i].length; j++) {
  //       calcWidth += dragChildList[inlineArr[i][j]].offsetWidth;
  //       dragChildList[inlineArr[i][j]].style.setProperty(
  //         "transition",
  //         `transform 300ms ease`
  //       );
  //       // dragChildList[inlineArr[i][j]].style.setProperty(
  //       //   "transform",
  //       //   `translate3d(${dragEl.offsetWidth}px,0,0)`
  //       // );
  //     }
  //   }
  // };

  // 模拟移动组件
  /**
   * @param {*} curPos 被选中节点的位置
   */
  const simulateMovement = (curPos: number) => {
    if (curPos === -1 || newIndex === curPos) return;
    console.log("渲染中的节点移动");

    // 渲染中的节点移动
    dragChildList.forEach((el, index) => {
      el.style.setProperty("transition", `transform 300ms ease`);
      if (curPos > oldIndex && index > oldIndex && index <= curPos) {
        el.style.setProperty(
          "transform",
          `translate3d(-${dragEl.offsetWidth}px,0,0)`
        );
      } else if (curPos <= oldIndex && index < oldIndex && index >= curPos) {
        el.style.setProperty(
          "transform",
          `translate3d(${dragEl.offsetWidth}px,0,0)`
        );
      } else {
        el.style.setProperty("transform", `translate3d(0,0,0)`);
      }
    });
    // updateInlineNode(curPos);
    newIndex = curPos; //获取拖拽组件在当前容器的位置
  };

  // 应用组件间的重新排序
  const applyReorder = function () {
    // console.log("当前处于要交换状态的节点下标为：" + oldIndex);
    // console.log(dragChildList);
    // console.log(canChange);
    // console.log("能交换的节点的下标:" + dragChildList.indexOf(canChange));
    dragEl.style.removeProperty("visibility");
    dragChildList.forEach((el) => {
      el.style.removeProperty("transform");
      el.style.removeProperty("transition");
    });
    if (oldIndex !== newIndex) {
      isSort = true;
    }
  };

  /**找到所选中的节点
   * @param {*} target 目标节点
   * @return {*}  {*} 选中的节点
   */
  const findDragEl = (target: any): any => {
    //当节点为svg时会报错
    if (!target) return null;
    if (
      (target.className && target.className.includes("container")) ||
      (target.classList && target.classList.contains("cannotPreview"))
    )
      return target;
    else return findDragEl(target.parentNode);
  };

  /**
   * 创建拖拽的影子节点函数
   * @param {string} className 影子节点类名
   * @param {*} el 拖拽节点
   * @param {*} e 鼠标事件
   */
  const createDragGhost = (className: string, el: any, e: any) => {
    const { clientY, clientX } = e;
    const { top, left, width, height } = el.getBoundingClientRect();
    startX = clientX - left;
    startY = clientY - top;
    ghostEl = document.createElement("div");
    ghostEl.classList.add(className);
    ghostEl.style.width = `${width}px`;
    ghostEl.style.height = `${height}px`;
    ghostEl.innerHTML = el.outerHTML;
    document.body.appendChild(ghostEl);
    ghostEl.style.top = `${top}px`;
    ghostEl.style.left = `${left}px`;
  };

  /**
   *  拖拽节点移动函数
   * @param {*} { clientY, clientX } 鼠标指针的x值和y值
   */
  const DragGhostMove = ({ clientY, clientX }: any) => {
    //克隆组件时的鼠标移动
    ghostEl.style.top = `${clientY - startY}px`;
    ghostEl.style.left = `${clientX - startX}px`;
  };

  const deterWhetherToMoveUp = (fun: any): boolean => {
    let res: boolean = fun();
    return res;
  };

  return {
    cloneMousedown,
    mouseenter,
    mouseleave,
    onclickToDrag,
    deterWhetherToMoveUp,
  };
}
/**
 *设置渲染数据
 * @param {Object} data 渲染json数据
 */
export const setJsonData = (data: Object): void => {
  jsonData = reactive(data);
};

export const usedragger = useDragger();
