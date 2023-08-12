//列表区显示所有物料
//type对应组件的映射关系
import { createVNode, defineComponent } from "vue";
import { ElButton } from "element-plus";
import Container from "../components/renderer/container";
import {
  RdInput,
  RdSelect,
  RdtextBox,
  RdmultilineText,
} from "../components/renderer/index";

const componentsConfig = [
  {
    label: "容器",
    icon: "icon iconfont icon-checkbox",
    type: "container-ordinary",
    category: "container",
    render(props: any) {
      props = {
        ...props,
        text: "容器",
        class: "container-ordinary",
        "data-id": props.id,
      };
      return <Container {...props}></Container>;
    },
    defaultData: {
      type: "container-ordinary",
      style: {
        position: "relative",
        width: "100%",
        zIndex: 1,
      },
      children: [],
    },
  },
  {
    label: "自由容器",
    icon: "icon iconfont icon-zidingyibuju",
    type: "container-free",
    category: "container",
    render(props: any) {
      props = {
        ...props,
        text: "自由容器",
        class: "container-free",
        "data-id": props.id,
      };
      return <Container {...props}></Container>;
    },
    defaultData: {
      type: "container-free",
      style: {
        position: "relative",
        width: "100%",
        zIndex: 1,
      },
      children: [],
    },
  },
  {
    label: "文字",
    icon: "icon iconfont icon-font",
    type: "text",
    category: "common",
    render(props: any) {
      return (
        <div class="cannotPreview" data-id={props.id}>
          <span style={props.style} datatype="text">
            {props.children ? props.children : "渲染文字"}
          </span>
        </div>
      );
    },
    defaultData: {
      type: "text",
      style: {
        position: "relative",
        fontSize: "16px",
        color: "black",
        zIndex: 1,
      },
      children: "渲染文字",
    },
  },
  {
    label: "按钮",
    icon: "icon iconfont icon-anniu",
    type: "button",
    category: "common",
    render(props: any) {
      return (
        <div class="cannotPreview" data-id={props.id}>
          <ElButton
            style={props.style}
            class="baseButton"
            type={props.buttonstyle}
            size={props.size}
            disabled={props.isDisable}
          >
            <i
              class={["icon iconfont leftIcon", props.icon.leftIcon]}
              style={{ "font-size": props.icon.leftIconSize }}
            ></i>
            {props.children ? props.children : "渲染按钮"}
            <i
              class={["icon iconfont rightIcon", props.icon.rightIcon]}
              style={{ "font-size": props.icon.rightIconSize }}
            ></i>
          </ElButton>
        </div>
      );
    },
    defaultData: {
      type: "button",
      style: {
        position: "relative",
        width: "87px",
        height: "32px",
        zIndex: 1,
      },
      buttonstyle: "", // 按钮类型
      size: "default", // 按钮大小
      icon: {}, // 左右侧图标
      twiceComfire: {}, // 二次确认
      bubblePrompt: {}, // 气泡提示
      isDisable: true, // 是否禁用
      children: "渲染按钮",
    },
  },
  {
    label: "输入框",
    icon: "icon iconfont icon-input",
    type: "input",
    category: "common",
    render(props: any) {
      return (
        <div class="cannotPreview" data-id={props.id}>
          <RdInput option={props}></RdInput>
        </div>
      );
    },
    defaultData: {
      type: "input",
      value: "", // 默认值
      inputStyle: "text", // 输入框类型
      size: "default", // 输入框尺寸
      placeholder: "请输入", // 占位提示
      showPassword: false, // 是否可以隐藏密码
      clearable: false, // 是否可以清除
      showWordLimit: false, // 是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效
      disabled: false, // 是否可清空
      readonly: false, // 原生属性，是否只读
      autofocus: false, //原生属性，自动获取焦点
      style: {
        position: "relative",
        zIndex: 1,
      },
      children: "",
    },
  },
  {
    label: "下拉框",
    icon: "icon iconfont icon-m-xialacaidan",
    type: "select",
    category: "common",
    render(props: any) {
      return (
        <div class="cannotPreview" data-id={props.id}>
          <RdSelect option={props}></RdSelect>
        </div>
      );
    },
    defaultData: {
      type: "select",
      style: {
        position: "relative",
        zIndex: 1,
      },
      children: "",
      defaultValue: "",
    },
  },
  {
    label: "文本框",
    icon: "icon iconfont icon-wenben",
    type: "textBox",
    category: "form",
    render(props: any) {
      return (
        <div class="cannotPreview" style={props.style.box} data-id={props.id}>
          <RdtextBox option={props}></RdtextBox>
        </div>
      );
    },
    defaultData: {
      value: "",
      type: "textBox",
      title: "文本",
      style: {
        box: {
          display: "block",
        },
        title: {},
        input: {},
      },
      children: "",
    },
  },
  {
    label: "多行文本框",
    icon: "icon iconfont icon-duohangwenben1",
    type: "multilineText",
    category: "form",
    render(props: any) {
      return (
        <div class="cannotPreview" style={props.style.box} data-id={props.id}>
          <RdmultilineText option={props}></RdmultilineText>
        </div>
      );
    },
    defaultData: {
      value: "",
      type: "multilineText",
      title: "多行文本",
      style: {
        box: {
          display: "block",
        },
        title: {},
        input: {},
      },
      children: "",
      autosize: {
        minRows: 2,
        maxRows: 6,
      },
    },
  },
];

interface componentConfig {
  label: String; //标签
  type: string; //类型
  category: String; //类别
  defaultData: Object; //默认数据
  preview: () => any; //返回预览组件函数
  render: (props: any) => any; //返回渲染组件函数
}

class createEditorConfig {
  public componentList: Array<componentConfig>; //组件数组
  public componentMap: Map<string, componentConfig>; //组件映射表

  constructor(
    componentList: Array<componentConfig> = [],
    componentMap: Map<string, componentConfig> = new Map()
  ) {
    this.componentList = componentList;
    this.componentMap = componentMap;
  }

  register(component: componentConfig) {
    //注册组件
    this.componentList.push(component);
    this.componentMap.set(component.type, component);
  }
}

export const editorConfig = new createEditorConfig();
for (let block of componentsConfig) {
  //遍历声明的组件并注册
  editorConfig.register({
    label: block.label,
    type: block.type,
    category: block.category,
    defaultData: block.defaultData,
    preview: () => createVNode(previewComponent, { block }),
    render: (props) => block.render(props),
  });
}

//预览组件
const previewComponent = defineComponent({
  props: {
    block: { type: Object },
  },
  setup(props) {
    return () => {
      return (
        <span datatype={props.block.type}>
          <i class={props.block.icon}></i>
          <label>{props.block.label}</label>
        </span>
      );
    };
  },
});
