import { watch, render } from "vue";
import dragStore from "../stores/dragStore.ts";
import mainStore from "../stores/mainStore.ts";
import pinia from "../stores/index.ts";
import { events } from "../utils/events.ts";
import { findSelectNode } from "./useMenu.ts";

function useDragger(): any {
  const dragData = dragStore(pinia); //拖拽数据
  let mainData = mainStore(pinia);
  let ghostEl: HTMLElement = null; //影子组件
  let container: HTMLElement = null; //父容器
  let renderEl: HTMLElement = null; //渲染节点
  let startX: number = 0; //鼠标在目标节点中的x值
  let startY: number = 0; //鼠标在目标节点中的y值
  let oldIndex: number = -1; //拖拽节点一开始的位置
  let dragChildList: any[] = []; //拖拽节点当前容器所有的子节点
  let toEnter: any = null; //进入容器调用执行定时操作
  let isEnter: boolean = false; //是否进入容器
  let enterUpperLevel: boolean = false; //是否进入上一级容器
  let newContainer: HTMLElement = null; //新容器
  let isEditingArea: boolean = true;

  //监听拖拽节点改变
  watch(
    () => dragData.dragEl,
    (newVal, oldVal) => {
      // console.log("newVal:", newVal);
      // console.log("oldVal:", oldVal);
      if (newVal && typeof findSelectkey(newVal) == "undefined") {
        dragData.dragEl = oldVal;
      }
      // 移出旧选中节点和父容器的选中类
      if (oldVal) {
        oldVal.classList.remove("chosenEl");
        findParentContainer(oldVal.parentNode).classList.remove(
          "chosen-container"
        );
      }
      //为新选中节点和父容器添加选中类
      if (newVal) {
        mainData.rootNode.classList.remove("chosen-container");
        container = findParentContainer(newVal.parentNode); //获取当前正在拖拽的容器
        newVal.classList.add("chosenEl");
        container.classList.add("chosen-container");
      } else {
        mainData.rootNode.classList.add("chosen-container");
      }
    }
  );

  //监听节点的键
  watch(
    () => dragData.selectKey,
    (newVal) => {
      mainData.modify.curData = JSON.stringify(mainData.EditorDataMap.get(newVal || 'page'));
      if (!isEditingArea) {
        dragData.dragEl = findSelectNode(
          mainData.rootNode.children[0].children,
          newVal
        );
      }
    }
  );
  //监听拖拽结束
  watch(
    () => dragData.isDraging,
    (newVal) => {
      if (!newVal) events.emit("dragEnd");
    }
  );
  /**
   *初始化函数
   */
  const init = () => {
    if (ghostEl) ghostEl.remove(); //移除影子（后面得改成隐藏和显示）
    if (renderEl) renderEl.remove(); //移除渲染节点
    ghostEl = null;
    renderEl = null;
    dragData.selectedMaterial = null;
    dragData.isClone = false;
    //当处于拖拽时不移除拖拽相关的
    if (!dragData.isDrag) {
      container?.classList.remove("chosen-container"); //移除上一个容器的选中
      container = null;
      dragData.isDrag = false;
      dragChildList = [];
    }
    dragData.isDraging = false;
    clearTimeout(toEnter);
    isEnter = false;
    enterUpperLevel = false;
    //移出鼠标移动事件
    document.body.removeEventListener("mousemove", DragGhostMove);
    document.body.removeEventListener("mousemove", dragMousemove);
  };

  /**
   *物料区鼠标按下事件
   * @param {*} component //物料区组件
   * @param {*} e 鼠标事件
   */
  const cloneMousedown = (component: any, e: any) => {
    const span = findSpan(e.target);
    dragData.isClone = true;
    dragData.selectedMaterial = component;
    mainData.modify.disabled = true;
    createDragGhost("ghostClone", span, e); //创建拖拽的影子节点
    document.body.addEventListener("mousemove", DragGhostMove);
  };

  /**
   *绑定页面鼠标松开事件
   * @param {*} e 鼠标事件
   */
  document.body.onmouseup = (e: any) => {
    // 如果不是编辑区域
    if (!judgeIsMidContainer(e.target)) {
      init();
      // 监听拖拽key改变
      isEditingArea = false;
      return;
    }
    isEditingArea = true;
    //当处于克隆节点时
    if (dragData.isClone && container) {
      dragData.selectParent = findSelectkey(container);
      events.emit("cloneEnd");
    }
    if (dragData.isClone || dragData.isDrag) mainData.isNeedSave = true;
    init();
    
    //将该语句执行放进宏任务中，在watch监听后执行
    let timer = setTimeout(()=>{
      mainData.modify.disabled = false;
      clearTimeout(timer)
    },0);
  };

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
          dragData.selectedMaterial.render({
            node: dragData.selectedMaterial.defaultData,
          }),
          renderEl
        ),
        renderEl)
      );
    }
    //正在拖拽时进入容器
    if (dragData.isDraging) {
      clearTimeout(toEnter);
      //当前拖拽节点为容器时不触发进入容器事件
      if (
        dragData.dragEl == e.target ||
        e.target.classList.contains("Editorcontainer")
      )
        return;
      isEnter = true;
      enterUpperLevel = false;
      //获取当前容器
      newContainer = e.target;
      //调用定时器
      toEnter = setTimeout(enterContainer, 300);
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
      container.removeChild(renderEl);
      //鼠标移出后如果获取的容器与上一个相同则获取它的父节点容器
      container = findParentContainer(e.target.parentNode);
      container.classList.add("chosen-container");
      renderEl = document.createElement("div");
      renderEl.classList.add("renderEl");
      container.appendChild(
        (render(
          dragData.selectedMaterial.render({
            node: dragData.selectedMaterial.defaultData,
          }),
          renderEl
        ),
        renderEl)
      );
    }
    //正在拖拽时离开容器
    if (dragData.isDraging) {
      //获取当前容器的上一级容器，因为离开的当前容器肯定进入了当前容器的上一级容器
      isEnter = false;
      if (e.target != container) return;
      newContainer = findParentContainer(e.target.parentNode);
      enterUpperLevel = true;
      //调用定时器
      toEnter = setTimeout(enterContainer, 300);
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
  const findSelectkey = (target: any): any => {
    return target.attributes["data-key"]?.nodeValue;
  };

  /**
   * 进入容器触发函数
   */
  const enterContainer = () => {
    // 异步修改
    new Promise((resolve) => {
      //先对数据进行修改，并等视图重新刷新
      let newKey = findSelectkey(newContainer);
      let childrenData = mainData.EditorDataMap.get(newKey).children;
      let parent = mainData.EditorDataMap.get(dragData.selectKey).parent; //获取json子数据
      mainData.EditorDataMap.get(parent).children.splice(oldIndex, 1);
      childrenData.push(dragData.selectKey);
      mainData.EditorDataMap.get(dragData.selectKey).parent = newKey;
      container = newContainer;
      resolve(childrenData);
    }).then((childrenData: string[]) => {
      //视图刷新后重新定位拖拽节点
      oldIndex = childrenData.length - 1;
      dragData.dragEl = container.children[0].children[oldIndex];
      console.log(container, oldIndex, dragData.dragEl);
      dragData.dragEl.onmousedown = dragMousedown;
      getDragChildList();
      isEnter = false;
      enterUpperLevel = false;
    });
  };

  /**
   * 点击选中节点
   * @param {*} e 鼠标事件
   */
  const onclickToDrag = (e: any) => {
    // console.log("选中：", e.target, "寻找", findDragEl(e.target));
    //如果点击的区域是整个编辑区域的话
    if (e.target.classList.contains("Editorcontainer")) {
      container = e.target;
      e.target.classList.add("chosen-container");
      dragData.selectKey = null;
      if (dragData.dragEl) dragData.dragEl.onmousedown = null;
      dragData.dragEl = null;
      return;
    }
    if (findDragEl(e.target).classList.contains("Editorcontainer")) {
      return;
    }
    if (e.target == dragData.dragEl) return;
    if (dragData.dragEl) dragData.dragEl.onmousedown = null;
    dragData.isDrag = true;
    dragData.dragEl = findDragEl(e.target) || e.target; //获取拖拽节点
    dragData.selectKey = findSelectkey(dragData.dragEl);
    // console.log("dragData.dragEl:", dragData.dragEl);

    dragData.dragEl.onmousedown = dragMousedown;
    //销毁拖拽组件相关数据
    dragData.destructionOfDrag = () => {
      if (dragData.isDrag) {
        dragData.selectKey = null;
        if (ghostEl) ghostEl.remove(); //移除影子（后面得改成隐藏和显示）
        if (dragData.dragEl) {
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

  /**
   *  鼠标按下开始拖拽
   * @param {*} e 鼠标事件
   */
  const dragMousedown = (e: any) => {
    mainData.modify.disabled = true;
    events.emit("dragStart");
    console.log("正在交换组件中");
    oldIndex = [].indexOf.call(container.children[0].children, dragData.dragEl); //获取拖拽组件在当前容器的位置
    getDragChildList();
    dragData.isDraging = true;
    createDragGhost("ghostDrag", dragData.dragEl, e); //创建拖拽的影子节点
    document.body.addEventListener("mousemove", dragMousemove);
  };

  /**
   *鼠标移动进行拖拽
   * @param {*} e 鼠标事件
   */
  const dragMousemove = (e: any) => {
    //如果有进入容器，重置定时器，如果离开容器就不重置定时器
    if (judgeIsMidContainer(e.target) && toEnter && !enterUpperLevel) {
      clearTimeout(toEnter);
      if (isEnter) toEnter = setTimeout(enterContainer, 300);
    }
    DragGhostMove(e); //影子组件移动
    //找到鼠标移入的非选中节点
    for (let i = 0; i < dragChildList.length; i++) {
      if (
        i !== oldIndex &&
        e.clientX > dragChildList[i].left &&
        e.clientX < dragChildList[i].right &&
        e.clientY > dragChildList[i].top &&
        e.clientY < dragChildList[i].bottom
      ) {
        // 与选中节点的数据交换位置重新渲染视图
        let parent = mainData.EditorDataMap.get(dragData.selectKey).parent; //获取json子数据
        let childrenData = mainData.EditorDataMap.get(parent).children;
        childrenData.splice(oldIndex, 1);
        childrenData.splice(i, 0, dragData.selectKey);
        //重新获取当前容器内所有节点在页面的位置信息
        getDragChildList();
        //为选中节点更新当前位置
        oldIndex = i;
      }
    }
  };

  /**
   *获取拖拽列表
   */
  const getDragChildList = () => {
    dragChildList = [];
    for (let item of container.children[0].children) {
      dragChildList.push(item.getBoundingClientRect());
    }
  };

  /**找到所选中的节点
   * @param {*} target 目标节点
   * @return {*}  {*} 选中的节点
   */
  const findDragEl = (target: any): any => {
    if (target == document.body) {
      return null;
    }
    if (target?.parentNode.className == "transition") return target;
    if (target.className == "transition") return target.parentNode;
    if (target.className == "cannotPreview") return target;
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
