import { reactive, render } from "vue";
import dragStore from "../stores/dragStore.ts";
import pinia from "../stores/index.ts";
import deepcopy from "deepcopy";
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
  let oldContainer = null; //一开始拖拽时组件所在的容器
  let oldDragData = null; //拖拽节点的数据
  let oldIndex = -1; //拖拽节点一开始的位置
  let newIndex = -1; //拖拽节点最后的位置
  let dragChildList = []; //拖拽节点当前容器所有的子节点
  let isSort = false; //是否排序
  let isDraging = false; //正在拖拽中
  let isAdd = false; //是否添加进其他容器
  let canChange = null; // 能进行交换节点或者容器
  let inlineArr = []; // 记录当前容器的每行节点情况
  /**
   *物料区鼠标事件
   * @param {*} component //物料区组件
   * @param {*} e
   */
  const mousedown = (component: any, e: any) => {
    mouseup(e);
    const { clientY, clientX, target } = e;
    const span = findSpan(target);
    const { top, left } = span.getBoundingClientRect();

    startX = clientX - left;
    startY = clientY - top;
    dragData.isClone = true;
    dragData.selectedMaterial = component;
    //添加拖拽的影子
    ghostEl = document.createElement("div");
    ghostEl.classList.add("ghostClone");
    document.body.appendChild(
      (render(dragData.selectedMaterial.preview(), ghostEl), ghostEl)
    );
    ghostEl.style.top = `${top}px`;
    ghostEl.style.left = `${left}px`;

    renderEl = null;
    container = null;
    document.body.addEventListener("mousemove", cloneMousemove);
  };

  const mouseup = (e): void => {
    // 如果不是编辑区域
    // console.log("我是编辑区域吗？" + judgeIsMidContainer(e.target));
    // if (!judgeIsMidContainer(e.target) && !dragData.isClone) {
    //   console.log("取消鼠标移除事件");
    //   return;
    // }

    //鼠标松开
    if (dragData.isClone) {
      //当处于克隆节点时
      if (ghostEl) document.body.removeChild(ghostEl); //移除影子（后面得改成隐藏和显示）
      if (container) {
        container.classList.remove("chosen-container"); //移除上一个容器的选中
        let childrenData = findVnodeProps(container); //获取json子数据
        childrenData.push(deepcopy(dragData.selectedMaterial.defaultData)); //修改数据并重新渲染编辑区域
      }
      if (renderEl) renderEl.remove();
      dragData.isClone = false;
      dragData.selectedMaterial = null;
    }

    if (dragData.isDrag) {
      if (ghostEl) document.body.removeChild(ghostEl); //移除影子（后面得改成隐藏和显示）
      if (dragEl) {
        dragEl.style.removeProperty("visibility"); // 容器处于结束后也需要取消隐藏
        document.body.removeEventListener("mousemove", dragMousemove); //解绑鼠标移动事件，防止报错
        container.classList.remove("chosen-container");
        console.log(oldIndex, newIndex);
        // if (isAdd) {
        //     let oldChildrenData = findVnodeProps(oldContainer);//获取json子数据
        //     oldChildrenData.forEach((data: any, i: number) => {
        //         if (data == oldDragData) {
        //             oldChildrenData.splice(i, 1);
        //         }
        //     })
        //     isAdd = false;
        // }

        // 如果处于拖拽状态就相应改变
        if (isDraging) {
          applyReorder();
        }

        // 节点间重新排序
        if (isSort) {
          console.log("11111111");
          let childrenData = findVnodeProps(container); //获取json子数据
          let dragData = oldDragData;
          if (oldIndex != childrenData.length - 1) {
            childrenData.splice(oldIndex, 1);
            childrenData.splice(newIndex, 0, dragData); //修改数据并重新渲染编辑区域
          } else {
            childrenData.splice(newIndex, 0, deepcopy(dragData)); //修改数据并重新渲染编辑区域
            childrenData.pop();
          }
          isSort = false;
        }

        dragEl.classList.remove("chosenEl");
        dragEl.onmousedown = null;
      }
      isDraging = false;
      dragData.isDrag = false;
      dragEl = null;
    }

    document.body.removeEventListener("mousemove", cloneMousemove);
    document.body.removeEventListener("mousemove", dragMousemove);
  };

  document.body.onmouseup = mouseup;

  const cloneMousemove = (e: any) => {
    //克隆组件时的鼠标移动
    const { clientY, clientX } = e;
    ghostEl.style.top = `${clientY - startY}px`;
    ghostEl.style.left = `${clientX - startX}px`;
  };

  const mouseenter = (e: any) => {
    //鼠标移入
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

    // 移动组件到零一个容器的情况
    console.log(isDraging);

    // if (isDraging) {
    //     container.classList.remove('chosen-container');
    //     let newDragEl = deepcopy(dragEl);//深拷贝拖拽组件
    //     dragEl.remove();//将组件移除
    //     container = findParentContainer(e.target);//获取当前正在拖拽的容器
    //     container.classList.add('chosen-container');
    //     container.appendChild(newDragEl);//将复制的组件添加进新容器里面
    //     isAdd = oldContainer == container ? false : true;
    //     //初始化所有参数
    //     dragEl = newDragEl;
    //     dragChildList = [...container.children];//获取当前容器所有子组件
    //     oldIndex = dragChildList.indexOf(dragEl);//获取拖拽组件在当前容器的位置
    //     newIndex = oldIndex;
    // }
  };

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
    if (target.tagName == "DIV")
      //如果点到父节点就直接返回子节点
      return target.children[0];

    if (target.tagName == "SPAN") {
      return target;
    } else {
      return findSpan(target.parentNode);
    }
  };

  /**
   * @param {*} target 目标节点
   * @return {*}  {*}返回最近的父容器节点
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
    if (
      (target.className.includes("container") ||
        target.className.includes("cannotPreview")) &&
      !target.className.includes("editor-body-container-top") &&
      !target.className.includes("editor-body-container-content")
    ) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * @param {*} target 目标容器
   * @return {*}  {*} 返回该容器的json子数据
   */
  const findVnodeProps = (target: any): any => {
    let props = target.__vueParentComponent.props;
    if (props.EditorData) {
      return props.EditorData.body;
    } else {
      return props.childrenList;
    }
  };

  /**
   * @param {*} oldNode 要被插入的节点
   * @param {*} newNode 要插入的节点
   */
  function insertAfter(newNode: any, oldNode: any) {
    if (oldNode != oldNode.parentNode.lastElementChild) {
      // 判断  如果不是父节点的最后一个子节点执行的语句
      oldNode.parentNode.insertBefore(newNode, oldNode.nextElementSibling);
    } else {
      // 如果是最后一个子节点,那么就直接添加到最后一个;
      oldNode.parentNode.appendChild(newNode);
    }
  }

  //点击选中节点进行拖拽
  const onclickToDrag = (e: any) => {
    ghostEl = null;
    isDraging = false;
    if (e.target.classList.contains("Editorcontainer")) {
      dragData.selectKey = null;
      return; //如果点击的是编辑区域就直接结束函数
    }
    dragData.isDrag = true;
    dragEl = findDragEl(e.target); //获取拖拽节点
    console.log(dragEl.attributes);

    dragData.selectKey = dragEl.attributes["data-id"].nodeValue;

    console.log(dragData.selectKey);

    dragEl.classList.add("chosenEl");
    container = findParentContainer(dragEl.parentNode); //获取当前正在拖拽的容器
    let childrenData = findVnodeProps(container); //获取json子数据
    dragChildList = [...container.children]; //获取当前容器所有子组件
    oldIndex = dragChildList.indexOf(dragEl); //获取拖拽组件在当前容器的位置
    newIndex = oldIndex;
    oldDragData = childrenData[oldIndex];
    dragData.selectedComponent = reactive(oldDragData);

    container.classList.add("chosen-container");
    oldContainer = container;
    console.dir(dragEl);
    dragEl.onmousedown = (e: any) => {
      const { clientY, clientX } = e;
      const { top, left } = dragEl.getBoundingClientRect();
      console.log("正在交换组件中");

      startX = clientX - left;
      startY = clientY - top;
      isDraging = true;
      createDragGhost(); //创建拖拽的影子节点

      document.body.addEventListener("mousemove", dragMousemove);
    };
  };

  const dragMousemove = (e: any) => {
    //拖拽组件时的鼠标移动
    if (!isDraging) return;
    //影子组件移动
    const { clientY, clientX } = e;
    ghostEl.style.top = `${clientY - startY}px`;
    ghostEl.style.left = `${clientX - startX}px`;

    // let enterEl = findDragEl(e.target) // 找到可以交换顺序的节点
    canChange = findDragEl(e.target); // 找到可以交换顺序的节点
    simulateMovement(calcNewIndex(clientY, clientX));
    //遍历子节点，将目标节点（不是拖拽节点）与拖拽节点交换位置
  };

  // 找到当前拖拽行最大的高度
  /**
   * @param {*} curPos 被选中节点的位置
   * @return {*} maxHeight
   */
  const findInlineMaxHeight = (line) => {
    let maxHeight = -1; // 记录当前拖拽节点处于的行中最大的节点高度
    for (let i = 0; i < inlineArr[line].length; i++) {
      maxHeight = Math.max(
        maxHeight,
        dragChildList[inlineArr[line][i]].offsetHeight
      );
    }
    return maxHeight;
  };

  // 总结容器行内的节点个数情况
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

    return inlineArr;
  };

  // 计算要移动的组件的放置的最新位置(bug：超出范围会直接返回第一个的位置)
  const calcNewIndex = function (mouseY, mouseX) {
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
    console.log(inlineArr[newIndexLine][newIndexRow]);

    return inlineArr[newIndexLine][newIndexRow]; // 把鼠标（即需要移动的组件）位于的放置的最新位置返回去
  };

  // 更新容器行内的节点个数情况
  const updateInlineNode = (curPos) => {
    let containerWidth = container.offsetWidth; // 获取当前容器的宽度
    let calcWidth = 0; // 计算当前行已填入节点的宽度
    let noChange = true;
    for (let i = 0; i < inlineArr.length; i++) {
      for (let j = 0; j < inlineArr[i].length; j++) {
        calcWidth += dragChildList[inlineArr[i][j]].offsetWidth;
        dragChildList[inlineArr[i][j]].style.setProperty(
          "transition",
          `transform 300ms ease`
        );
        // dragChildList[inlineArr[i][j]].style.setProperty(
        //   "transform",
        //   `translate3d(${dragEl.offsetWidth}px,0,0)`
        // );
      }
    }
  };

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

  //创建拖拽的影子节点
  const createDragGhost = () => {
    const { top, left, width, height } = dragEl.getBoundingClientRect();
    ghostEl = document.createElement("div");
    ghostEl.classList.add("ghostDrag");
    ghostEl.style.width = `${width}px`;
    ghostEl.style.height = `${height}px`;
    ghostEl.innerHTML = dragEl.outerHTML;
    document.body.appendChild(ghostEl);
    ghostEl.style.top = `${top}px`;
    ghostEl.style.left = `${left}px`;
    dragEl.style.setProperty("visibility", "hidden"); // 设置
  };

  const deterWhetherToMoveUp = (fun: any): boolean => {
    let res: boolean = fun();
    return res;
  };

  return {
    mousedown,
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
