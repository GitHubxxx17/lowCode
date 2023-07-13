import { defineComponent } from "vue";
import { ElInput } from "element-plus";
export default defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    return () => {
      const handlePx = (value) => {
        var regex = /\d+/; // 匹配出现的第一串数据
        if (
          props.option.label == "左侧图标尺寸" ||
          props.option.label == "右侧图标尺寸" ||
          props.option.label == "宽度" ||
          props.option.label == "高度"
        ) {
          props.option.value = value.match(regex)[0] + "px";
        }
      };
      return (
        <div class="elCollapseItem base-settings">
          <p>{props.option.label}</p>
          <ElInput
            v-model={props.option.value}
            placeholder={
              props.option.placeholder ? props.option.placeholder : "请输入内容"
            }
            clearable={props.option.clearable}
            onBlur={() => handlePx(props.option.value)}
          ></ElInput>
        </div>
      );
    };
  },
});
