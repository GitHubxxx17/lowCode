<script setup lang="ts">
import RenderNode from "./renderNode";
import pinia from "../../stores/index.ts";
import mainStore from "../../stores/mainStore.ts";
const props = defineProps(["dataKey"]);
const mainData = mainStore(pinia);

//判断是否为容器
const isContainer = (key: string): boolean => {
  return key.includes("container");
};
</script>
<!-- 利用transition-group绑定key和vue渲染机制实现拖拽动画，只需要修改渲染数据的顺序即可刷新dom节点实现拖拽动画移动 -->
<template>
  <transition-group move-class="move" class="transition" tag="div">
    <template
      v-for="item in mainData.EditorDataMap.get(props.dataKey).children"
      :key="item"
    >
      <RenderNode
        :dataKey="item"
        :EditorDataMap="mainData.EditorDataMap"
        v-if="!isContainer(item)"
      ></RenderNode>
      <RenderNode
        v-else
        :dataKey="item"
        :EditorDataMap="mainData.EditorDataMap"
      ></RenderNode>
    </template>
  </transition-group>
</template>

<style scoped>
.move {
  transition: transform 0.2s;
}
</style>
