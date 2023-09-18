import { defineComponent, reactive, watchEffect } from "vue";
import {
  BaseInput,
  BaseSelect,
  BaseSwitch,
  BaseAppearance,
  BaseSelectDataList,
} from "../base/index";
export const CheckboxesAppearance = defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    // 下拉器
    const activeNames: string[] = [
      "basic",
      "titleType",
      "checkboxesType",
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
      border: {
        label: "边框",
        value: props.option.border,
      },
      titleType: {
        writingStyle: true,
        marginAndPadding: true,
        style: props.option.style.title,
      },
      checkboxesType: {
        writingStyle: true,
        bgColor: true,
        border: true,
        marginAndPadding: true,
        style: props.option.style.checkboxes,
      },
    });

    if (props.option.style.box.display != "block") {
      state.layout.value = "水平";
    }

    watchEffect(() => {
      if (state.layout.value == "垂直") {
        props.option.style.box.display = "block";
      } else {
        props.option.style.box.display = "flex";
        props.option.style.box.alignItems = "center";
        props.option.style.title.marginRight = "5px";
      }
      props.option.border = state.border.value;
    });

    return () => {
      return (
        <elCollapse modelValue={activeNames}>
          <elCollapseItem title="基本" name="basic">
            <BaseSelect label="布局" setting={state.layout}></BaseSelect>
            <BaseSwitch option={state.border}></BaseSwitch>
          </elCollapseItem>
          <elCollapseItem title="标题样式" name="titleType">
            <BaseAppearance option={state.titleType}></BaseAppearance>
          </elCollapseItem>
          <elCollapseItem title="单选框样式" name="checkboxesType">
            <BaseAppearance option={state.checkboxesType}></BaseAppearance>
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

export const CheckboxesProperty = defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    // 下拉器
    const activeNames: string[] = ["basic", "options"];

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
      selectData: [
        {
          radio: false,
          value: "选项1",
          isShow: false,
        },
        {
          radio: false,
          value: "选项2",
          isShow: false,
        },
        {
          radio: false,
          value: "选项3",
          isShow: false,
        },
      ],
      defaultValue: {
        value: props.option.value ? props.option.value : "",
        options: [],
      },
    });

    (() => {
      if (props.option.checkboxesData) {
        state.selectData = props.option.checkboxesData.map((item) => {
          return {
            ...item,
            isShow: false,
          };
        });
      }
    })();

    watchEffect(() => {
      const checkboxesKey: string[] = ["bindingField", "title"];
      checkboxesKey.forEach((item) => {
        if (state[item].value != "") props.option[item] = state[item].value;
        else delete props.option[item];
      });

      if (state.defaultValue.value != "")
        props.option.value = state.defaultValue.value;
      else delete props.option.defaultValue;

      props.option.checkboxesData = state.selectData.map((item) => {
        return {
          value: item.value,
          radio: item.radio,
        };
      });

      new Promise((resolve) => {
        let l = [];
        for (let x of state.selectData) {
          if (x.value.trim() != "") l.push(x);
        }
        resolve(l);
      }).then((v: any) => {
        state.defaultValue.options = v;
      });
    });

    return () => {
      return (
        <>
          <elCollapse modelValue={activeNames}>
            <elCollapseItem title="基本" name="basic">
              <BaseInput option={state.bindingField}></BaseInput>
              <BaseInput option={state.title}></BaseInput>
            </elCollapseItem>
            <elCollapseItem title="选项" name="options">
              <BaseSelectDataList
                option={{
                  selectData: state.selectData,
                  defaultValue: state.defaultValue,
                }}
                check={true}
              ></BaseSelectDataList>
            </elCollapseItem>
          </elCollapse>
        </>
      );
    };
  },
});
