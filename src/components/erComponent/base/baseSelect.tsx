import { defineComponent } from "vue";
export default defineComponent({
  props: {
    label: { type: String },
    setting: { type: Object },
    change:{type:Function},
  },
  setup(props) {
    
    return () => {
      return (
        <div class="elCollapseItem base-settings">
          <p>{props.label}</p>
          <el-select
            v-model={props.setting.value}
            filterable={
              props.setting.filterable ? props.setting.filterable : true
            }
            placeholder={props.setting.placeholder ? props.setting.placeholder : ''}
            onChange={(value)=>props.change&&props.change(value)}
          >
            {props.setting.options.map((item: any) => {
              return (
                <el-option key={item.value} value={item.value}></el-option>
              );
            })}
          </el-select>
        </div>
      );
    };
  },
});
