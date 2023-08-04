import { defineComponent } from "vue";
import { ElButtonGroup } from "element-plus";
import pinia from "../../../stores/index.ts";
import dragStore from "../../../stores/dragStore.ts";
import mainStore from "../../../stores/mainStore.ts";
export default defineComponent({
  props: {
    setting: { type: Object },
  },
  setup(props) {
    const dragData = dragStore(pinia); //拖拽数据
    const mainData = mainStore(pinia); //拖拽数据
    const buttonOnclick = (item) => {
      if (props.setting.value == "触发方式") {
        mainData.EditorDataMap.get(dragData.selectKey).bubblePrompt.triggerMode = item.value;
      }
      if (props.setting.value == "提示位置") {
        mainData.EditorDataMap.get(dragData.selectKey).bubblePrompt.promptLocation = item.value;
      }
      if (props.setting.value == "尺寸") {
        mainData.EditorDataMap.get(dragData.selectKey).size = transSize(item.value);
      }
    };

    const transSize = (value): String => {
      if (value == "中") {
        return "default";
      } else if (value == "小") {
        return "small";
      } else {
        return "large";
      }
    };

    return () => {
      return (
        <div class="elCollapseItem base-settings">
          <p>{props.setting.value}</p>
          {mainData.EditorDataMap.get(dragData.selectKey).type == "button" && (
            <ElButtonGroup class="ml-4">
              {props.setting.options.map((item: any) => (
                <el-button
                  size="small"
                  class={[
                    item.value ==
                    mainData.EditorDataMap.get(dragData.selectKey).bubblePrompt.triggerMode
                      ? "buttonSelected"
                      : "",
                    item.value ==
                    mainData.EditorDataMap.get(dragData.selectKey).bubblePrompt.promptLocation
                      ? "buttonSelected"
                      : "",
                    transSize(item.value) == mainData.EditorDataMap.get(dragData.selectKey).size
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
          )}
          {mainData.EditorDataMap.get(dragData.selectKey).type != "button" && (
            <ElButtonGroup class="ml-4">
              {props.setting.options.map((item: any) => (
                <el-button
                  size="small"
                  class={[
                    transSize(item.value) == mainData.EditorDataMap.get(dragData.selectKey).size
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
          )}
        </div>
      );
    };
  },
});
