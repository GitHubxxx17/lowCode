<script setup lang="ts">
import { ref, reactive, inject, onMounted, watch } from "vue";
import mainStore from "../../stores/mainStore.ts";
import dragStore from "../../stores/dragStore";
import pinia from "../../stores/index.ts";
import ElSearch from "./ElSearch.tsx";
import { showMenu, closeMenu } from "../../hooks/useMenu.ts";

const config: any = inject("editorConfig"); //组件配置
const mainData = mainStore(pinia);
const dragData = dragStore(pinia);
let elOutlineTree = ref(null);
// 获取树节点数据
const getOutlineData = (key: any, id: number = 2) => {
  let newId = id || 2;
  let parent = mainData.EditorDataMap.get(key).children;
  if (Array.isArray(parent)) {
    let children = [];
    parent.forEach((item, i) => {
      let temp = mainData.EditorDataMap.get(item);
      let label = config.componentMap.get(temp.type).label;
      children.push({
        id: newId + i,
        "node-key": item,
        label: label,
        children: getOutlineData(item, id + parent.length),
      });
    });
    return children;
  } else {
    return [];
  }
};

const state: any = reactive({
  data: [
    {
      id: 1,
      label: "页面",
      "node-key": "page",
      children: getOutlineData("page"),
    },
  ],
  defaultProps: {
    children: "children",
    "node-key": "node-key",
    label: "label",
  },
  search: {
    value: "",
    searchKey: "componentSearch",
    searchDefault: {
      label: "常见组件节点标签",
      list: ["页面", "容器", "输入框", "按钮"],
    },
    placeholder: "输入关键字过滤组件节点标签",
  },
});

// 跟踪聚焦
const trackingFocus = (node) => {
  console.log("change");
  dragData.selectKey = node ? node["node-key"] : null;
};

// 搜索过滤节点
const filterNode = (value, data) => {
  if (!value) return true;
  return data.label.indexOf(value) !== -1;
};

watch(
  () => dragData.selectKey,
  () => {
    if (dragData.selectKey) {
      elOutlineTree.value.setCurrentKey(dragData.selectKey, false);
    } else {
      mainData.Breadcrumb = ["页面"];
      elOutlineTree.value.setCurrentKey("page", false);
    }
  }
);

watch(
  () => state.search.value,
  () => {
    elOutlineTree.value.filter(state.search.value);
  }
);

onMounted(() => {
  if (dragData.selectKey) {
    elOutlineTree.value.setCurrentKey(dragData.selectKey, false);
  } else {
    mainData.Breadcrumb = ["页面"];
    elOutlineTree.value.setCurrentKey("page", false);
  }
  mainData.menuConfig.elOutlineTree = elOutlineTree;
});

//#region
// // 菜单

// // 打开菜单
// const showMenu = (event) => {
//   mainData.menuConfig.selectKey = findTreeNode(event.target).getAttribute(
//     "data-key"
//   );
//   // 如果右击节点是已经选中的节点
//   if (mainData.menuConfig.selectKey == dragData.selectKey) {
//     mainData.menuConfig.isShow.selectComponent = true; // 关闭选中组件
//     mainData.menuConfig.isShow.unselectComponent = false; // 打开取消选中
//   } else {
//     mainData.menuConfig.isShow.selectComponent = false;
//     mainData.menuConfig.isShow.unselectComponent = true;
//   }
//   console.log("打开菜单");
//   console.log("右击选中节点：" + mainData.menuConfig.selectKey);
//   event.preventDefault(); // 阻止浏览器默认右键菜单
//   mainData.menuConfig.isShowMenu = true;
//   mainData.menuConfig.style.left = event.x + "px";
//   mainData.menuConfig.style.top = event.y - 45 + "px";
//   event.stopPropagation();
// };

// // 选中组件
// const selectComponent = (e) => {
//   console.log("选中组件");
//   if (mainData.menuConfig.isShow.selectComponent) {
//     ElMessage.info("该组件已经被选中啦！");
//   } else {
//     if (mainData.menuConfig.selectKey) {
//       console.log("更改");
//       elOutlineTree.value.setCurrentKey(mainData.menuConfig.selectKey);
//       dragData.selectKey = mainData.menuConfig.selectKey;
//       mainData.menuConfig.isShowMenu = false;
//     } else {
//       ElMessage.error("无法选中！");
//     }
//   }
//   e.stopPropagation();
// };

// // 取消选中
// const unselectComponent = (e) => {
//   if (mainData.menuConfig.isShow.unselectComponent) {
//     ElMessage.info("这个组件不需要取消选中嘞！");
//   } else {
//     console.log("取消组件");
//     dragData.selectKey = null;
//     elOutlineTree.value.setCurrentKey(null);
//     mainData.menuConfig.isShowMenu = false;
//   }
//   e.stopPropagation();
// };

// // 复制一份
// const makeACopy = (e) => {
//   if (mainData.menuConfig.isShow.makeACopy) {
//     ElMessage.info("不可以复制该组件哦！");
//   } else {
//     console.log("复制一份");
//     mainData.copyData = mainData.menuConfig.selectKey;
//     mainData.wantCopy = mainData.menuConfig.selectKey;
//     props.commands["paste"]();
//   }
//   e.stopPropagation();
//   // return true;
// };

// // 删除组件
// const delComponents = (e) => {
//   if (mainData.menuConfig.isShow.delComponents) {
//     ElMessage.info("不可以删除该组件哦！");
//   } else {
//     console.log("删除组件");
//     mainData.wantDel = mainData.menuConfig.selectKey;
//     props.commands["delete"]();
//   }
//   e.stopPropagation();
// };

// // 剪切组件
// const shearComponents = (e) => {
//   if (mainData.menuConfig.isShow.shearComponents) {
//     ElMessage.info("不可以剪切该组件哦！");
//   } else {
//     console.log("剪切组件");
//     mainData.copyData = mainData.menuConfig.selectKey;
//     mainData.menuConfig.isShowMenu = false;
//     delComponents(e);
//   }
//   e.stopPropagation();
// };

// // 向前一步
// const moveForward = (e) => {
//   if (mainData.menuConfig.isShow.moveForward) {
//     ElMessage.error("未选中该节点！");
//     // ElMessage.info("已经不可以再前进了！");
//   } else {
//     console.log("向前移动");
//     let preStep = toFindPreNodeInNode(mainData.menuConfig.selectKey);
//     elOutlineTree.value.setCurrentKey(preStep);
//     mainData.menuConfig.isShowMenu = false;
//   }
//   e.stopPropagation();
// };

// // 向后一步
// const moveBack = (e) => {
//   if (mainData.menuConfig.isShow.moveForward) {
//     ElMessage.error("未选中该节点！");
//     // ElMessage.info("已经不可以再后退了！");
//   } else {
//     console.log("向后移动");
//     let nextStep = toFindNextNodeOfCurrentNode(mainData.menuConfig.selectKey);
//     elOutlineTree.value.setCurrentKey(nextStep);
//     mainData.menuConfig.isShowMenu = false;
//   }
//   e.stopPropagation();
// };

// // 撤销
// const undo = (e) => {
//   if (mainData.menuConfig.isShow.undo) {
//     ElMessage.error("这个组件没有撤销的空间！");
//   } else {
//     console.log("撤销");
//     props.commands["undo"]();
//   }
//   e.stopPropagation();
// };

// // 还原
// const redo = (e) => {
//   if (mainData.menuConfig.isShow.redo) {
//     ElMessage.error("这个组件没有还原的空间！");
//   } else {
//     console.log("还原");
//     props.commands["redo"]();
//   }
//   e.stopPropagation();
// };

// 检测 mainData.menuConfig.key 的变化实时更新大纲节点数据
//#endregion

watch(
  () => mainData.menuConfig.key,
  (newVal) => {
    state.data[0].children = getOutlineData("page");
    console.log("mainData.menuConfig.key:" + newVal);
  }
);
</script>

<template>
  <div class="ElOutline" @mousedown="closeMenu">
    <div class="ElOutline-top">
      <ElSearch :search="state.search"></ElSearch>
    </div>
    <div class="ElOutline-content" v-contextmenu.prevent="showMenu">
      <el-tree
        ref="elOutlineTree"
        class="filter-tree"
        :data="state.data"
        :props="state.defaultProps"
        :filter-node-method="filterNode"
        node-key="node-key"
        highlight-current
        default-expand-all
        @current-change="trackingFocus"
      >
      </el-tree>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ElOutline {
  width: 100%;
  height: 100%;

  &-top {
    width: 100%;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;

    &-input {
      width: 220px;
      height: 28px;
      display: flex;
      border-radius: 3px;
      border: 1px solid #cdcdce;
      transition: all 0.3s;
      overflow: hidden;

      input {
        width: 192px;
        height: 100%;
        padding-left: 10px;
        border: none;
        color: #202020;

        &:focus + span {
          color: #2468f2;
        }
      }
      span {
        width: 28px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        cursor: pointer;
      }

      &:hover {
        border: 1px solid #2468f2;
      }

      &-focus {
        border: 1px solid #2468f2;
      }
    }
  }
  &-content {
    position: relative;
  }
}
</style>
