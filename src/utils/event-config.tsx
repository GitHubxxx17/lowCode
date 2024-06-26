import {
  BaseTextArea,
  BaseButtonGroup,
  BaseInputNumber,
} from "../components/erComponent/base";
import noneData from "../assets/image/noneData3.png";
import { ElMessage } from "element-plus";
import TargetComponent from "../components/erComponent/erConfig/targetComponent.vue";
import mainStore from "../stores/mainStore";
import pinia from "../stores";

const mainData = mainStore(pinia);
interface handlerConfig {
  type: string; //动作类型
  instructions: string; //动作描述
  defaultData: any; // 默认数据
  configRender: (porps: any) => any; //配置渲染
  selectedRender: (porps: any) => any; //选中渲染
  handler?: (val: any) => any; //执行事件
}

interface eventsConfig {
  type: string; //事件类型
  name: string; //事件名
  execute: (handler: any) => any; //事件执行
}

const handlerConfigList: handlerConfig[] = [
  {
    type: "跳转连接",
    instructions: "跳转到指定连接的页面",
    configRender: (props: any) => {
      return <BaseTextArea option={props}></BaseTextArea>;
    },
    selectedRender: (props: any) => {
      return (
        <p>
          跳转至：<span class="events-url">{props.content}</span>
        </p>
      );
    },
    handler: (item) => {
      return () => {
        window.open(item.content, "_blank");
      };
    },
    defaultData: {
      label: "页面地址",
      value: "",
    },
  },
  {
    type: "刷新页面",
    instructions: "触发浏览器刷新页面",
    configRender: () => {
      return (
        <div class="events-none">
          <img src={noneData} />
          <p>无配置内容</p>
        </div>
      );
    },
    selectedRender: (props: any) => {
      return (
        <p>
          <span>{props.content}</span>
        </p>
      );
    },
    handler: () => {
      return () => {
        location.reload();
      };
    },
    defaultData: {
      value: "刷新页面",
    },
  },
  {
    type: "回退页面",
    instructions: "触发浏览器回退",
    configRender: () => {
      return (
        <div class="events-none">
          <img src={noneData} />
          <p>无配置内容</p>
        </div>
      );
    },
    selectedRender: (props: any) => {
      return (
        <p>
          <span>{props.content}</span>
        </p>
      );
    },
    handler: () => {
      return () => {
        history.go(-1);
      };
    },
    defaultData: {
      value: "回退页面",
    },
  },
  {
    type: "打开弹窗",
    instructions: "打开弹窗",
    configRender: (props: any) => {
      return <BaseTextArea option={props}></BaseTextArea>;
    },
    selectedRender: (value: string) => {
      return (
        <p>
          <span>{value}</span>
        </p>
      );
    },
    handler: () => {
      console.log("打开弹窗");
    },
    defaultData: {
      label: "页面地址",
      value: "",
    },
  },
  {
    type: "关闭弹窗",
    instructions: "关闭弹窗",
    configRender: (props: any) => {
      return <BaseTextArea option={props}></BaseTextArea>;
    },
    selectedRender: (value: string) => {
      return (
        <p>
          跳转至：<span>{value}</span>
        </p>
      );
    },
    handler: () => {
      console.log("关闭弹窗");
    },
    defaultData: {
      label: "页面地址",
      value: "",
    },
  },
  {
    type: "消息提醒",
    instructions: "出现消息提醒框",
    configRender: (props: any) => {
      return (
        <>
          <BaseButtonGroup option={props.messageType}></BaseButtonGroup>
          <BaseInputNumber option={props.duration}></BaseInputNumber>
          <BaseTextArea option={props.messageContent}></BaseTextArea>
        </>
      );
    },
    selectedRender: function (props: any) {
      let label = "成功";
      this.defaultData.messageType.list.map((item: any) => {
        if (item.value == props.messageType) label = item.label;
      });
      return (
        <p>
          {label}消息：<span>{props.messageContent}</span>
        </p>
      );
    },
    handler: (item: any) => {
      return () => {
        ElMessage({
          type: item.messageType,
          message: item.messageContent,
          duration: item.duration,
        });
      };
    },
    defaultData: {
      messageType: {
        label: "消息类型",
        list: [
          { label: "成功", value: "success" },
          { label: "警告", value: "warning" },
          { label: "提示", value: "info" },
          { label: "错误", value: "error" },
        ],
        value: "success",
      },
      duration: {
        label: "持续时间",
        min: 0,
        value: 3000,
      },
      messageContent: {
        label: "消息内容",
        value: "",
      },
      value: "",
    },
  },
  {
    type: "发送请求",
    instructions: "发送请求",
    configRender: (props: any) => {
      return <BaseTextArea option={props}></BaseTextArea>;
    },
    selectedRender: (value: string) => {
      return (
        <p>
          跳转至：<span>{value}</span>
        </p>
      );
    },
    handler: () => {
      console.log("发送请求");
    },
    defaultData: {
      label: "页面地址",
      value: "",
    },
  },
  {
    type: "提交表单",
    instructions: "提交表单",
    configRender: (props: any) => {
      return <BaseTextArea option={props}></BaseTextArea>;
    },
    selectedRender: (value: string) => {
      return (
        <p>
          跳转至：<span>{value}</span>
        </p>
      );
    },
    handler: () => {
      console.log("提交表单");
    },
    defaultData: {
      label: "页面地址",
      value: "",
    },
  },
  {
    type: "重置表单",
    instructions: "重置表单",
    configRender: (props: any) => {
      return <BaseTextArea option={props}></BaseTextArea>;
    },
    selectedRender: (value: string) => {
      return (
        <p>
          跳转至：<span>{value}</span>
        </p>
      );
    },
    handler: () => {
      console.log("重置表单");
    },
    defaultData: {
      label: "页面地址",
      value: "",
    },
  },
  {
    type: "校验表单",
    instructions: "校验表单",
    configRender: (props: any) => {
      return <BaseTextArea option={props}></BaseTextArea>;
    },
    selectedRender: (value: string) => {
      return (
        <p>
          跳转至：<span>{value}</span>
        </p>
      );
    },
    handler: () => {
      console.log("事件执行了");
    },
    defaultData: {
      label: "页面地址",
      value: "",
    },
  },
  {
    type: "组件可见性",
    instructions: "控制所选的组件的显示与隐藏",
    configRender: (props: any) => {
      return <TargetComponent option={props}></TargetComponent>;
    },
    selectedRender: (props: any) => {
      return (
        <p>
          使得该组件 <span style="font-weight: 700">{props.content}</span>
          {props.otherOption.isHidden ? " 隐藏" : " 显示"}
        </p>
      );
    },
    handler: (item: any) => {
      return () => {
        console.log("组件可见性");
        // 获取target的类
        let targetData = mainData.EditorDataMap.get(item.otherOption.target);

        targetData.classList ? (targetData.classList = []) : "";
        console.log(item.otherOption.isHidden);
        console.log(targetData);
        if (
          !mainData.EditorDataMap.get(
            item.otherOption.target
          ).classList?.includes("hidden") &&
          item.otherOption.isHidden
        ) {
          targetData.classList.push("hidden");
          mainData.addLinkage({
            type: "class",
            target: item.otherOption.target,
          });
        }
      };
    },
    defaultData: {
      target: "",
      isHidden: false,
      value: "",
    },
  },
];

const eventsConfigList: eventsConfig[] = [
  {
    type: "onclick",
    name: "鼠标点击",
    execute: (handlers: Function[]) => {
      return {
        onClick: () => {
          handlers.forEach((fn) => fn && fn());
        },
      };
    },
  },
  {
    type: "mouseenter",
    name: "鼠标移入",
    execute: (handlers: Function[]) => {
      return {
        onMouseenter: () => {
          handlers.forEach((fn) => fn && fn());
        },
      };
    },
  },
  {
    type: "mouseleave",
    name: "鼠标移出",
    execute: (handlers: Function[]) => {
      return {
        onmouseleave: () => {
          handlers.forEach((fn) => fn && fn());
        },
      };
    },
  },
  {
    type: "onfocus",
    name: "获取焦点",
    execute: (handlers: Function[]) => {
      return {
        onFocus: () => {
          handlers.forEach((fn) => fn && fn());
        },
      };
    },
  },
  {
    type: "onblur",
    name: "失去焦点",
    execute: (handlers: Function[]) => {
      return {
        onBlur: () => {
          handlers.forEach((fn) => fn && fn());
        },
      };
    },
  },
  {
    type: "onchange",
    name: "值改变",
    execute: (handlers: Function[]) => {
      return {
        onChange: () => {
          handlers.forEach((fn) => fn && fn());
        },
      };
    },
  },
];

class createEventConfig {
  public handlerMap: Map<string, handlerConfig>; //执行动作映射表
  public eventMap: Map<string, eventsConfig>; //事件映射表

  constructor(
    handlerMap: Map<string, handlerConfig> = new Map(),
    eventMap: Map<string, eventsConfig> = new Map()
  ) {
    this.handlerMap = handlerMap;
    this.eventMap = eventMap;
  }

  //获取渲染的事件函数
  getRenderEvents(events: any) {
    return events.reduce((pre: any, cur: any) => {
      return Object.assign(
        pre,
        this.eventMap.get(cur.type).execute(
          cur.list.map((item: any) => {
            return this.handlerMap.get(item.title).handler(item);
          })
        )
      );
    }, {});
  }

  register(item: any, isEvent: boolean = false) {
    //注册事件
    if (isEvent) {
      this.eventMap.set(item.type, item);
    } else {
      this.handlerMap.set(item.type, item);
    }
  }
}

export const eventConfig = new createEventConfig();

//注册执行动作
for (let handler of handlerConfigList) {
  //遍历声明的执行动作并注册
  eventConfig.register({
    type: handler.type,
    instructions: handler.instructions,
    defaultData: handler.defaultData,
    configRender: handler.configRender,
    selectedRender: handler.selectedRender,
    handler: handler.handler,
  });
}

//注册事件
for (let event of eventsConfigList) {
  //遍历声明的事件并注册
  eventConfig.register(
    {
      type: event.type,
      name: event.name,
      execute: event.execute,
    },
    true
  );
}
