import { defineComponent, reactive, watch, watchEffect } from "vue";
import {
  BaseInput,
  BaseSelect,
  BaseSwitch,
  BaseAppearance,
  BaseSize,
  BaseIconSelect,
  BasicPopup,
} from "../base/index";
export const ButtonAppearance = defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    // 显示组件的配置项
    const activeNames: string[] = ["basic", "layout"];

    const option: object = {
      writingStyle: true,
      bgColor: true,
      border: true,
      marginAndPadding: true,
      radius: true,
      style: props.option.style,
    };

    // 样式的下拉框选项
    const styleSelect = reactive({
      value: "默认",
      options: [
        {
          value: "默认",
        },
        {
          value: "主要",
        },
        {
          value: "成功",
        },
        {
          value: "信息",
        },
        {
          value: "警告",
        },
        {
          value: "危险",
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
      options: [{ value: "大" }, { value: "中" }, { value: "小" }],
    });

    const buttonAppearState = reactive({
      blockDisplay: { label: "块状显示", value: false },
      leftIconSize: {
        label: "左侧图标尺寸",
        value: "",
        placeholder: "请输入尺寸",
      },
      rightIconSize: {
        label: "右侧图标尺寸",
        value: "",
        placeholder: "请输入尺寸",
      },
    });

    console.log(props.option);

    // 基本初始化渲染
    (() => {
      // 样式
      if (props.option.buttonstyle == "") {
        styleSelect.value = "默认";
      } else if (props.option.buttonstyle == "primary") {
        styleSelect.value = "主要";
      } else if (props.option.buttonstyle == "success") {
        styleSelect.value = "成功";
      } else if (props.option.buttonstyle == "info") {
        styleSelect.value = "信息";
      } else if (props.option.buttonstyle == "warning") {
        styleSelect.value = "警告";
      } else {
        styleSelect.value = "危险";
      }
      // 块状显示
      if (props.option.style.display == "block") {
        buttonAppearState.blockDisplay.value = true;
      }
    })();

    // 自定义样式初始化渲染
    let showLeftIconSize: boolean = false;
    let showRightIconSize: boolean = false;
    (() => {
      // 是否显示左右侧图标尺寸输入框
      showLeftIconSize = props.option.icon.leftIcon ? true : false;
      showRightIconSize = props.option.icon.rightIcon ? true : false;
      // 左右侧图标尺寸
      if (props.option.icon.leftIconSize) {
        buttonAppearState.leftIconSize.value = props.option.icon.leftIconSize;
      }
      if (props.option.icon.leftIconSize) {
        buttonAppearState.rightIconSize.value = props.option.icon.rightIconSize;
      }
    })();

    watchEffect(() => {
      // 样式
      if (styleSelect.value == "默认") {
        props.option.buttonstyle = "";
      } else if (styleSelect.value == "主要") {
        props.option.buttonstyle = "primary";
      } else if (styleSelect.value == "成功") {
        props.option.buttonstyle = "success";
      } else if (styleSelect.value == "信息") {
        props.option.buttonstyle = "info";
      } else if (styleSelect.value == "警告") {
        props.option.buttonstyle = "warning";
      } else {
        props.option.buttonstyle = "danger";
      }
      // 块状显示
      if (buttonAppearState.blockDisplay.value) {
        props.option.style.display = "block";
      } else {
        props.option.style.display = "";
      }
      // 左右侧图标尺寸
      if (showLeftIconSize) {
        props.option.icon.leftIconSize = buttonAppearState.leftIconSize.value;
      } else {
        props.option.icon.leftIconSize = "";
      }
      if (showRightIconSize) {
        props.option.icon.rightIconSize = buttonAppearState.rightIconSize.value;
      } else {
        props.option.icon.rightIconSize = "";
      }
    });
    // 左右侧图标输入的规范

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
              <BaseInput
                v-show={showLeftIconSize}
                option={buttonAppearState.leftIconSize}
              ></BaseInput>
              <BaseInput
                v-show={showRightIconSize}
                option={buttonAppearState.rightIconSize}
              ></BaseInput>
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
        </>
      );
    };
  },
});

export const ButtonProperty = defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    const activeNames: string[] = ["basic", "layout"];
    console.log(props.option);

    const state = reactive({
      bindingField: {
        label: "名称",
        value: "我的按钮",
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
      leftIconSelect: {
        isShowList: false, // 是否展示列表
        clearable: false, // 是否有清除键
        isFill: false, // 是否有内容
        icon: "",
        iconText: "",
        clearIcon: "icon-cha",
      },
      rightIconSelect: {
        isShowList: false, // 是否展示列表
        clearable: false, // 是否有清除键
        isFill: false, // 是否有内容
        icon: "",
        iconText: "",
        clearIcon: "icon-cha",
      },
      disable: {
        label: "禁用",
        value: true,
      },
    });

    // subscript: {
    //   label: "角标",
    //   value: false,
    // },
    // hide: {
    //   label: "隐藏",
    //   value: false,
    // },

    // 二次确认的输入框
    const twiceComfireState = reactive({
      textarea: [{ label: "确认内容", value: "" }],
      hasTriggerMode: false,
      hasPromptLocation: false,
    });

    // 气泡提示的输入框
    const bubblePromptState = reactive({
      textarea: [
        { label: "正常提示", value: "" },
        {
          label: "禁用信息",
          value: "",
        },
      ],
      hasTriggerMode: true,
      hasPromptLocation: true,
    });

    // 基本初始化渲染
    (() => {
      // 名称
      if (state.bindingField.value != props.option.children) {
        state.bindingField.value = props.option.children;
      }
      // 二次确认
      if (props.option.twiceComfire.value) {
        state.twiceComfire.value = true;
        twiceComfireState.textarea[0].value = props.option.twiceComfire.info;
      } else {
        state.twiceComfire.value = false;
      }

      // 左侧图标
      state.leftIconSelect.icon = props.option.icon.leftIcon
        ? props.option.icon.leftIcon
        : "";
      state.leftIconSelect.iconText = props.option.icon.leftIcon
        ? props.option.icon.leftIcon.replace("icon-", "")
        : "";

      // 右侧图标
      state.rightIconSelect.icon = props.option.icon.rightIcon
        ? props.option.icon.rightIcon
        : "";
      state.rightIconSelect.iconText = props.option.icon.rightIcon
        ? props.option.icon.rightIcon.replace("icon-", "")
        : "";

      // 气泡提示
      if (props.option.bubblePrompt.value) {
        state.bubblePrompt.value = true;
        bubblePromptState.textarea[0].value =
          props.option.bubblePrompt.normalInfo; // 正常提示
        bubblePromptState.textarea[1].value =
          props.option.bubblePrompt.disableInfo; // 禁用提示
      } else {
        state.twiceComfire.value = false;
      }
    })();

    // 状态初始化渲染
    (() => {
      // 禁用
      state.disable.value = props.option.isDisable;
    })();

    // 监听数据实现双向绑定
    watchEffect(() => {
      // 名称
      if (state.bindingField.value != "我的按钮") {
        props.option.children = state.bindingField.value
          ? state.bindingField.value
          : "我的按钮";
      }

      // 二次确认
      if (state.twiceComfire.value) {
        props.option.twiceComfire.value = true;
        props.option.twiceComfire.info = twiceComfireState.textarea[0].value;
      } else {
        props.option.twiceComfire.value = false;
        props.option.twiceComfire.info = twiceComfireState.textarea[0].value =
          "";
      }

      // 气泡提示
      if (state.bubblePrompt.value) {
        props.option.bubblePrompt.value = true;
        props.option.bubblePrompt.normalInfo =
          bubblePromptState.textarea[0].value; // 正常提示
        props.option.bubblePrompt.disableInfo =
          bubblePromptState.textarea[1].value; // 禁用提示
      } else {
        props.option.bubblePrompt.value = false;
        props.option.bubblePrompt.normalInfo =
          bubblePromptState.textarea[0].value = ""; // 正常提示
        props.option.bubblePrompt.disableInfo =
          bubblePromptState.textarea[1].value = ""; // 禁用提示

        //  触发方式
        if (props.option.bubblePrompt.triggerMode != "鼠标悬浮") {
          props.option.bubblePrompt.triggerMode = "鼠标悬浮";
        }

        // 提示位置
        if (props.option.bubblePrompt.promptLocation != "下") {
          props.option.bubblePrompt.promptLocation = "下";
        }
      }
      // 禁用
      props.option.isDisable = state.disable.value;
    });

    // 监听选择左右侧按钮的列表显示状态
    watch(
      () => state.leftIconSelect.isShowList,
      (newValue) => {
        if (newValue && state.rightIconSelect.isShowList) {
          state.rightIconSelect.isShowList = false;
        }
      }
    );

    watch(
      () => state.rightIconSelect.isShowList,
      (newValue) => {
        if (newValue && state.leftIconSelect.isShowList) {
          state.leftIconSelect.isShowList = false;
        }
      }
    );

    return () => {
      return (
        <>
          <elCollapse modelValue={activeNames}>
            <elCollapseItem title="基本" name="basic">
              <BaseInput option={state.bindingField}></BaseInput>
              <BaseSwitch option={state.twiceComfire}></BaseSwitch>
              <BasicPopup
                v-show={state.twiceComfire.value}
                setting={twiceComfireState}
              ></BasicPopup>

              <BaseIconSelect
                label="左侧图标"
                setting={state.leftIconSelect}
              ></BaseIconSelect>
              <BaseIconSelect
                label="右侧图标"
                setting={state.rightIconSelect}
              ></BaseIconSelect>
              <BaseSwitch option={state.bubblePrompt}></BaseSwitch>
              <BasicPopup
                v-show={state.bubblePrompt.value}
                setting={bubblePromptState}
              ></BasicPopup>
              {/* <BaseSwitch option={state.subscript}></BaseSwitch> */}
            </elCollapseItem>
            <elCollapseItem title="状态" name="state">
              {/* <BaseSwitch option={state.hide}></BaseSwitch> */}
              <BaseSwitch option={state.disable}></BaseSwitch>
            </elCollapseItem>
          </elCollapse>
        </>
      );
    };
  },
});
