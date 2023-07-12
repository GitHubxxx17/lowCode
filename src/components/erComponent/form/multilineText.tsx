import { defineComponent, reactive,watchEffect } from "vue";
import {
  BaseInput,
  BaseSelect,
  BaseSwitch,
  BaseInputNumber,
  BaseAppearance,
} from "../base/index";
export const MultilineTextAppearance = defineComponent({
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
      rows: {
        minRows: {
          label: "最小展示行数",
          value: props.option.autosize.minRows,
          min: 1,
          max: 99,
        },
        maxRows: {
          label: "最大展示行数",
          value: props.option.autosize.maxRows,
          min: 1,
          max: 99,
        },
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

    (() => {
      if (props.option.style.box.display != "block") {
        state.layout.value = "水平";
      }
      console.log(props.option.style.input.width);
      if (props.option.style.input.width) {
        const { width } = props.option.style.input.width;
        if (width == "80px") {
          state.inputBoxSize.value = "极小";
        } else if (width == "160px") {
          state.inputBoxSize.value = "小";
        } else if (width == "240px") {
          state.inputBoxSize.value = "中";
        } else if (width == "320px") {
          state.inputBoxSize.value = "大";
        }
      }
    })();

    watchEffect(() => {
      if (state.layout.value == "垂直") {
        props.option.style.box.display = "block";
      } else {
        props.option.style.box.display = "flex";
        props.option.style.box.alignItems = "center";
        props.option.style.title.marginRight = "5px";
      }
      if (state.inputBoxSize.value == "极小") {
        props.option.style.input.width = "80px";
      } else if (state.inputBoxSize.value == "小") {
        props.option.style.input.width = "160px";
      } else if (state.inputBoxSize.value == "中") {
        props.option.style.input.width = "240px";
      } else if (state.inputBoxSize.value == "大") {
        props.option.style.input.width = "320px";
      } else {
        delete props.option.style.input.width;
      }

      props.option.autosize.minRows = state.rows.minRows.value;
      props.option.autosize.maxRows = state.rows.maxRows.value;

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
            <BaseInputNumber option={state.rows.minRows}></BaseInputNumber>
            <BaseInputNumber option={state.rows.maxRows}></BaseInputNumber>
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

export const MultilineTextProperty = defineComponent({
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
