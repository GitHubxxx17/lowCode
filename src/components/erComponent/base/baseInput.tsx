import { defineComponent } from "vue";
import { ElInput } from "element-plus";
export const BaseInput = defineComponent({
  props: {
    option:{type:Object}
  },
  setup(props) {
    return () => {
      return (
        <div class="elCollapseItem base-settings">
          <p>{props.option.label}</p>
          <ElInput
            v-model={props.option.value}
            placeholder={props.option.placeholder ? props.option.placeholder : '请输入内容'}
            clearable={props.option.clearable}
          ></ElInput>
        </div>
      );
    };
  },
});
