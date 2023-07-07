import { defineComponent, reactive } from "vue";
import { BaseSelect } from "../base/baseSelect";
import { BaseTextArea } from "../base/baseTextArea";
import { BaseSwitch } from "../base/baseSwitch";
import { BaseInput } from "../base/baseInput";
import BaseAppearance from "../base/baseAppearance";
export const Appearance = defineComponent({
  props: {
    option: { type: Object },
  },
  setup() {
    

    return () => {
      return <div></div>;
    };
  },
});

export const Property = defineComponent({
  props: {
    option: { type: Object },
  },
  setup() {
    // 下拉器
    const activeNames: string[] = ["basic","options"];

    const textFormat = reactive({
      value: "普通文字",
      options: [
        {
          value: "普通文字",
        },
        {
          value: "段落",
        },
        {
          value: "一级标题",
        },
        {
          value: "二级标题",
        },
        {
          value: "三级标题",
        },
        {
          value: "四级标题",
        },
        {
          value: "五级标题",
        },
        {
          value: "六级标题",
        },
      ],
    });

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
            {/* <BaseSelect label="文字格式" setting={textFormat}></BaseSelect> */}
            <BaseSwitch option={state.multiple}></BaseSwitch>
            <BaseSwitch option={state.filterable}></BaseSwitch>
            {/* <BaseTextArea option={state.textContent}></BaseTextArea> */}
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
