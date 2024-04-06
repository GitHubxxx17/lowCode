<script setup lang="ts">
import { ref, defineAsyncComponent } from "vue";

const buttons = [
  {
    label: "组件",
    icon: "icon iconfont icon-zujian",
    component: defineAsyncComponent(
      () => import("../elComponent/ElComponent.tsx")
    ),
  },
  {
    label: "图标",
    icon: "icon iconfont icon-xiaolian",
    component: defineAsyncComponent(() => import("../elComponent/ElIcon.tsx")),
  },
  {
    label: "大纲",
    icon: "icon iconfont icon-list-outline",
    component: defineAsyncComponent(
      () => import("../elComponent/ElOutline.vue")
    ),
  },
  {
    label: "代码",
    icon: "icon iconfont icon-daima",
    component: defineAsyncComponent(
      () => import("../elComponent/ElJsonViewer.vue")
    ),
  },
];

const activeIndex = ref(0);
</script>

<template>
  <div class="EditorLeft">
    <div class="EditorLeft-nav">
      <ul>
        <li
          v-for="(item, index) of buttons"
          :key="index"
          :class="{ active: index == activeIndex }"
          @click="activeIndex = index"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </li>
      </ul>
    </div>
    <div class="EditorLeft-content">
      <keep-alive>
        <component :is="buttons[activeIndex].component"></component>
      </keep-alive>
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
