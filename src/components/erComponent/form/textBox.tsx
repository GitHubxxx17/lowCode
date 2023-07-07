import { defineComponent, reactive } from "vue";
import { BaseSelect } from "../base/baseSelect";
import { BaseSwitch } from "../base/baseSwitch";
import { BaseInput } from "../base/baseInput";
import BaseAppearance from "../base/baseAppearance";
export const TextBoxAppearance = defineComponent({
  props: {
    option: { type: Object },
  },
  setup() {
    // 下拉器
    const activeNames: string[] = ["basic", "titleType", "inputBoxType","styleSource"];

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
      },
      inputBoxType: {
        writingStyle: true,
        bgColor: true,
        border: true,
        marginAndPadding: true,
        radius: true,
      },
    });

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
  setup() {
    // 下拉器
    const activeNames: string[] = ["basic", "layout"];

    const state = reactive({
      bindingField: {
        label: "绑定字段",
        value: "",
        placeholder: "请输入字段",
      },
      title: {
        label: "标题",
        value: "",
        placeholder: "请输入标题",
      },
      inputType: {
        value: "文本",
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
        value: true,
      },
      inputBoxPlaceholder: {
        label: "占位提示",
        value: "",
        placeholder: "空内容提示占位",
      },
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
