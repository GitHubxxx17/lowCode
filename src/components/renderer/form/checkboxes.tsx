import { defineComponent } from "vue";
import { ElCheckbox, ElCheckboxGroup } from "element-plus";
export default defineComponent({
  props: {
    option: { type: Object },
    events: { type: Object },
  },
  setup(props) {
    return () => {
      return (
        <>
          <div style={props.option.style.title}>
            {props.option.title ? props.option.title : "文本"}
          </div>
          <ElCheckboxGroup
            {...props.events}
            v-model={props.option.checkboxGroup}
            style={props.option.style.checkboxes}
          >
            {props.option.checkboxesData &&
              props.option.checkboxesData.map((item: any) => {
                return (
                  <ElCheckbox
                    label={item.value}
                    key={item.value}
                    checked={item.radio}
                    border={props.option.border}
                  ></ElCheckbox>
                );
              })}
          </ElCheckboxGroup>
        </>
      );
    };
  },
});
