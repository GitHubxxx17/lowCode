import { defineComponent } from "vue";
import { ElButtonGroup } from "element-plus";
export default defineComponent({
  props: {
    setting: { type: Object },
  },
  setup(props) {
    return () => {
      return (
        <div class="elCollapseItem base-settings">
          <p>{props.setting.value}</p>
          <ElButtonGroup class="ml-4">
            {props.setting.options.map((item: any) => (
              <el-button type="sucess" size="small">
                {item.value}
              </el-button>
            ))}
          </ElButtonGroup>
        </div>
      );
    };
  },
});
