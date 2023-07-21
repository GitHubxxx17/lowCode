<script setup lang="ts">
import { reactive } from "vue";
import data from "../data.json";
import HomeViewer from "../components/renderer/homeViewer";
import mainStore from "../stores/mainStore.ts";
import pinia from "../stores/index.ts";
import { localGetData } from "../hooks/useStorage.ts";

const mainData = mainStore(pinia);
mainData.title = localGetData("title") ? localGetData("title") : "新项目";
mainData.EditorData = localGetData("data")
  ? localGetData("data")
  : reactive(data);
</script>

<template>
  <div class="home">
    <header class="home-header">
      <div class="home-header-left">
        <h2>codeFlow</h2>
      </div>
      <div class="home-header-right">
        <div class="home-header-right-btn">进入编辑</div>
        <div class="home-header-right-btn">新建页面</div>
        <div class="home-header-right-avatar">
          <img src="@/assets/user.jpg" alt="user" />
        </div>
      </div>
    </header>
    <section class="home-body">
      <div class="home-body-left">
        <div class="home-body-left-header">
          <span>我的页面</span>
        </div>
        <div class="home-body-left-content">
          <ul>
            <li class="active">
              <div class="title">{{ mainData.title }}</div>
              <i class="del icon iconfont icon-cha"></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="home-body-right">
        <div class="home-body-right-viewer">
          <HomeViewer :EditorData="mainData.EditorData"></HomeViewer>
        </div>
      </div>
    </section>
  </div>


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
    }
  }
}
</style>
