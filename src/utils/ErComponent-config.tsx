// import { ElInput } from "element-plus";
// import ErComponentConfig from "./ErComponentConfig.json";

// console.log(ErComponentConfig);

// interface ErComponentConfig {
//   name: String;
//   key: string;
//   render: () => any;
// }

// function createErComponentConfig() {
//   const componentList: ErComponentConfig[] = []; // 组件列表
//   //   const componentMap:Map<string, ErComponentConfig> = new Map(); // 组件的映射关系
//   return {
//     componentList,
//     // componentMap,
//     register: (component: ErComponentConfig) => {
//       componentList.push(component);
//       //   componentMap[component.key] = component;
//     },
//   };
// }

// export const ErConfig = createErComponentConfig();

// ErConfig.register({
//   name: "名称",
//   key: "input",
//   render: () => (
//     <div class="elCollapseInput">
//       <div class="elCollapseInput-name">名称</div>
//       <ElInput></ElInput>
//     </div>
//   ),
// });

interface ErcomponentConfig {
  type: string,//类型
  Properties?: () => any,//属性
  appearances?: () => any,//外观
}
class createErComponentConfig {
  public componentList: Array<ErcomponentConfig>;//组件数组
  public componentMap: Map<string, ErcomponentConfig>;//组件映射表

  constructor(componentList: Array<ErcomponentConfig> = [], componentMap: Map<string, ErcomponentConfig> = new Map()) {
    this.componentList = componentList;
    this.componentMap = componentMap;
  }

  register(component: ErcomponentConfig) {//注册组件
    this.componentList.push(component);
    this.componentMap.set(component.type, component);
  }
}
