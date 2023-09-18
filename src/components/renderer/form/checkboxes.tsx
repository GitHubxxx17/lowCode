import { defineComponent } from "vue";
import { ElCheckbox } from "element-plus";
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
          {props.option.checkboxesData &&
            props.option.checkboxesData.map((item: any) => {
              return (
                <ElCheckbox
                  label={item.value}
                  v-model={item.radio}
                  border={props.option.border}
                ></ElCheckbox>
              );
            })}
        </>
      );
    };
  },
});
