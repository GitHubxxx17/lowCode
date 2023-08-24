import mainStore from "../stores/mainStore.ts";
import pinia from "../stores/index.ts";
import dragStore from "../stores/dragStore.ts";

function useDragger() {
  const mainData = mainStore(pinia);
  const dragData = dragStore(pinia); //拖拽数据
  let dragChildList = []; //拖拽节点当前容器所有的子节点

  let container = null;
  let dragindex = 0;
  let dragEl = null;
  const onclickToDrag = (e) => {
    dragEl = findEl(e.target);
    container = findContainer(dragEl);
    dragData.dragEl = dragEl;
    dragData.selectKey = findSelectkey(dragData.dragEl);
    dragEl.onmousedown = () => {
      getDragChildList();
      dragindex = [].indexOf.call(container.children[0].children, dragEl);
      document.body.addEventListener("mousemove", onmousemove);
    };
  };

  const findSelectkey = (target: any): any => {
    return target.attributes["data-key"]?.nodeValue;
  };

  const findContainer = (target) => {
    if (target == document.body) return null;
    if (
      target.className.includes("container") ||
      target.className.includes("Editorcontainer")
    ) {
      return target;
    } else {
      return findContainer(target.parentNode);
    }
  };

  const findEl = (target) => {
    if (target.className == "transition" || target == document.body) {
      return null;
    }
    if (target.className == "cannotPreview") return target;
    else return findEl(target.parentNode);
  };

  const onmousemove = (e) => {
    // let el = findEl(e.target);
    // if (el) {
    //   let index = [].indexOf.call(container.children[0].children, el);
    //   console.log(index, dragindex);

    //   if (index != dragindex) {
        
    //   }
    // }
    for (let i = 0; i < dragChildList.length; i++) {
      if (
        i !== dragindex &&
        e.clientX > dragChildList[i].left &&
        e.clientX < dragChildList[i].right &&
        e.clientY > dragChildList[i].top &&
        e.clientY < dragChildList[i].bottom
      ) {
        let val = mainData.EditorDataMap.get("page").children[dragindex];
        mainData.EditorDataMap.get("page").children.splice(dragindex, 1);
        mainData.EditorDataMap.get("page").children.splice(i, 0, val);
        dragindex = i;
      }
    }
  };

  const getDragChildList = () => {
    dragChildList = [];
    for (let item of container.children[0].children) {
      dragChildList.push(item.getBoundingClientRect());
    }
  };

  document.body.addEventListener("mouseup", () => {
    document.body.removeEventListener("mousemove", onmousemove);
  });

  return {
    onclickToDrag,
  };
}
export const usedrag = useDragger();
