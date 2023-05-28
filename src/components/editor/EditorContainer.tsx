import "@/sass/editor/EditorContainer.scss";
import { defineComponent, inject, ref } from "vue";
import { useMenudragger } from "../../hooks/useMenuDragger";

export default defineComponent({
  props: {
    EditorData: Object
  },
  setup(props) {
    const config:any = inject('editorConfig');
    let containerRef = ref(null);
    useMenudragger.setData(props.EditorData);
    useMenudragger.setcontainerRef(containerRef);
    interface nodeProps {
      children:any,
      style:Object,
      onmouseenter?:(e:any) => void,
      onmouseleave?:() => void,
    }

    //渲染函数
    const renderer = (nodes: any): any => {
      if (nodes instanceof Array) {//判断节点是否为数组
        return nodes.map((node) => {
          let children = renderer(node.children);//利用递归获取子节点
          let nodeprops:nodeProps = {children:children,style:node.style}//配置
          if(node.type.includes('container')){
            nodeprops.onmouseenter = (e:any) => {
              console.log(e.target);
              console.log(node);
              useMenudragger.setData(node);
              useMenudragger.setcontainerRef(ref(e.target));
            }
            nodeprops.onmouseleave = () => {
              useMenudragger.setData(props.EditorData);
              useMenudragger.setcontainerRef(containerRef);
            }
          }
          return config.componentMap.get(node.type).render(nodeprops)
        })
      }else{
        return nodes;//不是数组直接返回
      }
    }
      
    return () => {
      return (
        <div class="EditorContainer" ref={containerRef}>
          {
            renderer(props.EditorData.body)
          }
        </div>
      );
    };
  },
});
