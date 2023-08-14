import { defineComponent, reactive } from "vue";
import {
  BaseAppearance,
  BaseIconSelect
} from "../base/index";
export const IconAppearance = defineComponent({
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

export const IconProperty = defineComponent({
  props: {
    option: { type: Object },
  },
  setup() {
    // 下拉器
    const activeNames: string[] = ["basic"];

    const state = reactive({
      leftIconSelect: {
        isShowList: false, // 是否展示列表
        clearable: false, // 是否有清除键
        isFill: false, // 是否有内容
        icon: "",
        iconText: "",
        clearIcon: "icon-cha",
      },
    });

    return () => {
      return (
        <>
          <elCollapse modelValue={activeNames}>
            <elCollapseItem title="基本" name="basic">
            <BaseIconSelect
                label="修改图标"
                setting={state.leftIconSelect}
              ></BaseIconSelect>
            </elCollapseItem>
          </elCollapse>
        </>
      );
    };
  },
});
