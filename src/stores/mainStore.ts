import { defineStore } from "pinia";
//拖拽数据
const mainStore = defineStore("mainStore", {
  state: () => {
    return {
        title:'新项目',//项目标题
        isPreview:false,//是否预览
        EditorData:null,//json数据
        copyData:null,//复制的数据
    };
  },
  actions: {},
});
export default mainStore;