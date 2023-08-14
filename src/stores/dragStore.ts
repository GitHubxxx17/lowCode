import { defineStore } from "pinia";
//拖拽数据
const dragStore = defineStore("dragStore", {
  state: () => {
    return {
      selectedMaterial: null, //选中的物料
      isClone: false, //是否处于克隆组件
      isDrag: false, //是否处于拖拽
      isDraging: false, //是否处于拖拽中
      selectKey: null, // 记录选中的节点类型
      selectParent: null, //选择的父节点
      selectedComponent: null, //选中的组件
      containerData: null, //选中组件的父节点数据
      selectedIndex: null, //选中组件的下标
      dragEl: null,
    };
  },
  actions: {
    destructionOfDrag: null,
  },
});
export default dragStore;
