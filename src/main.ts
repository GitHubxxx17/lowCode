import { createApp } from "vue";
import pinia from "./stores/index.ts";
import "./style.css";
import App from "./App.vue";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
// 导入路由模块
import router from "./router/index.ts";

const app = createApp(App);

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
