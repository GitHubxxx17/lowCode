import { defineComponent, reactive, watchEffect } from "vue";
import {
  BaseSwitch,
  BaseSelect,
  BaseTextArea,
  BaseAppearance,
} from "../base/index";
export const TextAppearance = defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    // 下拉器
    const activeNames: string[] = ["basic", "styleSource"];
    const option = {
      writingStyle: true,
      bgColor: true,
      border: true,
      marginAndPadding: true,
      radius: true,
      shadow: true,
      style: props.option.style,
    };

    return () => {
      return (
        <elCollapse modelValue={activeNames}>
          <elCollapseItem title="自定义样式" name="basic">
            <BaseAppearance option={option}></BaseAppearance>
          </elCollapseItem>
          <elCollapseItem title="样式源码" name="styleSource">
            <div class="elCollapseItem editStyle">
              <div class="editStyleSource">
                <i class="icon iconfont icon-daimajishufuwu"></i>
                <span>编辑样式源码</span>
              </div>
            </div>
          </elCollapseItem>
        </elCollapse>
      );
    };
  },
});

export const TextProperty = defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    // 下拉器
    const activeNames: string[] = ["basic", "layout"];

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
        value: props.option.children,
      },
    });

    if (props.option.style.display) state.whetherInline.value = false;

    watchEffect(() => {
      props.option.children = state.textContent.value;
      if (state.whetherInline.value) {
        delete props.option.style.display;
      } else {
        props.option.style.display = "block";
      }
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
