import { defineComponent, reactive, ref, watchEffect } from "vue";
import {
  BaseInput,
  BaseSelect,
  BaseSwitch,
  BaseAppearance,
} from "../base/index";
import { ElInputNumber } from "element-plus";
export const InputAppearance = defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    const activeNames: string[] = ["basic", "layout"];

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

    const InputStyleOption = {
      writingStyle: true,
      bgColor: true,
      border: true,
      marginAndPadding: true,
      radius: true,
      style: props.option.style,
    };

    const labelStyleOption = {
      writingStyle: true,
      marginAndPadding: true,
      style: props.option.style,
    };

    const widthState = reactive({
      label: "宽度",
      value: "",
      placeholder: "请输入宽度",
    });

    // 布局的下拉框选项
    const layoutSelect = reactive({
      value: "继承",
      options: [
        {
          value: "内联",
        },
        {
          value: "水平",
        },
        {
          value: "垂直",
        },
        {
          value: "继承",
        },
      ],
    });

    // 控件高度的下拉框选项
    const controlHeight = reactive({
      value: "默认（占满）",
      options: [
        {
          value: "极小",
        },
        {
          value: "小",
        },
        {
          value: "中",
        },
        {
          value: "大",
        },
        {
          value: "默认（占满）",
        },
      ],
    });
    return () => {
      return (
        <>
          <elCollapse modelValue={activeNames}>
            <elCollapseItem title="表单项" name="from">
              <BaseSelect label="布局" setting={layoutSelect}></BaseSelect>
              <BaseSelect label="控件高度" setting={controlHeight}></BaseSelect>
            </elCollapseItem>
            <elCollapseItem title="Label样式" name="labelStyle">
              <BaseInput option={widthState}></BaseInput>
              <BaseAppearance option={labelStyleOption}></BaseAppearance>
            </elCollapseItem>
            <elCollapseItem title="输入框样式" name="inputStyle">
              <BaseSelect label="状态" setting={stateSelect}></BaseSelect>
              <BaseAppearance option={InputStyleOption}></BaseAppearance>
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

export const InputProperty = defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    // 下拉器
    const activeNames: string[] = ["basic", "layout"];

    // 基本
    const BasicState = reactive({
      inputStyle: {
        value: "文本(text)",
        options: [
          { value: "文本(text)" },
          { value: "密码(password)" },
          { value: "数字(number)" },
          { value: "按钮(button)" },
          { value: "邮箱(email)" },
          { value: "文件(file)" },
          { value: "日期(date)" },
          { value: "月份(month)" },
          { value: "周(week)" },
          { value: "时间(time)" },
          { value: "单选项(radio)" },
          { value: "复选框(checkbox)" },
          { value: "颜色(color)" },
          { value: "重置按钮(reset)" },
          { value: "提交按钮(submit)" },
          { value: "隐藏(hidden)" },
        ],
      },
      inputValue: { label: "默认值", value: "", placeholder: "请输入" },
      defaultValue: {
        label: "默认值",
        value: "",
        placeholder: "请输入",
      },
      clearable: {
        label: "可清除",
        value: false,
      },
      countor: {
        label: "计数器",
        value: false,
      },
    });

    // 最大字数
    const maxNum = ref(1);
    const handleMaxNum = (value: number) => {
      console.log(value);
    };

    // 状态
    const inputState = reactive({
      hide: {
        label: "隐藏",
        value: false,
      },
      staticDisplay: {
        label: "静态展示",
        value: false,
      },
      onlyRead: {
        label: "只读",
        value: false,
      },
      disable: {
        label: "禁用",
        value: false,
      },
      delhidden: {
        label: "隐藏时删除字段",
        value: false,
      },
    });

    let reg = /(?<=\()(.+?)(?=\))/g; // 获取括号里面的值

    // 基本初始化渲染
    (() => {
      // 输入类型
      if (props.option.inputStyle != "input") {
        for (let i = 0; i < BasicState.inputStyle.options.length; i++) {
          let value = BasicState.inputStyle.options[i].value.match(reg);
          if (value[0] == props.option.inputStyle) {
            BasicState.inputStyle.value =
              BasicState.inputStyle.options[i].value;
          }
          if (value[0] == "password") {
            props.option.showPassword = true;
          }
        }
      }
    })();

    //  双向绑定
    watchEffect(() => {
      // 输入类型
      props.option.inputStyle = BasicState.inputStyle.value.match(reg)[0];
      if (props.option.inputStyle != "password") {
        props.option.showPassword = false;
      }
    });

    return () => {
      return (
        <>
          <elCollapse modelValue={activeNames}>
            <elCollapseItem title="基本" name="basic">
              <BaseSelect
                label="输入类型"
                setting={BasicState.inputStyle}
              ></BaseSelect>
              <BaseInput option={BasicState.defaultValue}></BaseInput>
              <BaseSwitch option={BasicState.clearable}></BaseSwitch>
              <BaseSwitch option={BasicState.countor}></BaseSwitch>
              <div class="elCollapseItem base-settings flexSelectContainer">
                <p>最大字数</p>
                <ElInputNumber
                  v-model={maxNum.value}
                  class="mx-4"
                  controls-position="right"
                  onChange={handleMaxNum}
                />
              </div>
            </elCollapseItem>
            <elCollapseItem title="状态" name="state">
              <BaseSwitch option={inputState.hide}></BaseSwitch>
              <BaseSwitch option={inputState.staticDisplay}></BaseSwitch>
              <BaseSwitch option={inputState.onlyRead}></BaseSwitch>
              <BaseSwitch option={inputState.disable}></BaseSwitch>
              <BaseSwitch option={inputState.delhidden}></BaseSwitch>
            </elCollapseItem>
          </elCollapse>
        </>
      );
    };
  },
});
