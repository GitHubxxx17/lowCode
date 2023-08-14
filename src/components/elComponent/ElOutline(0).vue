<script setup lang="ts">
import { reactive, inject } from "vue";
import mainStore from "../../stores/mainStore.ts";
import pinia from "../../stores/index.ts";
const config: any = inject("editorConfig"); //组件配置
const mainData = mainStore(pinia);
console.log(mainData.EditorData);
mainData.setEditorData();

const getOutlineData = (data: any, id: number = 2) => {
  let newId = id || 2;
  if (Array.isArray(data)) {
    let arr = [];
    data.forEach((item, i) => {
      arr.push({
        id: newId + i,
        label: config.componentMap.get(item.type).label,
        children: getOutlineData(item.children, id + data.length),
      });
    });
    console.log(arr);

    return arr;
  } else {
    return [];
  }
};
const state: any = reactive({
  inputIsFocus: false,
  data: [
    {
      id: 1,
      label: "页面",
      children: getOutlineData(mainData.EditorData.body),
    },
  ],
  defaultProps: {
    children: "children",
    label: "label",
  },
  filterText: "",
});

//点击input
const searchFocus = (): void => {
  state.inputIsFocus = true;
};
//取消input焦点
const searchBlur = (): void => {
  state.inputIsFocus = false;
};
</script>

<template>
  <div class="ElOutline">
    <div class="ElOutline-top">
      <div
        :class="{
          'ElComponent-top-input-focus': state.inputIsFocus,
          'ElComponent-top-input': true,
        }"
      >
        <input
          type="text"
          placeholder="查找节点"
          @focus="searchFocus"
          @blur="searchBlur"
          v-model="state.filterText"
        />
        <span>
          <i class="icon iconfont icon-search"></i>
        </span>
      </div>
    </div>
    <div class="ElOutline-content">
      <el-tree
        class="filter-tree"
        :data="state.data"
        :props="state.defaultProps"
        default-expand-all
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
}
</style>
