<script setup lang="ts">
import { provide, reactive, ref, watch, onBeforeUnmount } from "vue";
// import data from "../data.json";
import EditorLeft from "../components/editor/EditorLeft.vue";
import EditorRight from "../components/editor/EditorRight.vue";
import EditorContainer from "../components/editor/EditorContainer";
import Menu from "../components/editor/Menu";
import PopUp from "../components/Popover/popUp";
import { editorConfig } from "../utils/editor-config";
import { erConfig } from "../utils/ErComponent-config";
import EditorPreview from "../components/editor/EditorPreview.tsx";
import { useCommand } from "../hooks/useCommand";
import {
  selectComponent,
  unselectComponent,
  makeACopy,
  copycomponents,
  shearComponents,
  pasteComponents,
  delComponents,
  moveForward,
  moveBack,
  undo,
  redo,
} from "../hooks/useMenu";
import mainStore from "../stores/mainStore.ts";
import pinia from "../stores/index.ts";
import { ElMessage, ElPopover } from "element-plus";
import { localGetData } from "../hooks/useStorage.ts";
import dragStore from "../stores/dragStore";
// 编辑器组件配置
provide("editorConfig", editorConfig);
// 右边配置栏配置
provide("erConfig", erConfig);
// 主要数据
const mainData = mainStore(pinia);
// 拖拽数据
const dragData = dragStore(pinia);
// 项目页面标题
mainData.title = localGetData("title") ? localGetData("title") : "新项目";
// 将json数据转换为map
mainData.setMap();

mainData.modify.curData = JSON.stringify(mainData.EditorDataMap.get("page"));
//挂载命令
const { commands } = useCommand();

const state = reactive({
  dialogIsShow: false, //快捷键弹窗是否展示
});

const editorTitle = ref(null);
const isFocus = ref(false);
// 如果项目名为空的话不失焦
const keepFocus = (value: string) => {
  isFocus.value = false;
  if (value.trim() == "") {
    editorTitle.value.focus();
    ElMessage.warning({ message: "标题不能为空", duration: 1000 });
  }
};

// 当标题为空时不取消聚焦
watch(
  () => mainData.title,
  (newVal) => {
    if (newVal.trim() == "") {
      ElMessage.warning({ message: "标题不能为空", duration: 1000 });
    }
  }
);

// 快捷键
const shortcuts = [
  { label: "复制", key: "Ctrl+C" },
  { label: "粘贴", key: "Ctrl+V" },
  { label: "撤销", key: "Ctrl+Z" },
  { label: "还原", key: "Ctrl+Y" },
  { label: "剪切", key: "Ctrl+X" },
  { label: "保存", key: "Ctrl+S" },
  { label: "删除", key: "Delete" },
  { label: "预览", key: "Ctrl+P" },
  { label: "退出预览", key: "ESC" },
  { label: "导出", key: "Ctrl+E" },
];

// 获取面包屑数据

// 监听 dragData.selectKey 的实时变化实现面包屑的实时变化
watch(
  () => dragData.selectKey,
  () => {
    mainData.wantDel = dragData.selectKey;
    mainData.wantCopy = dragData.selectKey;
    if (dragData.selectKey != "page")
      mainData.getBreadcrumbData(
        mainData.EditorDataMap.get("page").children,
        editorConfig,
        dragData.selectKey
      );
    else {
      mainData.Breadcrumb = ["页面"];
    }
  }
);

// 保存数据
const saveData = reactive({
  icon: "icon-duigouzhong",
  context: "所有更改已保存",
});

watch(
  () => mainData.isSucessSave,
  (newVal) => {
    if (newVal) {
      console.log("保存成功");
      mainData.isLoading = false;
      saveData.icon = "icon-duigouzhong";
      saveData.context = "已保存";
    }
  }
);

watch(
  () => mainData.isNeedSave,
  (newVal) => {
    if (newVal) {
      mainData.isLoading = false;
      saveData.icon = "icon-weixuanzhong";
      saveData.context = "未保存";
    }
  }
);

watch(
  () => mainData.isLoading,
  (newVal) => {
    if (newVal) {
      saveData.icon = "icon-weixuanzhong";
      saveData.context = "正在保存";
    }
  }
);

watch(
  () => mainData.menuConfig.selectKey,
  (newVal) => {
    // 控制如果是根节点配置显示
    if (newVal === "page") {
      console.log("根节点");
      mainData.menuConfig.isShow.makeACopy = true;
      mainData.menuConfig.isShow.copycomponents = false;
      mainData.menuConfig.isShow.shearComponents = true;
      mainData.menuConfig.isShow.pasteComponents = true;
      mainData.menuConfig.isShow.delComponents = true;
      mainData.menuConfig.isShow.moveForward = true;
      mainData.menuConfig.isShow.moveBack = true;
    } else {
      mainData.menuConfig.isShow.makeACopy = false;
      mainData.menuConfig.isShow.copycomponents = false;
      mainData.menuConfig.isShow.shearComponents = false;
      mainData.menuConfig.isShow.pasteComponents = false;
      mainData.menuConfig.isShow.delComponents = false;
      if (mainData.queue.length <= 0) {
        mainData.menuConfig.isShow.undo = true;
        mainData.menuConfig.isShow.redo = true;
      } else {
        mainData.menuConfig.isShow.undo = false;
        mainData.menuConfig.isShow.redo = false;
      }
    }
  }
);

const closeContextmenu = () => {
  mainData.menuConfig.isShowMenu = false;
};

document.addEventListener("click", closeContextmenu);

// 监听鼠标右键是否被按下方法 1， oncontextmenu事件
document.oncontextmenu = function () {
  console.log("全局右击事件");
  mainData.menuConfig.isShowMenu = false;
};

// 获取树节点数据
const getOutlineData = (key: any, id: number = 2) => {
  let newId = id || 2;
  let parent = mainData.EditorDataMap.get(key).children;
  if (Array.isArray(parent)) {
    let children = [];
    parent.forEach((item, i) => {
      let temp = mainData.EditorDataMap.get(item);
      let label = editorConfig.componentMap.get(temp.type).label;
      children.push({
        id: newId + i,
        "node-key": item,
        label: label,
        children: getOutlineData(item, id + parent.length),
      });
    });
    return children;
  } else {
    return [];
  }
};

// 检测 mainData.menuConfig.key 的变化实时更新大纲节点数据
watch(
  () => mainData.menuConfig.key,
  () => {
    mainData.OutlineData = getOutlineData("page");
    console.log("重新获取");
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  document.oncontextmenu = null;
  document.removeEventListener("click", closeContextmenu);
});
</script>

<template>
  <div class="editor" v-show="!mainData.isPreview">
    <header class="editor-header">
      <div class="editor-header-left">
        <span class="editor-header-left-exit" @click="$router.go(-1)">
          <i class="icon iconfont icon-fanhui"></i>
        </span>
        <h2>codeFlow</h2>
      </div>
      <div class="editor-header-mid">
        <div class="editor-header-mid-title" :class="{ active: isFocus }">
          <input
            type="text"
            v-model="mainData.title"
            ref="editorTitle"
            @blur="keepFocus(mainData.title)"
            @focus="isFocus = true"
          />
          <div class="isSave">
            <div class="svg" v-if="mainData.isLoading">
              <svg class="circle" viewBox="0 0 1024 1024">
                <circle
                  class="loading-circle"
                  cx="512"
                  cy="512"
                  r="330"
                  fill="none"
                  stroke="url(#gradient)"
                  stroke-width="60"
                />
                <defs>
                  <linearGradient id="gradient">
                    <stop offset="0%" stop-color="#ffffff" />
                    <stop offset="18%" stop-color="#ffffff" />
                    <stop offset="18%" stop-color="#000000" />
                    <stop offset="100%" stop-color="#000000" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <i
              class="icon iconfont"
              :class="saveData.icon"
              v-if="!mainData.isLoading"
            ></i>
            <span>{{ saveData.context }}</span>
          </div>
        </div>
      </div>
      <div class="editor-header-right">
        <div
          class="editor-header-right-shortcut"
          @click="state.dialogIsShow = true"
        >
          <i class="icon iconfont icon-jianpan"></i>
        </div>
        <div class="editor-header-right-btn" @click="commands['preview']()">
          预览
        </div>
        <div class="editor-header-right-btn" @click="commands['export']()">
          导出
        </div>
        <el-popover placement="bottom" :width="200" trigger="click">
          <template #reference>
            <div class="editor-header-right-avatar">
              <img src="@/assets/user.jpg" alt="user" />
            </div>
          </template>
          <PopUp></PopUp>
        </el-popover>
      </div>
    </header>
    <section class="editor-body">
      <div class="editor-body-left">
        <EditorLeft></EditorLeft>
      </div>
      <div class="editor-body-container">
        <div class="editor-body-container-top">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item v-for="item in mainData.Breadcrumb"
              ><span class="el-breadcrumb-button">
                {{ item }}</span
              ></el-breadcrumb-item
            >
          </el-breadcrumb>
        </div>
        <div class="editor-body-container-content">
          <div class="editor-body-container-content_inner" ref="editArea">
            <EditorContainer
              :EditorData="mainData.EditorDataMap"
            ></EditorContainer>
          </div>
        </div>
      </div>
      <div class="editor-body-right">
        <EditorRight :EditorData="mainData.EditorDataMap"></EditorRight>
      </div>
    </section>
  </div>
  <EditorPreview
    v-if="mainData.isPreview"
    :EditorData="mainData.EditorDataMap"
  ></EditorPreview>
  <el-dialog title="快捷键" v-model="state.dialogIsShow" width="30%">
    <ul class="shortcuts">
      <li v-for="item in shortcuts" :key="item.key">
        <label>{{ item.label }}</label>
        <div class="shortcuts-key">{{ item.key }}</div>
      </li>
    </ul>
  </el-dialog>
  <Menu
    :selectComponent="selectComponent"
    :unselectComponent="unselectComponent"
    :makeACopy="makeACopy"
    :copycomponents="copycomponents"
    :shearComponents="shearComponents"
    :delComponents="delComponents"
    :pasteComponents="pasteComponents"
    :moveForward="moveForward"
    :moveBack="moveBack"
    :undo="undo"
    :redo="redo"
    :commands="commands"
  ></Menu>
</template>

<style lang="scss" scoped>
.editor {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  max-height: 100%;

  &-header {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid #e8e9eb;

    &-mid {
      min-width: 180px;

      &-title {
        display: flex;
        justify-content: center;
        align-items: center;

        .isSave {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          color: #9aa5c6;
          background-color: #fff;

          .svg {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 18px; /* 调整高度以适应加载圆 */
            margin: 0 5px;
            .circle {
              width: 18px;
              height: 18px;
            }

            .loading-circle {
              animation: rotateStroke 2s linear infinite,
                dash 2s linear infinite;
              transform-origin: center;
              stroke-dasharray: 12 40; /* 调整虚线模式 */
              stroke-dashoffset: 0;
            }

            @keyframes rotateStroke {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }

            @keyframes dash {
              0% {
                stroke-dashoffset: 0;
              }
              100% {
                stroke-dashoffset: -12;
              }
            }
          }

          span {
            white-space: nowrap; /* 防止换行 */
            overflow: hidden; /* 溢出隐藏 */
            text-overflow: ellipsis; /* 显示省略号 */
          }

          .icon-weixuanzhong,
          .icon-duigouzhong,
          .icon-yuanxingdacha {
            font-size: 18px;
            margin: 0 5px;
            color: #9aa5c6;
          }

          .icon-yuanxingdacha {
            font-size: 12px;
          }
        }
      }

      input {
        width: auto;
        max-width: 150px;
        min-width: 50px;
        font-size: 18px;
        border: none;
        padding: 5px;
        text-align: right;
      }
      .active {
        border-bottom: 1px solid #2468f2;
      }
    }

    &-left,
    &-right {
      display: flex;
      align-items: center;
    }

    &-left {
      min-width: 200px;
      &-exit {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 4px;
        margin-right: 15px;
        cursor: pointer;

        i {
          width: 14px;
        }

        .icon-fanhui {
          font-size: 20px;
        }

        &:hover {
          background-color: #eaecee;
        }

        &:active {
          background: #d5d6d8;
        }
      }
      h2 {
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          color: #2468f2;
        }
      }
    }

    &-right {
      min-width: 240px;
      &-shortcut {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 4px;
        margin: 0 12px;
        cursor: pointer;

        .icon-jianpan {
          font-size: 20px;
        }

        &:hover {
          background-color: #eaecee;
        }

        &:active {
          background: #d5d6d8;
        }
      }

      &-btn {
        text-align: center;
        line-height: 30px;
        width: 60px;
        height: 30px;
        border-radius: 4px;
        border: 1px solid #000;
        margin: 0 12px;
        cursor: pointer;
        user-select: none;

        &:hover {
          background: #2468f2;
          color: #fff;
          border: none;
        }

        &:active {
          background: #4a86fe;
        }
      }

      &-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 12px;
        cursor: pointer;
      }
    }
  }

  &-body {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background-color: #efeff1;
    z-index: 10;
    overflow: hidden;

    &-left {
      z-index: 100;
      width: 310px;
      height: 100%;
      background-color: #ffffff;
      box-shadow: 2px 0 20px 0 rgba(0, 0, 0, 0.1);
    }

    &-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;

      &-top {
        position: absolute;
        width: 100%;
        height: 42px;
        background-color: #fff;
        display: flex;
        padding: 0 20px;
        align-items: center;
        .el-breadcrumb {
          flex: 1;
          line-height: 30px;
          overflow: hidden;
          height: 30px;
          .el-breadcrumb__inner .el-breadcrumb-button {
            font-size: 12px !important;
            color: #151b26 !important;
          }
          .el-breadcrumb__inner .el-breadcrumb-button:hover {
            font-weight: 900 !important;
            color: #2468f2 !important;
          }
        }
      }

      &-content {
        width: 100%;
        height: 100%;
        padding: 66px 16px 16px 24px;
        flex: 1;
        background-color: #efeff1;
        max-width: calc(100vw - 590px);
        min-width: 500px;

        &_inner {
          width: 100%;
          height: 100%;
          background-color: #fff;
          box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.2);
        }
      }
    }

    &-right {
      z-index: 100;
      width: 280px;
      min-width: 280px;
      height: 100%;
      background-color: #ffffff;
      box-shadow: -2px 0 20px 0 rgba(0, 0, 0, 0.1);
    }
  }
}
.shortcuts {
  li {
    width: 100%;
    height: 40px;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-key {
    padding: 3px 8px;
    background-color: #eeeeee;
    border-radius: 4px;
  }
}
</style>
