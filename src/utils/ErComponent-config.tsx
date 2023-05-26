import { ElInput } from "element-plus";
import ErComponentConfig from "./ErComponentConfig.json";

console.log(ErComponentConfig);

interface ErComponentConfig {
  name: String;
  key: string;
  render: () => any;
}

function createErComponentConfig() {
  const componentList: ErComponentConfig[] = []; // 组件列表
  //   const componentMap:Map<string, ErComponentConfig> = new Map(); // 组件的映射关系
  return {
    componentList,
    // componentMap,
    register: (component: ErComponentConfig) => {
      componentList.push(component);
      //   componentMap[component.key] = component;
    },
  };
}

export const ErConfig = createErComponentConfig();

ErConfig.register({
  name: "名称",
  key: "input",
  render: () => (
    <div class="elCollapseInput">
      <div class="elCollapseInput-name">名称</div>
      <ElInput></ElInput>
    </div>
  ),
});
