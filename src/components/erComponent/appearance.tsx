import "@/sass/erComponent/appearance.scss";
import { defineComponent, inject } from "vue";
import pinia from "../../stores/index.ts";
import dragStore from "../../stores/dragStore.ts";
import mainStore from "../../stores/mainStore.ts";
import { ContainerAppearance } from "./containers/container-editor.tsx";
export default defineComponent({
  props: {
    EditorData: Object,
  },
  setup() {
    const erConfig: any = inject("erConfig"); // 配置组件
    const dragData = dragStore(pinia); //拖拽数据
    const mainData = mainStore(pinia); //拖拽数据

    return () => {
      return (
        <div key={mainData.modify.modifying}>
          <div class="appearance" key={dragData.selectKey}>
            {erConfig.componentMap.get(
              dragData.selectKey?.replace(/-[^-]*$/, "")
            ) ? (
              erConfig.componentMap
                .get(dragData.selectKey?.replace(/-[^-]*$/, ""))
                .appearances(mainData.EditorDataMap.get(dragData.selectKey))
            ) : (
              <ContainerAppearance
                option={mainData.EditorDataMap.get("page")}
              ></ContainerAppearance>
            )}
          </div>
        </div>
      );
    };
  },
});
