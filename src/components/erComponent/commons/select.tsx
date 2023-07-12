import { defineComponent, reactive, watchEffect } from "vue";
import { BaseInput, BaseSwitch } from "../base/index";
import { ElInput,ElButton } from "element-plus";
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
        value: props.option.bindingField ? props.option.bindingField : "",
      },
      filterable: {
        label: "可搜索",
        value: props.option.filterable ? props.option.filterable : false,
      },
      multiple: {
        label: "是否多选",
        value: props.option.multiple ? props.option.multiple : false,
      },
      defaultValue: {
        label: "默认值",
        value: props.option.defaultValue ? props.option.defaultValue : "",
        clearable: true,
      },
      inputBoxPlaceholder: {
        label: "占位提示",
        value: props.option.inputBoxPlaceholder
          ? props.option.inputBoxPlaceholder
          : "",
        placeholder: "空内容提示占位",
      },
      selectData: [
        {
          radio: false,
          value: "选项A",
          isShow: false,
        },
        {
          radio: false,
          value: "选项B",
          isShow: false,
        },
        {
          radio: false,
          value: "选项C",
          isShow: false,
        },
      ],
    });

    watchEffect(() => {
      if (state.bindingField.value != "")
        props.option.bindingField = state.bindingField.value;
      else delete props.option.bindingField;
      if (state.filterable.value)
        props.option.filterable = state.filterable.value;
      else delete props.option.filterable;
      if (state.multiple.value) props.option.multiple = state.multiple.value;
      else delete props.option.multiple;
      if (state.defaultValue.value != "")
        props.option.defaultValue = state.defaultValue.value;
      else delete props.option.defaultValue;
      if (state.inputBoxPlaceholder.value != "")
        props.option.inputBoxPlaceholder = state.inputBoxPlaceholder.value;
      else delete props.option.inputBoxPlaceholder;
    });

    return () => {
      return (
        <>
          <elCollapse modelValue={activeNames}>
            <elCollapseItem title="基本" name="basic">
              <BaseInput option={state.bindingField}></BaseInput>
              <BaseSwitch option={state.multiple}></BaseSwitch>
              <BaseSwitch option={state.filterable}></BaseSwitch>
              <BaseInput option={state.defaultValue}></BaseInput>
              <BaseInput option={state.inputBoxPlaceholder}></BaseInput>
            </elCollapseItem>
            <elCollapseItem title="选项" name="options">
              <div class="elCollapseItem">数据</div>
              <div class="selectDataList">
                {state.selectData.map((item) => {
                  return (
                    <div class="elCollapseItem">
                      <div class="selectData">
                        <i class="icon iconfont icon-drag"></i>
                        <input
                          class="selectData-radio"
                          type="radio"
                          value="true"
                          name="defaultValue"
                          title="默认选中"
                        />
                        <ElInput v-model={item.value}></ElInput>
                        <div class="selectData-menu">
                          <i class="icon iconfont icon-caidan"></i>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div class="elCollapseItem selectDataList-footer">
                <ElButton plain>添加选项</ElButton>
                <ElButton plain>批量添加</ElButton>
              </div>
            </elCollapseItem>
          </elCollapse>
        </>
      );
    };
  },
});
