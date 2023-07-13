import { defineComponent } from "vue";
import { BaseSize } from "./index";
import { ElInput } from "element-plus";
export default defineComponent({
  props: {
    setting: { type: Object },
  },
  setup(props) {
    const baseSetting: any = {
      triggerMode: {
        value: "触发方式",
        options: [{ value: "鼠标悬浮" }, { value: "聚焦" }],
      },
      promptLocation: {
        value: "提示位置",
        options: [
          { value: "上" },
          { value: "左" },
          { value: "下" },
          { value: "右" },
        ],
      },
    };
    return () => {
      return (
        <div class="basicPopup">
          <div class="basicPopup-triangle"></div>
          <div class="basicPopup-boxBgc">
            {props.setting.textarea.map((item) => (
              <div class="basicPopup-box">
                <p>{item.label}</p>
                <ElInput
                  type="textarea"
                  v-model={item.value}
                  resize="none"
                  class="input"
                  input-style={{ height: "80px" }}
                ></ElInput>
              </div>
            ))}
            <BaseSize
              v-show={props.setting.hasTriggerMode}
              setting={baseSetting.triggerMode}
            ></BaseSize>
            <BaseSize
              v-show={props.setting.hasPromptLocation}
              setting={baseSetting.promptLocation}
            ></BaseSize>

            {/* {props.setting.hasTriggerMode && (
              <BaseSize setting={baseSetting.triggerMode}></BaseSize>
            )}
            {props.setting.hasPromptLocation && (
              <BaseSize setting={baseSetting.promptLocation}></BaseSize>
            )} */}
            <div class="seizeAseat"></div>
          </div>
        </div>
      );
    };
  },
});
