import { defineComponent } from "vue";
import { ElRadio,ElRadioGroup } from "element-plus";
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
          <ElRadioGroup {...props.events} v-model={props.option.value} style={props.option.style.radio}>
            {
              props.option.radioData && props.option.radioData.map((item:any)=>{
                return <ElRadio label={item.value}>{item.value}</ElRadio>
              })
            }
          </ElRadioGroup>
        </>
      );
    };
  },
});
