<script setup lang="ts">
import dragStore from "../../stores/dragStore.ts";
import mainStore from "../../stores/mainStore.ts";
import pinia from "../../stores/index.ts";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { ElMessage } from "element-plus";

const dragData = dragStore(pinia);
const mainData = mainStore(pinia);
mainData.setEditorData();
//复制数据到剪切板
const copyData = () => {
  const textArea = document.createElement("textarea");
  textArea.value = JSON.stringify(dragData.selectedComponent || mainData.EditorData);
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
  ElMessage.success({ message: "复制源码成功", duration: 1000 });
  
};
</script>

<template>
  <div class="ElJsonViewer">
    <div class="ElJsonViewer-top">
      <span>源码</span>
      <i class="icon iconfont icon-copy" @click="copyData"></i>
    </div>
    <vue-json-pretty
      virtual
      showIcon
      showSelectController
      :height="820"
      :data="dragData.selectedComponent || mainData.EditorData"
    ></vue-json-pretty>
  </div>
</template>

<style lang="scss" scoped>
.ElJsonViewer {
  width: 100%;
  height: 100%;
  &-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 42px;
    padding: 0 10px;
    font-size: 14px;

    i {
      font-size: 18px;
      cursor: pointer;
      &:hover {
        color: #4769ff;
      }
    }
  }
}
.vjs-tree.is-virtual {
  &::-webkit-scrollbar {
    width: 4px;
    height: 7px;
  }

  &::-webkit-scrollbar-thumb {
    border: 1px solid #fff;
    border-radius: 6px;
    background: #c9c9c9;
  }
}
</style>
