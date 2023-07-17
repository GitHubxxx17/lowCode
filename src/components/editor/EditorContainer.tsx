import "@/sass/editor/EditorContainer.scss";
import { defineComponent, inject, onMounted, ref } from "vue";
import { usedragger, setJsonData } from "../../hooks/useDragger";

export default defineComponent({
  props: {
    EditorData: Object,
  },
  setup(props) {
    const config: any = inject("editorConfig");
    let containerRef = ref(null);
    interface nodeProps {
      children: any;
      style: Object;
      childrenList?: Array<Object>;
      [key: string]: any; //动态添加新属性
    }
    //渲染函数
    const renderer = (nodes: any): any => {
      // console.log(nodes);
      if (nodes instanceof Array) {
        //判断节点是否为数组
        return nodes.map((node) => {
          let children = renderer(node.children); //利用递归获取子节点
          let nodeprops: nodeProps = {
            ...node,
            children: children,
            style: node.style,
          }; //配置
          if (node.type.includes("container")) {
            nodeprops.childrenList = node.children; //如果为容器就将子组件的数据添加进去
          }
          return config.componentMap.get(node.type).render(nodeprops);
        });
      } else {
        return nodes; //不是数组直接返回
      }
    };

    onMounted(() => {
      setJsonData(props.EditorData.body);
      const determineScope = () => {
        // let { clientX, clientY } = e; // 获取鼠标松开的坐标
        // let { top, left } = containerRef.getBoundingClientRect();
        // console.log(top, left);

        // if (clientX > 0) console.log(clientX, clientY);
        return false;
      };
      console.log(usedragger.deterWhetherToMoveUp(determineScope));
    });

    return () => {
      return (
        <div
          class="Editorcontainer"
          ref={containerRef}
          onMouseenter={(e) => usedragger.mouseenter(e)}
          onClick={(e) => usedragger.onclickToDrag(e)}
          style={props.EditorData.style}
        >
          {renderer(props.EditorData.body)}
        </div>
      );
    };
  },
});
