import { defineComponent } from "vue";
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
                <el-checkbox
                  label={item.value}
                  v-model={item.radio}
                  border={props.option.border}
                ></el-checkbox>
              );
            })}
        </>
      );
    };
  },
});
