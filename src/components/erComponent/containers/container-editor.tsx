import { defineComponent, reactive, watchEffect } from "vue";

import {
  BaseInput,
  BaseTextArea,
  BaseAppearance,
} from "../base/index";
export const ContainerAppearance = defineComponent({
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
          <elCollapseItem title="基本" name="basic">
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

export const ContainerProperty = defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    // 下拉器
    const activeNames: string[] = ["basic", "layout"];

    const state = reactive({
      pageTitle: {
        label: "页面标题",
        value: props.option.title ? props.option.title : "",
      },
      subtitle: {
        label: "副标题",
        value: props.option.subtitle ? props.option.subtitle : '',
      },
    });


    watchEffect(() => {
      props.option.subtitle = state.subtitle.value;
    });

    return () => {
      return (
        <>
          <elCollapse modelValue={activeNames}>
            <elCollapseItem title="基本" name="basic">
              <BaseInput option={state.pageTitle}></BaseInput>
              <BaseTextArea option={state.subtitle}></BaseTextArea>
            </elCollapseItem>
          </elCollapse>
        </>
      );
    };
  },
});
