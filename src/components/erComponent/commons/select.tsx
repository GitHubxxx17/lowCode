import { defineComponent, reactive } from "vue";
import { BaseSwitch } from "../base/baseSwitch";
import { BaseInput } from "../base/baseInput";
export const SelectAppearance = defineComponent({
  props: {
    option: { type: Object },
  },
  setup() {
    

    return () => {
      return <div></div>;
    };
  },
});

export const SelectProperty = defineComponent({
  props: {
    option: { type: Object },
  },
  setup() {
    // 下拉器
    const activeNames: string[] = ["basic","options"];

    const state = reactive({
      bindingField:{
        label: "绑定字段",
        value: true,
      },
      filterable: {
        label: "可搜索",
        value: true,
      },
      multiple:{
        label: "是否多选",
        value: true,
      },
      textContent: {
        label: "文字内容",
        value: "",
      },
    });

    return () => {
      return (
        <>
        <elCollapse modelValue={activeNames}>
          <elCollapseItem title="基本" name="basic">
          <BaseInput option={state.bindingField}></BaseInput>
            <BaseSwitch option={state.multiple}></BaseSwitch>
            <BaseSwitch option={state.filterable}></BaseSwitch>
          </elCollapseItem>
          <elCollapseItem title="选项" name="options">
          <div class="elCollapseItem">数据</div>
          <div class="elCollapseItem">

          </div>
          </elCollapseItem>
          </elCollapse>
        </>
      );
    };
  },
});
