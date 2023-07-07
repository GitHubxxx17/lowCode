//#region
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
//#endregion

// 引入容器组件的属性和外观
import {
  ContainerOrdinaryAppearance,
  ContainerOrdinaryProperty,
} from "../components/erComponent/containers/container-ordinary";
import {
  ContainerFreeAppearance,
  ContainerFreeProperty,
} from "../components/erComponent/containers/container-free";

// 引入常用组件的属性和外观
import {
  TextAppearance,
  TextProperty,
} from "../components/erComponent/commons/text";
import {
  ButtonAppearance,
  ButtonProperty,
} from "../components/erComponent/commons/button";
import {
  InputAppearance,
  InputProperty,
} from "../components/erComponent/commons/input";
import {
  SelectAppearance,
  SelectProperty,
} from "../components/erComponent/commons/select";

interface ErcomponentConfig {
  type: string; //类型
  Properties?: () => any; //属性
  appearances?: () => any; //外观
}

// 组件的配置信息集合
const ErcomponentConfig = [
  {
    type: "container-ordinary",
    Properties() {
      return <ContainerOrdinaryProperty></ContainerOrdinaryProperty>;
    },
    appearances() {
      return <ContainerOrdinaryAppearance></ContainerOrdinaryAppearance>;
    },
  },
  {
    type: "container-free",
    Properties() {
      return <ContainerFreeProperty></ContainerFreeProperty>;
    },
    appearances() {
      return <ContainerFreeAppearance></ContainerFreeAppearance>;
    },
  },
  {
    type: "text",
    Properties() {
      return <TextProperty></TextProperty>;
    },
    appearances() {
      return <TextAppearance></TextAppearance>;
    },
  },
  {
    type: "button",
    Properties() {
      return <ButtonProperty></ButtonProperty>;
    },
    appearances() {
      return <ButtonAppearance></ButtonAppearance>;
    },
  },
  {
    type: "input",
    Properties() {
      return <InputProperty></InputProperty>;
    },
    appearances() {
      return <InputAppearance></InputAppearance>;
    },
  },
  {
    type: "select",
    Properties() {
      return <SelectProperty></SelectProperty>;
    },
    appearances() {
      return <SelectAppearance></SelectAppearance>;
    },
  },
];

class createErComponentConfig {
  public componentMap: Map<string, ErcomponentConfig>; //组件映射表

  constructor(componentMap: Map<string, ErcomponentConfig> = new Map()) {
    this.componentMap = componentMap;
  }

  register(component: ErcomponentConfig) {
    this.componentMap.set(component.type, component);
  }
}

export const erConfig = new createErComponentConfig();

// 循环注册组件配置信息
for (let perErcomponent of ErcomponentConfig) {
  erConfig.register({
    type: perErcomponent.type,
    Properties: () => perErcomponent.Properties(),
    appearances: () => perErcomponent.appearances(),
  });
}
