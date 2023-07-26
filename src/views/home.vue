<script setup lang="ts">
import { reactive, onMounted } from "vue";
import data from "../data.json";
import HomeViewer from "../components/renderer/homeViewer";
import PopUp from "../components/Popover/popUp";
import mainStore from "../stores/mainStore.ts";
import userStore from "../stores/userStore.ts";
import pinia from "../stores/index.ts";
import { localSaveData, sessionGetData } from "../hooks/useStorage.ts";
import { getEditData, delEditData, addEditData } from "../request/api/home";
import { ElMessage, ElPopover } from "element-plus";

const mainData = mainStore(pinia);
const userData = userStore(pinia); // 用户数据
userData.token = sessionGetData("token");
const state = reactive({
  editdata: [],
  dialogVisible: false,
  delIndex: 0,
  selectIndex: 0,
});
//获取页面数据
const GetEditData = async () => {
  let res = await getEditData();
  state.editdata = res.data.editData.map((item: any, i: number) => {
    item.jsonData = JSON.parse(item.jsonData);
    item.active = false;
    if (i == 0) {
      item.active = true;
      mainData.EditorData = item.jsonData;
      mainData.title = item.title;
      state.selectIndex = item.id;
    }
    return item;
  });
  console.log(state.editdata);
};

//切换页面
const changeEditData = (index: number) => {
  state.editdata.forEach((item, i) => {
    item.active = false;
    if (i == index) {
      item.active = true;
      mainData.EditorData = item.jsonData;
      mainData.title = item.title;
      state.selectIndex = item.id;
    }
  });
};
//点击进入编辑
const enterEdit = ($router: any) => {
  $router.push("/editor");
  localSaveData("title", mainData.title);
  localSaveData("data", mainData.EditorData);
  localSaveData("id", state.selectIndex);
};
//弹出删除页面弹窗
const toDelPage = (e: any, i: number) => {
  e.stopPropagation();
  state.delIndex = i;
  state.dialogVisible = true;
};
//删除页面
const delPage = async () => {
  let res = await delEditData(state.editdata[state.delIndex].id);
  console.log(res);
  state.dialogVisible = false;
  state.editdata.splice(state.delIndex, 1);
  let l = state.editdata.length;
  if (l == 0) {
    mainData.EditorData = null;
    // localStorage.clear();
    localStorage.removeItem("title");
    localStorage.removeItem("data");
    return;
  }
  changeEditData(state.delIndex == l ? state.delIndex - 1 : state.delIndex);
  ElMessage.success({ message: res.data.msg, duration: 2000 });
};
//添加页面
const addPage = async ($router: any) => {
  let res = await addEditData({
    title: "未命名页面",
    jsonData: JSON.stringify(data),
  });
  ElMessage.success({ message: res.data.msg, duration: 1000 });
  $router.push("/editor");
  localSaveData("title", "未命名页面");
  localSaveData("data", data);
  localSaveData("id", res.data.id);
  console.log(res);
};
onMounted(() => {
  GetEditData();
});
</script>

<template>
  <div class="home">
    <header class="home-header">
      <div class="home-header-left">
        <h2>codeFlow</h2>
      </div>
      <div class="home-header-right">
        <div class="home-header-right-btn" @click="enterEdit($router)">
          进入编辑
        </div>
        <div class="home-header-right-btn" @click="addPage($router)">
          新建页面
        </div>

        <el-popover placement="bottom" :width="200" trigger="click">
          <template #reference>
            <div class="home-header-right-avatar">
              <img src="@/assets/user.jpg" alt="user" />
            </div>
          </template>
          <PopUp></PopUp>
        </el-popover>
      </div>
    </header>
    <section class="home-body">
      <div class="home-body-left">
        <div class="home-body-left-header">
          <span>我的页面</span>
        </div>
        <div class="home-body-left-content">
          <ul>
            <li
              v-for="(item, i) in state.editdata"
              :class="{ active: item.active }"
              @click="changeEditData(i)"
              :key="item.id"
            >
              <div class="title">{{ item.title }}</div>
              <i
                class="del icon iconfont icon-cha"
                @click="toDelPage($event, i)"
              ></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="home-body-right">
        <div v-if="state.editdata.length" class="home-body-right-viewer">
          <HomeViewer :EditorData="mainData.EditorData"></HomeViewer>
        </div>
        <div v-else class="home-body-right-none">
          <img src="@/assets/image/noneData1.png" alt="没有页面捏" />
        </div>
      </div>
    </section>
  </div>
  <el-dialog title="删除页面" v-model="state.dialogVisible" width="30%">
    <span>确认删除该页面吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delPage">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.home {
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

    &-left,
    &-right {
      display: flex;
      align-items: center;
    }

    &-left {
      h2 {
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          color: #2468f2;
        }
      }
    }

    &-right {
      &-btn {
        text-align: center;
        line-height: 30px;
        width: 80px;
        height: 30px;
        border-radius: 4px;
        border: 1px solid #000;
        margin: 0 12px;
        cursor: pointer;
        user-select: none;
        font-size: 14px;

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
      flex: 1;
      height: 100%;
      background-color: #ffffff;

      &-header {
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        font-size: 15px;
      }

      &-content {
        li {
          width: 100%;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          cursor: pointer;
          .title {
            font-size: 14px;
          }

          .del {
            display: none;
            &:hover {
              color: #2468f2;
            }
          }

          &:hover {
            background-color: #eef3fe;
            .del {
              display: block;
            }
          }
        }

        .active {
          background-color: #eef3fe;
        }
      }
    }

    &-right {
      position: relative;
      flex: 7;

      &-viewer {
        width: 100%;
        .cannotPreview {
          &::after {
            pointer-events: none !important;
          }
        }
      }

      &-none {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          max-width: 500px;
          max-height: 230px;
        }
      }
    }
  }
}
</style>
