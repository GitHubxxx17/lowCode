import { editorConfig } from "../utils/editor-config";
import mainStore from "../stores/mainStore.ts";
import pinia from "../stores/index.ts";
import { reactive } from "vue";
let mainData = mainStore(pinia);

interface nodeProps {
  children?: any;
  style: Object;
  childrenList?: Array<Object>;
  [key: string]: any; //动态添加新属性
}

export const mapRenderer = (key: string): any => {
  let nodes = mainData.EditorDataMap.get(key);
  if (nodes.children instanceof Array) {
    //判断节点是否为数组
    return nodes.children.map((nodekey: string) => {
      let children = mapRenderer(nodekey); //利用递归获取子节点
      let node = mainData.EditorDataMap.get(nodekey);
      let nodeprops: nodeProps = reactive({
        node: node,
        id: nodekey,
        style: node.style,
      }); //配置
      if (node.type.includes("container")) {
        nodeprops.children = children;
        nodeprops.childrenList = node.children; //如果为容器就将子组件的数据添加进去
      }
      return editorConfig.componentMap.get(node.type)?.render(nodeprops);
    });
  }
};
