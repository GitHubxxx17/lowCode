<template>
  <div>
    <div
      v-contextmenu.prevent="showMenu"
      @mousedown="closeMenu"
      class="context-menu-container"
    >
      <div
        v-if="isShowMenu"
        :style="{ top: menuY, left: menuX }"
        class="context-menu"
      >
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          :collapse="true"
        >
          <el-sub-menu index="1">
            <template #title>
              <i class="el-icon-location">选中按钮</i>
            </template>
            <el-menu-item-group>
              <template #title>分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <template #title>导航二</template>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <template #title>导航三</template>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <template #title>导航四</template>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isShowMenu = ref(false);
const menuX = ref("0px");
const menuY = ref("0px");

const showMenu = (event) => {
  event.preventDefault(); // 阻止浏览器默认右键菜单
  isShowMenu.value = true;
  menuX.value = event.pageX + "px";
  menuY.value = event.pageY + "px";
};

const closeMenu = () => {
  isShowMenu.value = false;
};

const handleMenuClick = (option) => {
  // 处理菜单项的操作，例如显示选中的选项
  console.log("Selected:", option);
  closeMenu();
};
</script>

<!-- 样式 -->
<style scoped lang="scss">
.el-menu-vertical-demo {
  width: 150px;
  min-height: 400px;
  text-align: center;
  .el-sub-menu,
  .is-active {
    display: flex;
    justify-content: center;
    text-align: center;

    .el-sub-menu__title,
    .el-tooltip__trigger {
      padding-right: 0 !important;
      text-align: center;
    }
    .el-sub-menu__title .el-icon-location {
      width: inherit;
    }
  }
}

.context-menu-container {
  position: relative;
  width: 300px;
  height: 200px;
  background-color: lightgray;
}

.context-menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  min-width: 100px;
}
.context-menu div {
  padding: 5px;
  cursor: pointer;
}
</style>
