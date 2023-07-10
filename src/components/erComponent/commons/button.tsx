import { defineComponent, reactive } from "vue";
import {
  BaseInput,
  BaseSelect,
  BaseTextArea,
  BaseSwitch,
  BaseAppearance,
  BaseSize,
  BaseIconSelect,
} from "../base/index";
export const ButtonAppearance = defineComponent({
  props: {
    option: { type: Object },
  },
  setup() {
    const activeNames: string[] = ["basic", "layout"];
    const option = {
      writingStyle: true,
      bgColor: true,
      border: true,
      marginAndPadding: true,
      radius: true,
    };

    // 样式的下拉框选项
    const styleSelect = reactive({
      value: "默认",
      options: [
        {
          value: "默认",
        },
        {
          value: "链接",
        },
        {
          value: "主色",
        },
        {
          value: "淡色",
        },
        {
          value: "提示",
        },
        {
          value: "成功",
        },
        {
          value: "警告",
        },
        {
          value: "严重",
        },
        {
          value: "次要",
        },
        {
          value: "加强",
        },
      ],
    });

    // 状态的下拉框选项
    const stateSelect = reactive({
      value: "常规",
      options: [
        {
          value: "常规",
        },
        {
          value: "悬浮",
        },
        {
          value: "点击",
        },
      ],
    });

    // 尺寸按钮组内容
    const sizeContext = reactive({
      value: "尺寸",
      options: [
        { value: "极小" },
        { value: "小" },
        { value: "中" },
        { value: "大" },
      ],
    });

    const buttonAppearState = reactive({
      blockDisplay: { label: "块状显示", value: false },
      iconSize: {
        label: "图标尺寸",
        value: "",
        placeholder: "请输入尺寸",
      },
    });

    return () => {
      return (
        <>
          <elCollapse modelValue={activeNames}>
            <elCollapseItem title="基本" name="basic">
              <BaseSelect label="样式" setting={styleSelect}></BaseSelect>
              <BaseSwitch option={buttonAppearState.blockDisplay}></BaseSwitch>
              <BaseSize setting={sizeContext}></BaseSize>
            </elCollapseItem>
            <elCollapseItem title="自定义样式" name="customStyle">
              <BaseSelect label="状态" setting={stateSelect}></BaseSelect>
              <BaseAppearance option={option}></BaseAppearance>
              <BaseInput option={buttonAppearState.iconSize}></BaseInput>
            </elCollapseItem>
            <elCollapseItem title="样式源码" name="styleSourceCode">
              <div class="events">
                <div class="addEvents">
                  <span>编辑样式源码</span>
                </div>
              </div>
            </elCollapseItem>
          </elCollapse>
        </>
      );
    };
  },
});

export const ButtonProperty = defineComponent({
  props: {
    option: { type: Object },
  },
  setup() {
    const activeNames: string[] = ["basic", "layout"];

    const state = reactive({
      bindingField: {
        label: "名称",
        value: "按钮",
        placeholder: "请输入名称",
      },
      twiceComfire: {
        label: "二次确认",
        value: false,
      },
      bubblePrompt: {
        label: "气泡提示",
        value: false,
      },
      subscript: {
        label: "角标",
        value: false,
      },
      hide: {
        label: "隐藏",
        value: false,
      },
      disable: {
        label: "禁用",
        value: false,
      },
    });

    return () => {
      return (
        <>
          <elCollapse modelValue={activeNames}>
            <elCollapseItem title="基本" name="basic">
              <BaseInput option={state.bindingField}></BaseInput>
              <BaseSwitch option={state.twiceComfire}></BaseSwitch>
              <BaseSwitch option={state.bubblePrompt}></BaseSwitch>
              <BaseIconSelect label="左侧图标"></BaseIconSelect>
              <BaseIconSelect label="右侧图标"></BaseIconSelect>
              <BaseSwitch option={state.subscript}></BaseSwitch>
            </elCollapseItem>
            <elCollapseItem title="状态" name="state">
              <BaseSwitch option={state.hide}></BaseSwitch>
              <BaseSwitch option={state.disable}></BaseSwitch>
            </elCollapseItem>
          </elCollapse>
        </>
      );
    };
  },
});
