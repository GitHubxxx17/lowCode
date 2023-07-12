import "@/sass/erComponent/property.scss";
import { defineComponent, inject, watch } from "vue";
import pinia from "../../stores/index.ts";
import dragStore from "../../stores/dragStore.ts";
import {ContainerProperty} from "./containers/container-editor.tsx"
export default defineComponent({
  props: {
    EditorData: Object,
  },
  setup(props) {
    const erConfig: any = inject("erConfig"); // 配置组件
    const dragData = dragStore(pinia); //拖拽数据
    // console.log();
    //  let map = new Map();
    //  console.log(map.get());

    // let propertyRender = erConfig.componentList.map(
    //   (component: any) =>
    //     component.type == dragData.selectKey && component.Properties()
    // );
    // console.log(propertyRender);

    // watch(
    //   () => dragData.selectKey,
    //   (newCount) => {
    //     propertyRender = erConfig.componentList.map(
    //       (component: any) =>
    //         component.type == newCount && component.Properties()
    //     );
    //   }
    // );
    return () => {
      return (
        <div class="property" key={dragData.selectedComponent}>
          {/* {erConfig.componentList.map(
            (component: any) =>
              component.type == dragData.selectKey && component.Properties()
          )} */}
          {erConfig.componentMap.get(dragData.selectKey)
            ? erConfig.componentMap.get(dragData.selectKey).Properties(dragData.selectedComponent)
            : <ContainerProperty option={props.EditorData}></ContainerProperty>}
        </div>
      );
    };
  },
});
