import { defineComponent } from "vue";
export default defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    return () => {
      return (
        <div class="elCollapseItem base-settings base-events">
          <p>{props.option.label}</p>
          <el-input-number
            v-model={props.option.value}
            min={props.option.min}
            max={props.option.max}
          ></el-input-number>
        </div>
      );
    };
  },
});
