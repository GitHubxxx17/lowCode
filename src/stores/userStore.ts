import { defineStore } from "pinia";
//拖拽数据
const userStore = defineStore("userStore", {
  state: () => {
    return {
      username: "", // 用户名
      token: "", // token
    };
  },
});
export default userStore;
