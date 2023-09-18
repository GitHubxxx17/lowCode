<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import mainStore from "../../stores/mainStore.ts";
import dragStore from "../../stores/dragStore";
import pinia from "../../stores/index.ts";
import ElSearch from "./ElSearch.tsx";
import { showMenu, closeMenu } from "../../hooks/useMenu.ts";

const mainData = mainStore(pinia);
const dragData = dragStore(pinia);
let elOutlineTree = ref(null);

const state: any = reactive({
  data: [
    {
      id: 1,
      label: "页面",
      "node-key": "page",
      children: mainData.OutlineData,
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

watch(
  () => mainData.OutlineData,
  (newVal) => {
    state.data[0].children = newVal;
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
