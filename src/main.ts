import { createApp } from "vue";
import pinia from "./stores/index.ts";
import "./style.css";
import App from "./App.vue";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
import * as fundebug from "fundebug-javascript";
import FundebugVue from "fundebug-vue";

fundebug.init({
  apikey: "65cf2ce139c5de148d36878d28243875f31eea1d8573c9d04b6166af62ce9e7b",
});
// 导入路由模块
import router from "./router/index.ts";

const app = createApp(App);

// 引入前端监控
app.use(new FundebugVue(fundebug));

app.use(pinia);
app.use(ElementPlus);
// 挂载路由模块
app.use(router);
const vContextmenu = {
  mounted(el, binding) {
    el.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      binding.value(event);
    });
  },
};

// 注册自定义指令
app.directive("contextmenu", vContextmenu);
app.mount("#app");

export default app;
