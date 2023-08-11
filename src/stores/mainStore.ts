import { defineStore } from "pinia";
import { useCreateMap,parseMapToJson } from "../hooks/useCreateMap";
//拖拽数据
const mainStore = defineStore("mainStore", {
  state: () => {
    return {
        title:'新项目',//项目标题
        isPreview:false,//是否预览
        EditorData:null,//json数据
        copyData:null,//复制的数据
        EditorDataMap:null
    };
  },
  actions: {
    setMap(){
      this.EditorDataMap = useCreateMap(this.EditorData);
    },
    setEditorData(){
      this.EditorData = parseMapToJson(this.EditorDataMap);
    }
  },
});
export default mainStore;
