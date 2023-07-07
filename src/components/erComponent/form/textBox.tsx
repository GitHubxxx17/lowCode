import { defineComponent, reactive } from "vue";
import { BaseSelect } from "../base/baseSelect";
import { BaseTextArea } from "../base/baseTextArea";
import { BaseSwitch } from "../base/baseSwitch";
import BaseAppearance from "../base/baseAppearance";
export const Appearance = defineComponent({
  props: {
    option: { type: Object },
  },
  setup() {
    const option = {
      writingStyle:true,
      bgColor:true,
      border:true,
      marginAndPadding:true,
      radius:true,
      shadow:true,
    };

    return () => {
      return <BaseAppearance option={option}></BaseAppearance>;
    };
  },
});

export const Property = defineComponent({
  props: {
    option: { type: Object },
  },
  setup() {
    // 下拉器
    const activeNames: string[] = ["basic","layout"];


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
      whetherInline: {
        label: "内联模式",
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
            <BaseSelect label="文字格式" setting={textFormat}></BaseSelect>
            <BaseSwitch option={state.whetherInline}></BaseSwitch>
            <BaseTextArea option={state.textContent}></BaseTextArea>
          </elCollapseItem>
          </elCollapse>
        </>
      );
    };
  },
});
