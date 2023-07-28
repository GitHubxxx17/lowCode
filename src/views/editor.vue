<script setup lang="ts">
import { provide, reactive, ref, watch } from "vue";
import data from "../data.json";
import EditorLeft from "../components/editor/EditorLeft.vue";
import EditorRight from "../components/editor/EditorRight.vue";
import EditorContainer from "../components/editor/EditorContainer";
import PopUp from "../components/Popover/popUp";
import { editorConfig } from "../utils/editor-config";
import { erConfig } from "../utils/ErComponent-config";
import EditorPreview from "../components/editor/EditorPreview.tsx";
import { useCommand } from "../hooks/useCommand";
import mainStore from "../stores/mainStore.ts";
import pinia from "../stores/index.ts";
import { ElMessage, ElPopover } from "element-plus";
import { localGetData } from "../hooks/useStorage.ts";

provide("editorConfig", editorConfig);
provide("erConfig", erConfig);
const mainData = mainStore(pinia);
mainData.title = localGetData("title") ? localGetData("title") : "新项目";
mainData.EditorData = localGetData("data")
  ? localGetData("data")
  : reactive(data);
//挂载命令
const { commands } = useCommand();

const state = reactive({
  dialogIsShow: false, //快捷键弹窗是否展示
});

const editorTitle = ref(null);
// 如果项目名为空的话不失焦
const keepFocus = (value) => {
  if (value.trim() == "") {
    editorTitle.value.focus();
    ElMessage.warning({ message: "标题不能为空", duration: 1000 });
  }
};

watch(
  () => mainData.title,
  (newVal) => {
    if (newVal.trim() == "") {
      ElMessage.warning({ message: "标题不能为空", duration: 1000 });
    }
  }
);

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
        <div class="editor-header-mid-title">
          <input
            type="text"
            v-model="mainData.title"
            ref="editorTitle"
            @blur="keepFocus(mainData.title)"
          />
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
        <EditorLeft :EditorData="mainData.EditorData"></EditorLeft>
      </div>
      <div class="editor-body-container">
        <div class="editor-body-container-top"></div>
        <div class="editor-body-container-content">
          <div class="editor-body-container-content_inner" ref="editArea">
            <EditorContainer
              :EditorData="mainData.EditorData"
            ></EditorContainer>
          </div>
        </div>
      </div>
      <div class="editor-body-right">
        <EditorRight :EditorData="mainData.EditorData"></EditorRight>
      </div>
    </section>
  </div>
  <EditorPreview
    v-if="mainData.isPreview"
    :EditorData="mainData.EditorData"
  ></EditorPreview>

  <el-dialog title="快捷键" v-model="state.dialogIsShow" width="30%">
    <ul class="shortcuts">
      <li v-for="item in shortcuts" :key="item.key">
        <label>{{ item.label }}</label>
        <div class="shortcuts-key">{{ item.key }}</div>
      </li>
    </ul>
  </el-dialog>
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
      min-width: 50px;
      input {
        width: auto;
        max-width: 150px;
        min-width: 50px;
        font-size: 18px;
        border: none;
        padding: 5px;

        &:focus {
          border-bottom: 1px solid #2468f2;
        }
      }
    }

    &-left,
    &-right {
      display: flex;
      align-items: center;
    }

    &-left {
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

      &-top {
        width: 100%;
        height: 42px;
        background-color: #fff;
      }

      &-content {
        width: 100%;
        height: 100%;
        padding: 24px 16px 16px 24px;
        flex: 1;
        background-color: #efeff1;

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