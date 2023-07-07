import { defineComponent } from "vue";
export const BaseInputNumber = defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    return () => {
      return (
        <div class="elCollapseItem base-settings">
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
