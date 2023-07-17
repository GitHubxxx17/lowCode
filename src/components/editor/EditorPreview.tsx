import "@/sass/editor/EditorContainer.scss";
import "@/sass/editor/EditorPreview.scss";
import { defineComponent, inject, onUnmounted } from "vue";
import { ElMessage } from "element-plus";

export default defineComponent({
  props: {
    EditorData: Object,
    state: Object,
  },
  setup(props) {
    const config: any = inject("editorConfig");
    interface nodeProps {
      children: any;
      style: Object;
      childrenList?: Array<Object>;
      [key: string]: any; //动态添加新属性
    }
    //渲染函数
    const renderer = (nodes: any): any => {
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

    //退出预览
    const exitPreview = (e) => {
      if (e.keyCode == 27) {
        props.state.isPreview = false;
        ElMessage.success({ message: "已退出预览模式", duration: 1000 });
      }
    };
    window.addEventListener("keyup", exitPreview);
    onUnmounted(() => {
      window.removeEventListener("keyup", exitPreview);
    });

    return () => {
      return (
        <div class="EditorPreview">
          <div id="body" style={props.EditorData.style}>
            {renderer(props.EditorData.body)}
          </div>
          <div class="EditorPreview-leftMessage">按ESC可退出预览</div>
        </div>
      );
    };
  },
});
