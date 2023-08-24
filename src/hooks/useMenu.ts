import { ElMessage } from "element-plus";
import pinia from "../stores";
import dragStore from "../stores/dragStore";
import mainStore from "../stores/mainStore";
import deepcopy from "deepcopy";
import { addMap } from "./useCreateMap.ts";

const dragData = dragStore(pinia);
const mainData = mainStore(pinia);

// 通过 selectKey 找到节点
const findSelectNode = (nodes: any, selectKey: string): any => {
  let isFind = false; // 记录是否找到节点
  let selectNode = null; // 记录找到的节点
  // 遍历节点
  const traverseNodes = (childNodes) => {
    // 如果已经找到则返回
    if (isFind) {
      return;
    }

    // 遍历当前所有的节点
    for (let i = 0; i < childNodes.length; i++) {
      const childNode = childNodes[i];
      // 如果已经当前选中的节点
      if (childNode.getAttribute("data-key") == selectKey) {
        isFind = true;
        selectNode = childNode;
        return;
      }

      // 找出该节点（childNode）的 classList，
      // 如果他不是组件则进行不递归，继续遍历剩余节点
      let childrenList = childNode.children[0]?.classList
        ? [...childNode.children[0].classList]
        : "";
      if (
        childrenList &&
        (childrenList.includes("cannotPreview") ||
          childrenList.includes("container-ordinary"))
      ) {
        return traverseNodes(childNode.children);
      } else {
        continue;
      }
    }
  };

  // 遍历递归当前 page 页面存在的所有子节点
  for (let i = 0; i < nodes.length; i++) {
    if (!isFind) {
      if (nodes[i].getAttribute("data-key") == selectKey) {
        return nodes[i];
      }
      traverseNodes(nodes[i].children);
    } else {
      break;
    }
  }
  return selectNode;
};

// 找到当前右击对象的最外层父盒子
const findTreeNode = (target: any): any => {
  if (!target.classList) {
    return null;
  }
  let classList = [...target.classList];
  if (
    classList.includes("is-expanded") ||
    classList.includes("cannotPreview") ||
    classList.includes("container-ordinary")
  ) {
    return target;
  } else {
    return findTreeNode(target.parentNode);
  }
};

// 找当前节点的上一个节点
const toFindPreNodeInNode = (key: string) => {
  let curNode = mainData.EditorDataMap.get(key);
  let parent_Children = mainData.EditorDataMap.get(curNode.parent)?.children; // 被粘贴的组件的父节点的孩子节点
  for (let i = 0; i < parent_Children.length; i++) {
    if (parent_Children[i + 1] == key) {
      return parent_Children[i];
    }
  }
  // 如果没有找到，说明其上一个是其父节点
  return curNode.parent;
};

// 找当前节点的下一个节点
const toFindNextNodeOfCurrentNode = (key: string) => {
  let curNode = mainData.EditorDataMap.get(key);
  let parent_Children = mainData.EditorDataMap.get(curNode.parent)?.children; // 被粘贴的组件的父节点的孩子节点
  for (let i = 0; i < parent_Children.length; i++) {
    if (parent_Children[i - 1] == key) {
      return parent_Children[i];
    }
  }
  // 如果其父节点是 "page" (根节点)，直接返回根节点即可
  if (curNode.parent == "page") {
    return "page";
  }
  // 如果没有找到，说明其下一个是其父节点的下一个节点
  return toFindNextNodeOfCurrentNode(curNode.parent);
};

const showMenu = (event) => {
  mainData.menuConfig.selectKey = findTreeNode(event.target)?.getAttribute(
    "data-key"
  );
  // 如果右击节点是已经选中的节点
  if (mainData.menuConfig.selectKey == dragData.selectKey) {
    console.log("右击节点是已经选中的节点");
    mainData.menuConfig.isShow.selectComponent = true; // 关闭选中组件
    mainData.menuConfig.isShow.unselectComponent = false; // 打开取消选中
    mainData.menuConfig.isShow.moveForward = false;
    mainData.menuConfig.isShow.moveBack = false;
  } else {
    mainData.menuConfig.isShow.selectComponent = false;
    mainData.menuConfig.isShow.unselectComponent = true;
    mainData.menuConfig.isShow.moveForward = true;
    mainData.menuConfig.isShow.moveBack = true;
  }
  console.log("打开菜单");
  console.log("右击选中节点：" + mainData.menuConfig.selectKey);

  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  event.preventDefault(); // 阻止浏览器默认右键菜单

  mainData.menuConfig.isShowMenu = true;

  if (viewportHeight - event.y < 390) {
    if (event.x < 100) {
      mainData.menuConfig.style.left = event.x + "px";
    } else {
      mainData.menuConfig.style.left = event.x - 100 + "px";
    }
    mainData.menuConfig.style.top = event.y - 390 + "px";
  } else {
    mainData.menuConfig.style.left = event.x + "px";
    mainData.menuConfig.style.top = event.y + "px";
  }

  event.stopPropagation();
};

// 关闭菜单
const closeMenu = () => {
  console.log("关闭菜单");
  mainData.menuConfig.isShowMenu = false;
};

// 选中组件
const selectComponent = (e) => {
  console.log("选中组件");
  if (mainData.menuConfig.isShow.selectComponent) {
    ElMessage.info("该组件已经被选中啦！");
  } else {
    if (mainData.menuConfig.selectKey) {
      console.log("更改");
      if (mainData.menuConfig.elOutlineTree) {
        mainData.menuConfig.elOutlineTree.setCurrentKey(
          mainData.menuConfig.selectKey
        );
      }
      dragData.selectKey = mainData.menuConfig.selectKey;
      mainData.menuConfig.isShowMenu = false;
    } else {
      ElMessage.error("无法选中！");
    }
  }
  e.stopPropagation();
};

// 取消选中
const unselectComponent = (e) => {
  if (mainData.menuConfig.isShow.unselectComponent) {
    ElMessage.info("这个组件不需要取消选中嘞！");
  } else {
    console.log("取消组件");
    dragData.selectKey = null;
    if (mainData.menuConfig.elOutlineTree) {
      mainData.menuConfig.elOutlineTree.setCurrentKey(null);
    }
    mainData.menuConfig.isShowMenu = false;
  }
  e.stopPropagation();
};

// 复制一份
const makeACopy = (e, commands) => {
  if (mainData.menuConfig.isShow.makeACopy) {
    ElMessage.info("不可以复制该组件哦！");
  } else {
    console.log("复制一份");
    mainData.copyData = mainData.menuConfig.selectKey;
    mainData.wantCopy = mainData.menuConfig.selectKey;
    commands["paste"]();
    mainData.menuConfig.isShowMenu = false;
  }
  e.stopPropagation();
};

// 复制组件
const copycomponents = (e) => {
  if (mainData.menuConfig.isShow.copycomponents) {
    ElMessage.info("不可以复制该组件哦！");
  } else {
    console.log("复制组件");
    mainData.copyData = mainData.menuConfig.selectKey;
    mainData.menuConfig.isShowMenu = false;
  }
  e.stopPropagation();
};

// 删除组件
const delComponents = (e, commands) => {
  if (mainData.menuConfig.isShow.delComponents) {
    ElMessage.info("不可以删除该组件哦！");
  } else {
    console.log("删除组件");
    mainData.wantDel = mainData.menuConfig.selectKey;
    commands["delete"]();
    mainData.menuConfig.isShowMenu = false;
  }
  e.stopPropagation();
};

// 剪切组件
const shearComponents = (e, commands) => {
  if (mainData.menuConfig.isShow.shearComponents) {
    ElMessage.info("不可以剪切该组件哦！");
  } else {
    console.log("剪切组件");
    mainData.copyData = mainData.menuConfig.selectKey;
    mainData.menuConfig.isShowMenu = false;
    delComponents(e, commands);
  }
  e.stopPropagation();
};

// 粘贴组件
const pasteComponents = (e) => {
  if (!mainData.copyData) {
    ElMessage.error("还没有复制组件配置哦！");
    return;
  }
  if (mainData.menuConfig.isShow.pasteComponents) {
    ElMessage.info("不可以粘贴到该组件哦！");
  } else {
    console.log("粘贴组件");
    let pasteNode = mainData.EditorDataMap.get(mainData.menuConfig.selectKey);
    let oldParent_Children = mainData.EditorDataMap.get(
      pasteNode.parent
    )?.children; // 被粘贴的组件的父节点的孩子节点
    let preIndex = -1; // 被替代的下标的前一个下标
    for (let i = 0; i < oldParent_Children.length; i++) {
      if (oldParent_Children[i + 1] == mainData.menuConfig.selectKey) {
        preIndex = i;
        break;
      }
    }
    // 粘贴配置的操作以及回退撤销
    let { delUndo, delRedo } = delPasteNode(); // 删除被粘贴的节点
    let { copyUndo, copyRedo } = copyNode(preIndex, pasteNode.parent); // 复制组件
    function redo() {
      delRedo();
      copyRedo();
      mainData.menuConfig.key++;
    }
    function undo() {
      copyUndo();
      delUndo();
      mainData.menuConfig.key--;
    }
    redo();
    mainData.queue.push({ redo, undo }); //存放命令的前进后退
    mainData.curPointerTo += 1;
    mainData.menuConfig.isShowMenu = false;
  }
  e.stopPropagation();
};

// 删除被粘贴节点
const delPasteNode = () => {
  let key = mainData.menuConfig.selectKey;
  if (key) {
    console.log("删除被粘贴的节点");
    let parent = mainData.EditorDataMap.get(key)?.parent || "page";
    let index = mainData.EditorDataMap.get(parent).children.findIndex(
      (item: string) => item == key
    );
    return {
      delRedo() {
        mainData.EditorDataMap.get(parent).children.splice(index, 1);
        console.log(mainData.EditorDataMap.get(parent));
      },
      delUndo() {
        mainData.EditorDataMap.get(parent).children.splice(index, 0, key);
        console.log(mainData.EditorDataMap.get(parent));
      },
    };
  } else {
    ElMessage.error("编辑区域根节点不能被粘贴配置！");
  }
};

// 粘贴被复制的节点
const copyNode = (index: number, parent: string) => {
  let copyData = mainData.copyData; //复制的keys
  let data = mainData.EditorDataMap.get(copyData); //复制的key的数据
  let addKeys = []; //粘贴后添加上去的key
  return {
    copyRedo() {
      /**
       * 复制所有节点
       * @param {string} keys 需要复制的keys
       * @param {string} parent 需要复制的keys的父容器
       * @param {*} data 需要复制的keys的数据
       * @return {*} 返回复制后的keys
       */
      function toCopy(keys: string, parent: string, data: any): string {
        data.parent = parent;
        let id = addMap(keys.replace(/-[^-]*$/, ""), deepcopy(data));
        addKeys.push(id);
        if (Array.isArray(data.children)) {
          mainData.EditorDataMap.get(id).children = data.children.map(
            (child: string) => {
              return toCopy(child, id, mainData.EditorDataMap.get(child));
            }
          );
        }
        return id;
      }
      mainData.EditorDataMap.get(parent).children.splice(
        index + 1,
        0,
        toCopy(copyData, parent, data)
      );
    },
    copyUndo() {
      mainData.EditorDataMap.get(parent).children.splice(index + 1, 1);
      addKeys.forEach((keys: string) => {
        mainData.EditorDataMap.delete(keys);
      });
    },
  };
};

// 向前一步
const moveForward = (e) => {
  if (mainData.menuConfig.isShow.moveForward) {
    ElMessage.error("未选中该节点！");
    // ElMessage.info("已经不可以再前进了！");
  } else {
    console.log("向前移动");
    let preStep = toFindPreNodeInNode(mainData.menuConfig.selectKey);
    console.log("向前移动" + preStep);

    if (mainData.menuConfig.elOutlineTree) {
      mainData.menuConfig.elOutlineTree.setCurrentKey(preStep);
    }
    if (mainData.rootNode) {
      dragData.dragEl = findSelectNode(mainData.rootNode.children, preStep);
    }
    mainData.menuConfig.isShowMenu = false;
  }
  e.stopPropagation();
};

// 向后一步
const moveBack = (e) => {
  if (mainData.menuConfig.isShow.moveForward) {
    ElMessage.error("未选中该节点！");
    // ElMessage.info("已经不可以再后退了！");
  } else {
    console.log("向后移动");
    let nextStep = toFindNextNodeOfCurrentNode(mainData.menuConfig.selectKey);
    console.log(nextStep);
    if (mainData.menuConfig.elOutlineTree) {
      mainData.menuConfig.elOutlineTree.setCurrentKey(nextStep);
    }
    if (mainData.rootNode) {
      dragData.dragEl = findSelectNode(mainData.rootNode.children, nextStep);
    }
    mainData.menuConfig.isShowMenu = false;
  }
  e.stopPropagation();
};

// 撤销
const undo = (e, commands) => {
  if (mainData.menuConfig.isShow.undo) {
    ElMessage.error("这个组件没有撤销的空间！");
  } else {
    console.log("撤销");
    commands["undo"]();
    mainData.menuConfig.isShowMenu = false;
  }
  e.stopPropagation();
};

// 还原
const redo = (e, commands) => {
  if (mainData.menuConfig.isShow.redo) {
    ElMessage.error("这个组件没有还原的空间！");
  } else {
    console.log("还原");
    commands["redo"]();
    mainData.menuConfig.isShowMenu = false;
  }
  e.stopPropagation();
};

export {
  findSelectNode,
  showMenu,
  closeMenu,
  selectComponent,
  unselectComponent,
  makeACopy,
  copycomponents,
  shearComponents,
  pasteComponents,
  delComponents,
  moveForward,
  moveBack,
  undo,
  redo,
};
