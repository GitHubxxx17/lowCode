<script setup lang="ts">
import { inject, reactive, ref, watchEffect } from "vue";
import mainStore from "../../../stores/mainStore";
import pinia from "../../../stores";
import { ElInput } from "element-plus";

const props = defineProps({
  option: Object,
});
console.log(props.option);

const mainData = mainStore(pinia);
const editorConfig = inject("editorConfig");
let targetComTree = ref(null);
const state: any = reactive({
  targetComPath: props.option.value,
  selectTarget: props.option.target,
  isShowTree: false,
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
});

// 跟踪聚焦
const trackingFocus = (node) => {
  state.selectTarget = node ? node["node-key"] : null;
  console.log(state.selectTarget);
  // 获取面包屑的数据
  mainData.getBreadcrumbData(
    mainData.EditorDataMap.get("page").children,
    editorConfig,
    state.selectTarget,
    0
  );
  state.targetComPath = "";
  for (let i = 0; i < mainData.targetComPath.length; i++) {
    state.targetComPath += mainData.targetComPath[i] + " > ";
  }
  state.targetComPath += "(" + state.selectTarget + ")";
  state.isShowTree = false;
};

document.addEventListener("click", (e) => {
  state.isShowTree = false;
  e.stopPropagation();
});

// 是否隐藏
const isHidden = ref(props.option.isHidden ? "1" : "0");

watchEffect(() => {
  props.option.isHidden = isHidden ? true : false;
  props.option.target = state.selectTarget;
  props.option.value = state.targetComPath;
});
</script>

<template>
  <div class="events-targetCom">
    <div class="events-targetCom-item">
      <div class="events-targetCom-title">
        <p>目标组件</p>
      </div>
      <div class="events-targetCom-select">
        <ElInput
          placeholder="输入关键字进行过滤"
          clearable
          v-model="state.targetComPath"
          @focus="() => (state.isShowTree = true)"
          @click="(e) => e.stopPropagation()"
        ></ElInput>
        <div class="events-targetCom-select-content" v-show="state.isShowTree">
          <el-tree
            ref="targetComTree"
            class="filter-tree"
            :data="state.data"
            :props="state.defaultProps"
            node-key="node-key"
            highlight-current
            default-expand-all
            @current-change="trackingFocus"
          >
          </el-tree>
        </div>
      </div>
    </div>
    <div class="events-targetCom-item">
      <div class="events-targetCom-title">
        <p>隐藏/显示</p>
      </div>
      <div class="events-targetCom-select">
        <el-radio v-model="isHidden" label="0">显示</el-radio>
        <el-radio v-model="isHidden" label="1">隐藏</el-radio>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.events-targetCom {
  width: 100%;
  height: 100%;
  &-item {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  &-title {
    flex: 1;
  }

  &-select {
    flex: 5;
    position: relative;
    .el-input {
      width: 50%;
    }
    &-content {
      position: absolute;
      top: 40px;
      background-color: #fff;
      z-index: 100;
      width: 50%;
      max-height: 300px;
      overflow: scroll;
      border: 1px solid #409eff;

      &::-webkit-scrollbar {
        width: 5px;
        height: 7px;
      }

      &::-webkit-scrollbar-thumb {
        border: 1px solid #fff;
        border-radius: 6px;
        background: #c9c9c9;
      }
    }
  }
}
</style>
