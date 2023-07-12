import { defineComponent } from "vue";
import { ElButtonGroup } from "element-plus";
import pinia from "../../../stores/index.ts";
import dragStore from "../../../stores/dragStore.ts";
export default defineComponent({
  props: {
    setting: { type: Object },
  },
  setup(props) {
    const dragData = dragStore(pinia); //拖拽数据
    const buttonOnclick = (item) => {
      if (props.setting.value == "触发方式") {
        dragData.selectedComponent.bubblePrompt.triggerMode = item.value;
      }
      if (props.setting.value == "提示位置") {
        dragData.selectedComponent.bubblePrompt.promptLocation = item.value;
      }
    };

    return () => {
      return (
        <div class="elCollapseItem base-settings">
          <p>{props.setting.value}</p>
          <ElButtonGroup class="ml-4">
            {props.setting.options.map((item: any) => (
              <el-button
                size="small"
                class={[
                  item.value ==
                  dragData.selectedComponent.bubblePrompt.triggerMode
                    ? "buttonSelected"
                    : "",
                  item.value ==
                  dragData.selectedComponent.bubblePrompt.promptLocation
                    ? "buttonSelected"
                    : "",
                ]}
                onClick={() => {
                  buttonOnclick(item);
                }}
              >
                {item.value}
              </el-button>
            ))}
          </ElButtonGroup>
        </div>
      );
    };
  },
});
