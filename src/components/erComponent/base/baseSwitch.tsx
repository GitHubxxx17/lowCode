import { defineComponent } from "vue";
export default defineComponent({
  props: {
    option:{type:Object}
  },
  setup(props) {
    return () => { 
      return <div class="elCollapseItem base-settings">
      <p>{props.option.label}</p>
      <el-switch v-model={props.option.value}></el-switch>
    </div>;
    };
  },
});