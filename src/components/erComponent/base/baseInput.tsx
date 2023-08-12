import { defineComponent } from "vue";
import { ElInput } from "element-plus";
export default defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    return () => {
      const numericalProcessing = (newValue: string, key: string, obj: any) => {
        if (
          props.option.label == "左侧图标尺寸" ||
          props.option.label == "右侧图标尺寸" ||
          props.option.label == "宽度" ||
          props.option.label == "高度"
        ) {
          console.log(obj);

          if (newValue == "") {
            obj[key] = "0px";
          } else if (/^\d+$/.test(newValue)) {
            //如果为数字
            obj[key] = `${newValue}px`;
          } else if (/^\d+px$/.test(newValue)) {
            //如果为有px单位
            obj[key] = newValue;
          } else {
            //否则数值不改变
            obj[key] = obj.oldValue;
          }
        }
      };
      //保存改变前的数值
      const saveOldValue = (oldValue: string, obj: any) => {
        if (
          props.option.label == "左侧图标尺寸" ||
          props.option.label == "右侧图标尺寸" ||
          props.option.label == "宽度" ||
          props.option.label == "高度"
        ) {
          obj.oldValue = oldValue;
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
            onBlur={() =>
              numericalProcessing(props.option.value, "value", props.option)
            }
            onFocus={() => saveOldValue(props.option.value, props.option)}
          ></ElInput>
        </div>
      );
    };
  },
});
