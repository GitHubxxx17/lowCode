import { defineStore } from "pinia";
import { useCreateMap, parseMapToJson } from "../hooks/useCreateMap";
//拖拽数据
const mainStore = defineStore("mainStore", {
  state: () => {
    return {
      title: "新项目", //项目标题
      isPreview: false, //是否预览
      EditorData: null, //json数据（可删）
      copyData: null, //复制的数据
      wantDel: null, // 想要删除的数据
      wantCopy: null, // 想要复制的节点
      queue: [], //存放所有操作命令
      curPointerTo: -1, //前进后退的指针
      EditorDataMap: null,//编辑数据哈希树
      modify:{
        curData:null,//当前的选中的数据字符串
        modifying:0,//正在修改数据
        disabled:false,
      },
      isLoading: false, // 正在保存
      isSucessSave: false, // 成功保存
      isNeedSave: false, // 需要保存
      Breadcrumb: ["页面"], // 面包屑数据
      rootNode: null,
      menuConfig: {
        key: 0, // 判断大纲是否改变
        isShowMenu: false, // 是否展示菜单
        elOutlineTree: null,
        style: {
          top: "0px",
          left: "0px",
        },
        selectKey: "",
        isShow: {
          selectComponent: false,
          unselectComponent: false,
          makeACopy: false,
          copycomponents: false,
          shearComponents: false,
          pasteComponents: false,
          delComponents: false,
          moveForward: false,
          moveBack: false,
          undo: false,
          redo: false,
        },
      },
    };
  },
  actions: {
    setMap() {
      this.EditorDataMap = useCreateMap(this.modify);
      this.curData = JSON.stringify(this.EditorDataMap.get('page'))
    },
    setEditorData() {
      return parseMapToJson(this.EditorDataMap);
    },
  },
});
export default mainStore;
