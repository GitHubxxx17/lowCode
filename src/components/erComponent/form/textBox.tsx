import { defineComponent, reactive, watchEffect } from "vue";
import {
  BaseInput,
  BaseSelect,
  BaseSwitch,
  BaseAppearance,
} from "../base/index";
export const TextBoxAppearance = defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    // 下拉器
    const activeNames: string[] = [
      "basic",
      "titleType",
      "inputBoxType",
      "styleSource",
    ];

    const state = reactive({
      layout: {
        value: "垂直",
        options: [
          {
            value: "水平",
          },
          {
            value: "垂直",
          },
        ],
      },
      inputBoxSize: {
        value: "占满",
        options: [
          {
            value: "占满",
          },
          {
            value: "大",
          },
          {
            value: "中",
          },
          {
            value: "小",
          },
          {
            value: "极小",
          },
        ],
      },
      titleType: {
        writingStyle: true,
        marginAndPadding: true,
        style: props.option.style.title,
      },
      inputBoxType: {
        writingStyle: true,
        bgColor: true,
        border: true,
        marginAndPadding: true,
        radius: true,
        style: props.option.style.input,
      },
    });

    // watchEffect(() => {});

    return () => {
      return (
        <elCollapse modelValue={activeNames}>
          <elCollapseItem title="基本" name="basic">
            <BaseSelect label="布局" setting={state.layout}></BaseSelect>
            <BaseSelect
              label="输入框尺寸"
              setting={state.inputBoxSize}
            ></BaseSelect>
          </elCollapseItem>
          <elCollapseItem title="标题样式" name="titleType">
            <BaseAppearance option={state.titleType}></BaseAppearance>
          </elCollapseItem>
          <elCollapseItem title="输入框样式" name="inputBoxType">
            <BaseAppearance option={state.inputBoxType}></BaseAppearance>
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

export const TextBoxProperty = defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    // 下拉器
    const activeNames: string[] = ["basic", "layout"];

    const state = reactive({
      bindingField: {
        label: "绑定字段",
        value: props.option.bindingField ? props.option.bindingField : "",
        placeholder: "请输入字段",
      },
      title: {
        label: "标题",
        value: props.option.title ? props.option.title : "",
        placeholder: "请输入标题",
      },
      inputType: {
        value: props.option.inputType ? props.option.inputType  : "文本",
        options: [
          {
            value: "文本",
          },
          {
            value: "密码",
          },
          {
            value: "邮箱",
          },
        ],
      },
      clearable: {
        label: "可清除",
        value: props.option.clearable ? props.option.clearable : false,
      },
      inputBoxPlaceholder: {
        label: "占位提示",
        value: props.option.inputBoxPlaceholder
          ? props.option.inputBoxPlaceholder
          : "",
        placeholder: "空内容提示占位",
      },
    });

    watchEffect(() => {
      const textboxKey: string[] = [
        "bindingField",
        "title",
        "inputType",
        "clearable",
        "inputBoxPlaceholder",
      ];
      textboxKey.forEach((item) => {
        if (state[item].value != "") props.option[item] = state[item].value;
        else delete props.option[item];
      });
    });

    return () => {
      return (
        <>
          <elCollapse modelValue={activeNames}>
            <elCollapseItem title="基本" name="basic">
              <BaseInput option={state.bindingField}></BaseInput>
              <BaseSelect
                label="输入类型"
                setting={state.inputType}
              ></BaseSelect>
              <BaseInput option={state.title}></BaseInput>
              <BaseSwitch option={state.clearable}></BaseSwitch>
              <BaseInput option={state.inputBoxPlaceholder}></BaseInput>
            </elCollapseItem>
          </elCollapse>
        </>
      );
    };
  },
});
