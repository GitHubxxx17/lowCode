import { defineStore } from 'pinia'
//拖拽数据
const dragStore = defineStore('dragStore', {
    state: () => {
        return {
            selectedMaterial: null,//选中的物料
            isClone: false,//是否处于克隆组件
            isDrag: false,//是否处于拖拽

        }
    },
    actions: {

    }
})
export default dragStore