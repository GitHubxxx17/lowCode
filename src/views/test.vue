<template>
  <div
    v-contextmenu.prevent="showMenu"
    @mousedown="closeMenu"
    class="menu-container"
  >
    <div v-if="isShowMenu" :style="{ top: menuY, left: menuX }" class="menu">
      <el-menu class="el-menu-vertical-demo">
        <el-menu-item index="1">
          <template #title>取消选中</template>
        </el-menu-item>
        <i></i>
        <el-menu-item index="2">
          <template #title>重复一份</template>
        </el-menu-item>
        <el-menu-item index="3">
          <template #title>复制组件</template>
        </el-menu-item>
        <el-menu-item index="4">
          <template #title>剪切组件</template>
        </el-menu-item>
        <el-menu-item index="5">
          <template #title>粘贴组件</template>
        </el-menu-item>
        <el-menu-item index="5">
          <template #title>删除</template>
        </el-menu-item>
        <i></i>
        <el-menu-item index="5">
          <template #title>向前移动</template>
        </el-menu-item>
        <el-menu-item index="5">
          <template #title>向后移动</template>
        </el-menu-item>
        <i></i>
        <el-menu-item index="5">
          <template #title>撤销 (UnDo)</template>
        </el-menu-item>
        <el-menu-item index="5">
          <template #title>还原 (ReDo)</template>
        </el-menu-item>
      </el-menu>
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
  // 处理菜单项的操作
  closeMenu();
};
</script>

<!-- 样式 -->
<style scoped lang="scss">
.menu-container {
  position: relative;
  width: 300px;
  height: 200px;
  background-color: lightgray;
}

.menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  min-width: 100px;

  .el-menu-vertical-demo {
    min-width: 100px;
    max-width: 100px;
    text-align: center;
    i {
      display: block;
      width: 100%;
      border: 1px solid #e1e1e1;
    }
    .el-menu-item {
      height: 40px;
      line-height: 40px;
      justify-content: center;
    }
  }
}
</style>
