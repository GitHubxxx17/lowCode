// 从vue-router按需导入两个方法
// createRouter方法用于创建路由实例对象
// createWebHashHistory方法用于指定路由的工作模式（hash模式）
import { createRouter, createWebHashHistory } from "vue-router";
import Editor from "../views/editor.vue";
import Login from "../views/login.vue";
// 创建路由对象
const router = createRouter({
  // 通过 history 属性，指定路由的工作模式
  history: createWebHashHistory(),
  // 通过 routes 数组，指定路由规则
  // path 是 hash 地址，component 是要展示的组件
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    { path: "/editor", component: Editor },
  ],
});

// 向外共享路由对象
export default router;
