import { defineComponent, reactive, watchEffect } from "vue";
import {
  BaseInput,
  BaseSelect,
  BaseSwitch,
  BaseAppearance,
  BaseSize,
  BaseInputNumber,
} from "../base/index";
export const InputAppearance = defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    const activeNames: string[] = ["basic", "layout"];

    // 基本
    const BasicState = reactive({
      width: {
        label: "宽度",
        value: props.option.style.width,
        placeholder: "请输入输入框宽度",
      },
      height: {
        label: "宽度",
        value: props.option.style.height,
        placeholder: "请输入输入框高度",
      },
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

    const InputStyleOption = {
      writingStyle: true,
      bgColor: true,
      border: true,
      marginAndPadding: true,
      radius: true,
      style: props.option.style,
    };

    const sizeContext = reactive({
      value: "尺寸",
      options: [{ value: "大" }, { value: "中" }, { value: "小" }],
    });

    //#region
    // const labelStyleOption = {
    //   writingStyle: true,
    //   marginAndPadding: true,
    //   style: props.option.style,
    // };

    // const widthState = reactive({
    //   label: "宽度",
    //   value: "",
    //   placeholder: "请输入宽度",
    // });

    // 布局的下拉框选项
    // const layoutSelect = reactive({
    //   value: "继承",
    //   options: [
    //     {
    //       value: "内联",
    //     },
    //     {
    //       value: "水平",
    //     },
    //     {
    //       value: "垂直",
    //     },
    //     {
    //       value: "继承",
    //     },
    //   ],
    // });

    // 控件高度的下拉框选项
    // const controlHeight = reactive({
    //   value: "默认（占满）",
    //   options: [
    //     {
    //       value: "极小",
    //     },
    //     {
    //       value: "小",
    //     },
    //     {
    //       value: "中",
    //     },
    //     {
    //       value: "大",
    //     },
    //     {
    //       value: "默认（占满）",
    //     },
    //   ],
    // });
    //#endregion

    watchEffect(() => {
      console.log(props);

      // 宽度和高度
      props.option.style.width = BasicState.width.value;
      props.option.style.height = BasicState.height.value;
    });
    return () => {
      return (
        <>
          <elCollapse modelValue={activeNames}>
            <elCollapseItem title="基本" name="basic">
              <BaseInput option={BasicState.width}></BaseInput>
              <BaseInput option={BasicState.height}></BaseInput>
              <BaseSize setting={sizeContext}></BaseSize>
            </elCollapseItem>
            {/* <elCollapseItem title="表单项" name="from">
              <BaseSelect label="布局" setting={layoutSelect}></BaseSelect>
              <BaseSelect label="控件高度" setting={controlHeight}></BaseSelect>
            </elCollapseItem> */}
            {/* <elCollapseItem title="Label样式" name="labelStyle">
              <BaseInput option={widthState}></BaseInput>
              <BaseAppearance option={labelStyleOption}></BaseAppearance>
            </elCollapseItem> */}
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
          { value: "邮箱(email)" },
        ],
      },
      defaultValue: {
        label: "默认值",
        value: "",
        placeholder: "请输入输入框默认内容",
      },
      placeholderPrompt: {
        label: "占位提示",
        value: "",
        placeholder: "请输入占位提示",
      },
      clearable: {
        label: "可清除",
        value: false,
      },
      // countor: {
      //   label: "计数器",
      //   value: false,
      // },
      maxLength: {
        label: "最长输入长度",
        value: 0,
        min: 0,
      },
      minLength: {
        label: "最小输入长度",
        value: 0,
        min: 0,
      },
    });

    // 状态
    const inputState = reactive({
      hide: {
        label: "隐藏",
        value: false,
      },
      // staticDisplay: {
      //   label: "静态展示",
      //   value: false,
      // },
      onlyRead: {
        label: "只读",
        value: false,
      },
      disable: {
        label: "禁用",
        value: false,
      },
      autofocus: {
        label: "自动对焦",
        value: false,
      },
      // delhidden: {
      //   label: "隐藏时删除字段",
      //   value: false,
      // },
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
      // 默认值
      BasicState.defaultValue.value = props.option.value;
      // 占位提示
      BasicState.placeholderPrompt.value = props.option.placeholder;
      // 可清除
      BasicState.clearable.value = props.option.clearable;
      // 最长输入长度
      BasicState.maxLength.value = props.option.maxlength || 0;
      // 最小输入长度
      BasicState.minLength.value = props.option.minlength || 0;
      if (BasicState.maxLength.value && BasicState.maxLength.value != 0) {
        props.option.showWordLimit = true;
      }
    })();

    // 状态初始化渲染
    (() => {
      // 隐藏
      inputState.hide.value = props.option.hidden;
      // 只读
      inputState.onlyRead.value = props.option.readonly;
      // 禁用
      inputState.disable.value = props.option.disabled;
      // 自动对焦
      inputState.autofocus.value = props.option.autofocus;
    })();

    //  双向绑定
    watchEffect(() => {
      // 输入类型
      props.option.inputStyle = BasicState.inputStyle.value.match(reg)[0];
      if (props.option.inputStyle != "password") {
        props.option.showPassword = false;
      }
      // 默认值
      props.option.value = BasicState.defaultValue.value;
      // 占位提示
      props.option.placeholder = BasicState.placeholderPrompt.value;
      // 可清除
      if (BasicState.clearable.value)
        props.option.clearable = BasicState.clearable.value;
      else delete props.option.clearable;
      // 最长输入长度
      if(BasicState.maxLength.value != 0){
        props.option.maxlength = BasicState.maxLength.value;
      }else delete props.option.maxlength
      
      // 最小输入长度
      if(BasicState.minLength.value != 0){
        props.option.minlength = BasicState.minLength.value;
      }else delete props.option.minlength
      

      if (BasicState.maxLength.value && BasicState.maxLength.value > 0) {
        props.option.showWordLimit = true;
      } else {
        props.option.showWordLimit = false;
      }

      // 隐藏
      if (inputState.hide.value) props.option.hidden = inputState.hide.value;
      else delete props.option.hidden;
      // 只读
      if (inputState.onlyRead.value)
        props.option.readonly = inputState.onlyRead.value;
      else delete props.option.readonly;
      // 禁用
      if (inputState.disable.value)
        props.option.disabled = inputState.disable.value;
      else delete props.option.disabled;
      // 自动对焦
      if (inputState.autofocus.value)
        props.option.autofocus = inputState.autofocus.value;
      else delete props.option.autofocus;
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
              <BaseInput option={BasicState.placeholderPrompt}></BaseInput>
              <BaseSwitch option={BasicState.clearable}></BaseSwitch>
              {/* <BaseSwitch option={BasicState.countor}></BaseSwitch> */}
              {/* <div class="elCollapseItem base-settings flexSelectContainer">
                <p>最大输入长度</p>
                <ElInputNumber
                  v-model={maxNum.value}
                  class="mx-4"
                  controls-position="right"
                />
              </div> */}
              <BaseInputNumber option={BasicState.maxLength}></BaseInputNumber>
              <BaseInputNumber option={BasicState.minLength}></BaseInputNumber>
              {/* <div class="elCollapseItem base-settings flexSelectContainer">
                <p>最小输入长度</p>
                <ElInputNumber
                  v-model={minNum.value}
                  class="mx-4"
                  controls-position="right"
                />
              </div> */}
            </elCollapseItem>
            <elCollapseItem title="状态" name="state">
              <BaseSwitch option={inputState.hide}></BaseSwitch>
              {/* <BaseSwitch option={inputState.staticDisplay}></BaseSwitch> */}
              <BaseSwitch option={inputState.onlyRead}></BaseSwitch>
              <BaseSwitch option={inputState.disable}></BaseSwitch>
              <BaseSwitch option={inputState.autofocus}></BaseSwitch>
              {/* <BaseSwitch option={inputState.delhidden}></BaseSwitch> */}
            </elCollapseItem>
          </elCollapse>
        </>
      );
    };
  },
});
