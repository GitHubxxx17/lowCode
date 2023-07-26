import "../../sass/Popover/popUp.scss";
import { defineComponent, ref } from "vue";
import router from "../../router/index.ts";
import SettingPages from "./settingPages.vue";
import userStore from "../../stores/userStore.ts";
import pinia from "../../stores/index.ts";
import { sessionGetData } from "../../hooks/useStorage.ts";

export default defineComponent({
  setup() {
    const userData = userStore(pinia); // 用户数据

    // 我的主页
    const changeHome = () => {
      router.push("/home");
    };
    // 我的设置
    const modifyForm = ref(false);

    // 退出登录
    const exist = () => {
      router.push("/login");
      sessionStorage.clear();
      localStorage.clear();
    };
    return () => {
      return (
        <div class="setting">
          <div class="setting-user">
            <div class="setting-user-portrait">
              <img src="assets/user.jpg" alt="" />
            </div>
            <div
              class="setting-user-info"
              title={
                userData.username
                  ? userData.username
                  : sessionGetData("username")
              }
            >
              {userData.username
                ? userData.username
                : sessionGetData("username")}
            </div>
          </div>
          <div class="setting-line"></div>
          <div class="setting-common">
            <div class="icon iconfont icon-yonghu"></div>
            <div class="setting-common-name" onClick={() => changeHome()}>
              我的主页
            </div>
          </div>
          <div
            class="setting-common"
            onClick={() => {
              modifyForm.value = true;
            }}
          >
            <div class="icon iconfont icon-xiugai"></div>
            <div class="setting-common-name">我的设置</div>
          </div>
          <el-dialog title="我的设置" v-model={modifyForm.value} width="540px">
            <SettingPages></SettingPages>
          </el-dialog>
          <div class="setting-common setting-warn" onClick={() => exist()}>
            <div class="icon iconfont icon-h"></div>
            <div class="setting-common-name">退出登录</div>
          </div>
        </div>
      );
    };
  },
});
