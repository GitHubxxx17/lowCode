<script setup lang="ts">
import { reactive } from "vue";
import ElComponent from "../elComponent/ElComponent.tsx";
import ElIcon from "../elComponent/ElIcon.tsx";
import ElJsonViewer from "../elComponent/ElJsonViewer.vue";
import ElOutline from "../elComponent/ElOutline.vue";
interface btn {
  label: String;
  icon: String;
  active: boolean;
}
const bottons: Array<btn> = reactive([
  { label: "组件", icon: "icon iconfont icon-zujian", active: true },
  { label: "图标", icon: "icon iconfont icon-xiaolian", active: false },
  { label: "大纲", icon: "icon iconfont icon-list-outline", active: false },
  { label: "代码", icon: "icon iconfont icon-daima", active: false },
]);
const onClickBtn = (index: number) => {
  bottons.forEach((item, i) => {
    if (i == index) {
      item.active = true;
      return;
    }
    item.active = false;
  });
};
</script>

<template>
  <div class="EditorLeft">
    <div class="EditorLeft-nav">
      <ul>
        <li
          v-for="(item, index) of bottons"
          :key="index"
          :class="{ active: item.active }"
          @click="onClickBtn(index)"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </li>
      </ul>
    </div>
    <div class="EditorLeft-content">
      <ElComponent v-if="bottons[0].active"></ElComponent>
      <ElIcon v-if="bottons[1].active"></ElIcon>
      <ElOutline v-if="bottons[2].active"></ElOutline>
      <ElJsonViewer v-if="bottons[3].active"></ElJsonViewer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.EditorLeft {
  width: 100%;
  height: 100%;
  display: flex;

  &-nav {
    width: 50px;
    height: 100%;
    border-right: 1px solid #e8e9eb;

    li {
      margin-top: 12px;
      width: 48px;
      height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      user-select: none;
      transition: all 0.1s ease-in-out;

      i {
        width: 25px;
        height: 32px;
      }

      .icon {
        font-size: 25px;
      }

      span {
        font-size: 14px;
      }

      &:hover {
        background-color: #eef3fe;
        color: #2468f2 !important;
      }
    }

    .active {
      border-left: 3px solid #2468f2;
      background-color: #eef3fe;
      color: #2468f2 !important;
    }
  }

  &-content {
    width: 100%;
    height: 100%;
    min-width: 260px;
  }
}
</style>
