import { watch, render } from "vue";
import dragStore from "../stores/dragStore.ts";
import mainStore from "../stores/mainStore.ts";
import pinia from "../stores/index.ts";
import { events } from "../utils/events.ts";
function useDragger(): any {
  const dragData = dragStore(pinia); //拖拽数据
  let mainData = mainStore(pinia);
  let ghostEl = null; //影子组件
  let container = null; //父容器
  let renderEl = null; //渲染节点
  let startX = 0; //鼠标在目标节点中的x值
  let startY = 0; //鼠标在目标节点中的y值
  // let oldContainer = null; //一开始拖拽时组件所在的容器
  let oldIndex = -1; //拖拽节点一开始的位置
  let newIndex = -1; //拖拽节点最后的位置
  let dragChildList = []; //拖拽节点当前容器所有的子节点
  let isSort = false; //是否排序

  watch(
    () => dragData.dragEl,
    (newVal, oldVal) => {
      // console.log("newVal:", newVal);
      // console.log("oldVal:", oldVal);
      // debugger;
      // 处理 拖拽节点
      oldVal ? oldVal.classList.remove("chosenEl") : "";
      newVal?.classList.add("chosenEl");
      // 处理拖拽节点父容器
      container ? container.classList.remove("chosen-container") : "";
      // console.log("container:", container);
      container = newVal?.parentNode
        ? findParentContainer(newVal.parentNode)
        : container; //获取当前正在拖拽的容器
      // console.log("newcontainer:", container);
      // container ? container.classList.toggle("chosen-container") : "";
      container ? container.classList.add("chosen-container") : "";
      // console.log("------------------------------------");
    }
  );
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
    dragChildList = [];
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
        dragData.selectParent = container.attributes["data-key"].nodeValue;
      }
      mainData.isNeedSave = true;
      console.log("needSave1");
      events.emit("cloneEnd");
      dragData.selectedMaterial = null;
    }
    //当处于拖拽节点时
    if (dragData.isDrag) {
      if (dragData.dragEl) {
        dragData.dragEl.style.removeProperty("visibility"); // 容器处于结束后也需要取消隐藏
        document.body.removeEventListener("mousemove", dragMousemove); //解绑鼠标移动事件，防止报错

        // // 节点间重新排序
        if (isSort) {
          Array.from(container.children).forEach((el: any) => {
            el.style.removeProperty("transform");
            el.style.removeProperty("transition");
          });
          let parent = mainData.EditorDataMap.get(dragData.selectKey).parent; //获取json子数据
          let childrenData = mainData.EditorDataMap.get(parent).children;
          childrenData.splice(oldIndex, 1);
          childrenData.splice(newIndex, 0, dragData.selectKey); //修改数据并重新渲染编辑区域
          isSort = false;
        }

        dragData.dragEl.classList.remove("chosenEl");
        dragData.dragEl.onmousedown = null;
      }
      dragData.isDraging = false;
      dragData.dragEl = null;
      mainData.isNeedSave = true;
      console.log("needSave2");
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
    if (
      target.className.includes("container") ||
      target.className.includes("Editorcontainer")
    ) {
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
      dragData.selectKey = null;
      return;
    }

    dragData.dragEl = findDragEl(e.target); //获取拖拽节点
    container = findParentContainer(dragData.dragEl.parentNode); //获取当前正在拖拽的容器
    dragData.dragEl.classList.add("chosenEl");
    container.classList.add("chosen-container");
    newIndex = oldIndex = [].indexOf.call(container.children, dragData.dragEl); //获取拖拽组件在当前容器的位置
    getDragChildList();
    dragData.isDrag = true;
    dragData.selectKey = dragData.dragEl.attributes["data-key"].nodeValue;

    dragData.dragEl.onmousedown = (e: any) => {
      console.log("正在交换组件中");
      dragData.isDraging = true;
      createDragGhost("ghostDrag", dragData.dragEl, e); //创建拖拽的影子节点
      // dragData.dragEl.style.setProperty("visibility", "hidden");
      document.body.addEventListener("mousemove", dragMousemove);
    };
    //销毁拖拽组件相关数据
    dragData.destructionOfDrag = () => {
      if (dragData.isDrag) {
        dragData.selectKey = null;
        if (ghostEl) ghostEl.remove(); //移除影子（后面得改成隐藏和显示）
        if (dragData.dragEl) {
          dragData.dragEl.style.removeProperty("visibility"); // 容器处于结束后也需要取消隐藏
          document.body.removeEventListener("mousemove", dragMousemove); //解绑鼠标移动事件，防止报错
          container?.classList.remove("chosen-container");
          dragData.dragEl.classList.remove("chosenEl");
          dragData.dragEl.onmousedown = null;
        }
        dragData.isDraging = false;
        dragData.isDrag = false;
        dragData.dragEl = null;
      }
    };
  };

  const dragMousemove = (e: any) => {
    DragGhostMove(e); //影子组件移动
    isSort = true;
    for (let i = 0; i < dragChildList.length; i++) {
      if (
        i !== newIndex &&
        e.clientX > dragChildList[i].left &&
        e.clientX < dragChildList[i].right &&
        e.clientY > dragChildList[i].top &&
        e.clientY < dragChildList[i].bottom
      ) {
        if (newIndex < i) {
          for (let j = newIndex; j < i; j++) {
            if (j < oldIndex) {
              container.children[j].style.transform =
                "translate3d(0px, 0px, 0)";
            } else {
              const x = dragChildList[j].left - dragChildList[j + 1].left;
              const y = dragChildList[j].top - dragChildList[j + 1].top;
              container.children[j + 1].style.transform =
                "translate3d(" + x + "px, " + y + "px, 0)";
            }
          }
        } else if (newIndex > i) {
          for (let j = i; j < newIndex; j++) {
            if (oldIndex <= j) {
              container.children[j + 1].style.transform =
                "translate3d(0px, 0px, 0)";
            } else {
              const x = dragChildList[j + 1].left - dragChildList[j].left;
              const y = dragChildList[j + 1].top - dragChildList[j].top;
              container.children[j].style.transform =
                "translate3d(" + x + "px, " + y + "px, 0)";
            }
          }
        }
        const x = dragChildList[i].left - dragChildList[oldIndex].left;
        const y = dragChildList[i].top - dragChildList[oldIndex].top;
        dragData.dragEl.style.transform =
          "translate3d(" + x + "px, " + y + "px, 0)";
        newIndex = i;
        break;
      }
    }
  };

  const getDragChildList = () => {
    dragChildList = [];
    for (let item of container.children) {
      item.style.setProperty("transition", `transform 300ms ease`);
      dragChildList.push(item.getBoundingClientRect());
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

export const usedragger = useDragger();
