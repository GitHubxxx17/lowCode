import { defineComponent, reactive, watchEffect } from "vue";
import { BaseInput, BaseSwitch } from "../base/index";
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
  setup(props) {
    // 下拉器
    const activeNames: string[] = ["basic", "options"];

    const state = reactive({
      bindingField: {
        label: "绑定字段",
        value: '',
      },
      filterable: {
        label: "可搜索",
        value: false,
      },
      multiple: {
        label: "是否多选",
        value: false,
      },
      textContent: {
        label: "文字内容",
        value: "",
      },
    });

    watchEffect(() => {
      if (state.bindingField.value != '')
        props.option.bindingField = state.bindingField.value;
      else delete props.option.bindingField;
      if (state.filterable.value)
        props.option.filterable = state.filterable.value;
      else delete props.option.filterable;
      if (state.multiple.value)
        props.option.multiple = state.multiple.value;
      else delete props.option.multiple;
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
              <div class="elCollapseItem"></div>
            </elCollapseItem>
          </elCollapse>
        </>
      );
    };
  },
});
