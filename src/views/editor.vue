<script setup lang="ts">
import { provide, reactive, watch } from "vue";
import data from "../data.json";
import EditorLeft from "../components/editor/EditorLeft.vue";
import EditorRight from "../components/editor/EditorRight.vue";
import EditorContainer from "../components/editor/EditorContainer";
import { editorConfig } from "../utils/editor-config";
import { erConfig } from "../utils/ErComponent-config";
import EditorPreview from "../components/editor/EditorPreview.tsx";
import { ElMessage } from "element-plus";
provide("editorConfig", editorConfig);
provide("erConfig", erConfig);
const EditorData = reactive(data);

const state = reactive({
  isPreview: false,
  dialogIsShow: false,
});

const title = reactive({
  value: "新项目",
});

watch(()=>title.value,(newVal)=>{
  if(newVal.trim() == ''){
    ElMessage.warning({ message: "标题不能为空", duration: 1000 });
  }
})
// let editArea = ref(null);
// onMounted(() => {
//   const getEditAreaData = ()=> {
//     return {
//       top: editArea.value.offsetTop,
//       left: editArea.value.offsetLeft,
//       height: editArea.value.offsetHeight,
//       width: editArea.value.offsetWidth,
//     };
//   }
//   console.log(getEditAreaData());
// });
const enterPreview = () => {
  state.isPreview = true;
  ElMessage.success({ message: "已进入预览模式", duration: 2000 });
};

const downFile = () => {
  const a = document.createElement("a");
  a.style.display = "none";
  //文件的名称为时间戳加文件名后缀
  a.download = +new Date() + ".json";
  //生成一个blob二进制数据，内容为json数据
  var blob = new Blob([JSON.stringify(EditorData)]);
  //生成一个指向blob的URL地址，并赋值给a标签的href属性
  a.href = URL.createObjectURL(blob);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

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
  <div class="editor" v-show="!state.isPreview">
    <header class="editor-header">
      <div class="editor-header-left">
        <span class="editor-header-left-exit">
          <i class="icon iconfont icon-fanhui"></i>
        </span>
        <h2>codeFlow</h2>
      </div>
      <div class="editor-header-mid">
        <div class="editor-header-mid-title">
          <input type="text" v-model="title.value" />
        </div>
      </div>
      <div class="editor-header-right">
        <div
          class="editor-header-right-shortcut"
          @click="state.dialogIsShow = true"
        >
          <i class="icon iconfont icon-jianpan"></i>
        </div>
        <div class="editor-header-right-btn" @click="enterPreview">预览</div>
        <div class="editor-header-right-btn" @click="downFile()">导出</div>
        <div class="editor-header-right-avatar">
          <img src="@/assets/user.jpg" alt="user" />
        </div>
      </div>
    </header>
    <section class="editor-body">
      <div class="editor-body-left">
        <EditorLeft :EditorData="EditorData"></EditorLeft>
      </div>
      <div class="editor-body-container">
        <div class="editor-body-container-top"></div>
        <div class="editor-body-container-content">
          <div class="editor-body-container-content_inner" ref="editArea">
            <EditorContainer :EditorData="EditorData"></EditorContainer>
          </div>
        </div>
      </div>
      <div class="editor-body-right">
        <EditorRight :EditorData="EditorData"></EditorRight>
      </div>
    </section>
  </div>
  <EditorPreview
    v-if="state.isPreview"
    :state="state"
    :EditorData="EditorData"
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
