import { defineComponent } from "vue";
import { BaseContainerProperty, BaseAppearance } from "../base/index";
export const ContainerFreeAppearance = defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    // 下拉器
    const activeNames: string[] = ["basic","styleSource"];
    const option = {
      writingStyle:true,
      bgColor:true,
      border:true,
      marginAndPadding:true,
      radius:true,
      shadow:true,
      style: props.option.style,
    };

    return () => {
      return <elCollapse modelValue={activeNames}>
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
    };
  },
});

export const ContainerFreeProperty = defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    return () => {
      return (
        <BaseContainerProperty option={props.option}></BaseContainerProperty>
      );
    };
  },
});
