import { defineComponent } from "vue";
import { ElInput } from "element-plus";
export default defineComponent({
  props: {
    option:{type:Object}
  },
  setup(props) {
    return () => {
      return (
        <>
          <div class="elCollapseItem base-settings-textarea-text">
            <div>{props.option.label}</div>
          </div>
          <div class="elCollapseItem base-settings-textarea">
            <ElInput type="textarea" v-model={props.option.value}></ElInput>
          </div>
        </>
      );
    };
  },
});
