import "@/sass/editor/EditorContainer.scss";
import { defineComponent } from "vue";
import { editorConfig } from "../../utils/editor-config";
import TransitionDrag from "./transitionDrag.vue";

interface nodeProps {
  children?: any;
  childrenList?: Array<Object>;
  [key: string]: any; //动态添加新属性
}

export default defineComponent({
  props: {
    dataKey: String, //组件唯一键
    EditorDataMap: Object, //编辑数据
  },
  setup(props) {
    let children = null;
    let node = props.EditorDataMap.get(props.dataKey);
    let nodeprops: nodeProps = {
      node: node,
      id: props.dataKey,
    }; //配置
    if (node.type.includes("container")) {
      //递归拖拽动画组件
      children = <TransitionDrag dataKey={props.dataKey}></TransitionDrag>;
      nodeprops.children = children;
      nodeprops.childrenList = node.children; //如果为容器就将子组件的数据添加进去
    }
    return () => {
      return editorConfig.componentMap.get(node.type)?.render(nodeprops);
    };
  },
});
