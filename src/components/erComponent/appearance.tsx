import "@/sass/erComponent/appearance.scss";
import { defineComponent, inject } from "vue";
import pinia from "../../stores/index.ts";
import dragStore from "../../stores/dragStore.ts";
export default defineComponent({
  setup() {
    const erConfig: any = inject("erConfig"); // 配置组件
    const dragData = dragStore(pinia); //拖拽数据
    return () => {
      return (
        <div class="appearance" key={dragData.selectedComponent}>
          {" "}
          {erConfig.componentMap.get(dragData.selectKey)
            ? erConfig.componentMap.get(dragData.selectKey).appearances(dragData.selectedComponent)
            : ""}
        </div>
      );
    };
  },
});
