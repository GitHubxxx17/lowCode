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
          <el-button-group>
            {props.option.list.map((item: any) => {
              return (
                <el-button
                class="disabled-el-button"
                  type={item.value == props.option.value ? "primary" : ""}
                  onClick={(_:any) => {
                    props.option.value = item.value;
                  }}
                >
                  {item.label}
                </el-button>
              );
            })}
          </el-button-group>
        </div>
      );
    };
  },
});
