<script setup lang="ts">
import { reactive } from "vue";
import property from "../erComponent/property";
import appearance from "../erComponent/appearance";
interface btn {
  label: String; // 标签
  active: boolean; // 是否被选择了
  isShow: boolean; // 是否显示
}
// 切换菜单的按钮
const buttons: btn[] = reactive([
  { label: "属性", active: true, isShow: true },
  { label: "外观", active: false, isShow: true },
  { label: "事件", active: false, isShow: true },
]);

// 选择按钮的点击事件selectBtn
const selectBtn = (index: number) => {
  buttons.forEach((button, i) => {
    if (i == index) {
      button.active = true;
      return;
    }
    button.active = false;
  });
};
</script>

<template>
  <div class="ErComponent">
    <div class="ErComponent-nav">
      <label
        v-for="(button, index) in buttons"
        v-show="button.isShow"
        @click="selectBtn(index)"
        class="ErComponent-nav-btn"
        :class="{ active: button.active }"
      >
        {{ button.label }}
      </label>
    </div>
    <property v-if="buttons[0].active"></property>
    <appearance v-if="buttons[1].active"></appearance>
  </div>
</template>

<style lang="scss">
.ErComponent {
  width: 280px;

  // 导航栏
  &-nav {
    width: 100%;
    height: 40px;
    display: flex;
    // justify-content: space-between;
    // align-items: center;
    border-bottom: 1px solid #cfcbcb;

    &-btn {
      flex: 1;
      position: relative;
      line-height: 40px;
      text-align: center;
      user-select: none;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        color: #2468f2;
      }

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 2px;
        background-color: #2468f2;
        border-radius: 3px;
        transition: all 0.2s ease-in-out;
      }
    }

    .active {
      &::after {
        width: 100%;
      }
    }
  }
}

// elCollapseItem的通用样式
.elCollapseItem {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  margin: 10px 0;
  margin-bottom: 15px;
  color: #5c5f66;
}
</style>
