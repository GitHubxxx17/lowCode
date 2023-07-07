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
            placeholder="请输入名称"
            clearable
          ></ElInput>
        </div>
      );
    };
  },
});
